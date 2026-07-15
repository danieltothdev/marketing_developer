import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { PLANS, PlanId } from "@/data/plans";
import { colors, spacing } from "@/theme";

export default function PaywallScreen() {
  const router = useRouter();
  const { plan, subscribe } = useSubscription();
  const [busy, setBusy] = useState<PlanId | null>(null);

  const choose = async (id: PlanId) => {
    setBusy(id);
    try {
      // Élesben: RevenueCat Purchases.purchasePackage(...) hívás fut itt,
      // ami az App Store / Play Store natív vásárlási folyamatát indítja.
      await subscribe(id);
      Alert.alert("Sikeres váltás ✅", "A csomagod aktiválva. (Demó mód)");
      router.back();
    } finally {
      setBusy(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Válaszd ki a csomagod</Text>
      <Text style={styles.lead}>
        Éves fizetéssel 2 hónapot ajándékba adunk. Bármikor lemondható.
      </Text>
      {PLANS.map((p) => {
        const current = p.id === plan.id;
        return (
          <Card
            key={p.id}
            style={{
              borderColor: p.highlighted ? colors.accent : colors.border,
              borderWidth: p.highlighted ? 2 : 1,
            }}
          >
            <View style={styles.headerRow}>
              <Text style={styles.planName}>{p.name}</Text>
              {p.highlighted && <Badge label="Legnépszerűbb ⭐" tone="gold" />}
              {current && <Badge label="Jelenlegi" tone="success" />}
            </View>
            <Text style={styles.price}>{p.priceLabel}</Text>
            <Text style={styles.tagline}>{p.tagline}</Text>
            {p.features.map((f, i) => (
              <Text key={i} style={styles.feature}>
                ✓ {f}
              </Text>
            ))}
            {!current && (
              <Button
                title={p.id === "free" ? "Visszaváltás ingyenesre" : "Ezt választom"}
                variant={p.highlighted ? "gold" : "primary"}
                loading={busy === p.id}
                onPress={() => choose(p.id)}
                style={{ marginTop: spacing.sm }}
              />
            )}
          </Card>
        );
      })}
      <Text style={styles.finePrint}>
        Az előfizetés az App Store / Google Play fiókodon keresztül kerül
        terhelésre, és a mindenkori áruházi feltételek szerint mondható le.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 24, fontWeight: "800" },
  lead: { color: colors.textMuted, marginTop: 4, marginBottom: spacing.md },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  planName: { color: colors.text, fontSize: 20, fontWeight: "800" },
  price: { color: colors.primary, fontSize: 18, fontWeight: "700", marginTop: 4 },
  tagline: { color: colors.textMuted, marginTop: 2, marginBottom: spacing.sm },
  feature: { color: colors.text, lineHeight: 24, fontSize: 14 },
  finePrint: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 18,
  },
});
