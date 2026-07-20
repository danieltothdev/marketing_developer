import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";

export interface AppUser {
  name: string;
  email: string;
  businessName?: string;
}

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  signIn: (user: AppUser) => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

const USER_KEY = "kkvboost.user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(USER_KEY);
        if (stored) setUser(JSON.parse(stored));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async (u: AppUser) => {
    // Élesben Supabase auth fut itt (e-mail + jelszó vagy magic link):
    //   await supabase.auth.signInWithOtp({ email: u.email })
    // Demó módban a profil lokálisan tárolódik.
    if (supabase) {
      // A supabase kliens készen áll — az OTP/jelszavas flow bekötése a
      // következő élesítési lépés.
    }
    setUser(u);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(u));
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut().catch(() => {});
    setUser(null);
    await AsyncStorage.removeItem(USER_KEY);
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth: hiányzó AuthProvider");
  return ctx;
}
