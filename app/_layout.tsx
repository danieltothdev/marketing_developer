import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <SubscriptionProvider>
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
    </SubscriptionProvider>
  );
}
