import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BillingPeriod, getPlan, Plan, PlanId } from "@/data/plans";

interface SubscriptionState {
  plan: Plan;
  billing: BillingPeriod;
  creditsUsed: number;
  bonusCredits: number;
  creditsRemaining: number; // -1 = korlátlan
  isPremium: boolean;
  loading: boolean;
  canGenerate: boolean;
  consumeCredit: () => Promise<void>;
  subscribe: (planId: PlanId, billing?: BillingPeriod) => Promise<void>;
  buyCredits: (amount: number) => Promise<void>;
  ownedProducts: string[];
  buyProduct: (productId: string) => Promise<void>;
  completedLessons: string[];
  markLessonCompleted: (key: string) => Promise<void>;
}

const Ctx = createContext<SubscriptionState | null>(null);

const PLAN_KEY = "kkvboost.plan";
const BILLING_KEY = "kkvboost.billing";
const CREDITS_KEY = "kkvboost.creditsUsed"; // "YYYY-MM:n" — hónapváltáskor nullázódik
const BONUS_KEY = "kkvboost.bonusCredits"; // vásárolt kreditek, nem járnak le
const PRODUCTS_KEY = "kkvboost.ownedProducts";
const LESSONS_KEY = "kkvboost.completedLessons";

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [planId, setPlanId] = useState<PlanId>("free");
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [bonusCredits, setBonusCredits] = useState(0);
  const [ownedProducts, setOwnedProducts] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, b, c, bonus, prods, lessons] = await Promise.all([
          AsyncStorage.getItem(PLAN_KEY),
          AsyncStorage.getItem(BILLING_KEY),
          AsyncStorage.getItem(CREDITS_KEY),
          AsyncStorage.getItem(BONUS_KEY),
          AsyncStorage.getItem(PRODUCTS_KEY),
          AsyncStorage.getItem(LESSONS_KEY),
        ]);
        if (p) setPlanId(p as PlanId);
        if (b === "yearly" || b === "monthly") setBilling(b);
        if (c) {
          const [month, n] = c.split(":");
          if (month === currentMonth()) setCreditsUsed(Number(n) || 0);
        }
        if (bonus) setBonusCredits(Number(bonus) || 0);
        if (prods) setOwnedProducts(JSON.parse(prods));
        if (lessons) setCompletedLessons(JSON.parse(lessons));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const plan = getPlan(planId);
  const monthlyRemaining =
    plan.monthlyCredits === -1
      ? -1
      : Math.max(0, plan.monthlyCredits - creditsUsed);
  const creditsRemaining =
    monthlyRemaining === -1 ? -1 : monthlyRemaining + bonusCredits;

  const consumeCredit = useCallback(async () => {
    if (plan.monthlyCredits === -1) {
      // Korlátlan csomagnál csak a statisztikához számoljuk.
      const next = creditsUsed + 1;
      setCreditsUsed(next);
      await AsyncStorage.setItem(CREDITS_KEY, `${currentMonth()}:${next}`);
      return;
    }
    if (monthlyRemaining > 0) {
      const next = creditsUsed + 1;
      setCreditsUsed(next);
      await AsyncStorage.setItem(CREDITS_KEY, `${currentMonth()}:${next}`);
    } else if (bonusCredits > 0) {
      const next = bonusCredits - 1;
      setBonusCredits(next);
      await AsyncStorage.setItem(BONUS_KEY, String(next));
    }
  }, [plan.monthlyCredits, creditsUsed, monthlyRemaining, bonusCredits]);

  const subscribe = useCallback(
    async (id: PlanId, period: BillingPeriod = "monthly") => {
      // Élesben itt fut a RevenueCat vásárlási flow (Purchases.purchasePackage),
      // és a szerveroldali webhook állítja be a jogosultságot. Demóban lokális.
      setPlanId(id);
      setBilling(period);
      await AsyncStorage.multiSet([
        [PLAN_KEY, id],
        [BILLING_KEY, period],
      ]);
    },
    []
  );

  const buyCredits = useCallback(
    async (amount: number) => {
      // Élesben: consumable in-app vásárlás (RevenueCat), szerveroldali jóváírással.
      const next = bonusCredits + amount;
      setBonusCredits(next);
      await AsyncStorage.setItem(BONUS_KEY, String(next));
    },
    [bonusCredits]
  );

  const buyProduct = useCallback(
    async (productId: string) => {
      // Élesben: non-consumable in-app vásárlás (RevenueCat).
      if (ownedProducts.includes(productId)) return;
      const next = [...ownedProducts, productId];
      setOwnedProducts(next);
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
    },
    [ownedProducts]
  );

  const markLessonCompleted = useCallback(
    async (key: string) => {
      if (completedLessons.includes(key)) return;
      const next = [...completedLessons, key];
      setCompletedLessons(next);
      await AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(next));
    },
    [completedLessons]
  );

  return (
    <Ctx.Provider
      value={{
        plan,
        billing,
        creditsUsed,
        bonusCredits,
        creditsRemaining,
        isPremium: planId !== "free",
        loading,
        canGenerate: creditsRemaining === -1 || creditsRemaining > 0,
        consumeCredit,
        subscribe,
        buyCredits,
        ownedProducts,
        buyProduct,
        completedLessons,
        markLessonCompleted,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useSubscription(): SubscriptionState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSubscription: hiányzó SubscriptionProvider");
  return ctx;
}
