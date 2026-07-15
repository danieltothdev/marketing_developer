import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getPlan, Plan, PlanId } from "@/data/plans";

interface SubscriptionState {
  plan: Plan;
  creditsUsed: number;
  creditsRemaining: number; // -1 = korlátlan
  isPremium: boolean;
  loading: boolean;
  canGenerate: boolean;
  consumeCredit: () => Promise<void>;
  subscribe: (planId: PlanId) => Promise<void>;
  completedLessons: string[];
  markLessonCompleted: (key: string) => Promise<void>;
}

const Ctx = createContext<SubscriptionState | null>(null);

const PLAN_KEY = "kkvboost.plan";
const CREDITS_KEY = "kkvboost.creditsUsed"; // "YYYY-MM:n" — hónapváltáskor nullázódik
const LESSONS_KEY = "kkvboost.completedLessons";

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [planId, setPlanId] = useState<PlanId>("free");
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [storedPlan, storedCredits, storedLessons] = await Promise.all([
          AsyncStorage.getItem(PLAN_KEY),
          AsyncStorage.getItem(CREDITS_KEY),
          AsyncStorage.getItem(LESSONS_KEY),
        ]);
        if (storedPlan) setPlanId(storedPlan as PlanId);
        if (storedCredits) {
          const [month, n] = storedCredits.split(":");
          if (month === currentMonth()) setCreditsUsed(Number(n) || 0);
        }
        if (storedLessons) setCompletedLessons(JSON.parse(storedLessons));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const plan = getPlan(planId);
  const creditsRemaining =
    plan.monthlyCredits === -1
      ? -1
      : Math.max(0, plan.monthlyCredits - creditsUsed);

  const consumeCredit = useCallback(async () => {
    const next = creditsUsed + 1;
    setCreditsUsed(next);
    await AsyncStorage.setItem(CREDITS_KEY, `${currentMonth()}:${next}`);
  }, [creditsUsed]);

  const subscribe = useCallback(async (id: PlanId) => {
    // Éles appban itt fut a RevenueCat vásárlási flow (Purchases.purchasePackage),
    // és a szerver oldali webhook állítja be a jogosultságot. Demóban lokális.
    setPlanId(id);
    await AsyncStorage.setItem(PLAN_KEY, id);
  }, []);

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
        creditsUsed,
        creditsRemaining,
        isPremium: planId !== "free",
        loading,
        canGenerate: creditsRemaining === -1 || creditsRemaining > 0,
        consumeCredit,
        subscribe,
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
