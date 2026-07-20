import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { colors } from "@/theme";

// Belépés-kapu: bejelentkezés nélkül csak a login képernyő érhető el.
function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inLogin = segments[0] === "login";
    if (!user && !inLogin) {
      router.replace("/login");
    } else if (user && inLogin) {
      router.replace("/");
    }
  }, [user, loading, segments, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <AuthGate>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.bg },
              headerTintColor: colors.text,
              headerTitleStyle: { fontWeight: "700" },
              contentStyle: { backgroundColor: colors.bg },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="course/[id]" options={{ title: "Kurzus" }} />
            <Stack.Screen
              name="lesson/[courseId]/[lessonId]"
              options={{ title: "Lecke" }}
            />
            <Stack.Screen name="audit" options={{ title: "AI Marketing Audit" }} />
            <Stack.Screen name="deep-audit" options={{ title: "Mélyaudit" }} />
            <Stack.Screen name="shop" options={{ title: "Bolt" }} />
            <Stack.Screen name="product/[id]" options={{ title: "Csomag" }} />
            <Stack.Screen
              name="paywall"
              options={{ title: "Előfizetés", presentation: "modal" }}
            />
          </Stack>
        </AuthGate>
      </SubscriptionProvider>
    </AuthProvider>
  );
}
