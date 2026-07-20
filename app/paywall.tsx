import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card, SectionTitle } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { BillingPeriod, PLANS, PlanId, priceLabelFor } from "@/data/plans";
import { CREDIT_PACKS } from "@/data/products";
import { colors, radius, spacing } from "@/theme";

export default function PaywallScreen() {
  const router = useRouter();
  const { plan, billing, subscribe, buyCredits } = useSubscription();
  const [period, setPeriod] = useState<BillingPeriod>(billing);
  const [busy, setBusy] = useState<string | null>(null);

  const choose = async (id: PlanId) => {
    setBusy(id);
    try {
      // Élesben: RevenueCat Purchases.purchasePackage(...) hívás fut itt,
      // ami az App Store / Play Store natív vásárlási folyamatát indítja.
      await subscribe(id, period);
      Alert.alert("Sikeres váltás ✅", "A csomagod aktiválva. (Demó mód)");
      router.back();
    } finally {
      setBusy(null);
    }
  };

  const buyPack = async (packId: string, credits: number, label: string) => {
    setBusy(packId);
    try {
      await buyCredits(credits);
      Alert.alert(
        "Sikeres vásárlás ✅",
        `${credits} AI-kredit jóváírva (${label}). A vásárolt kreditek nem járnak le. (Demó mód)`
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Válaszd ki a csomagod</Text>

      <View style={styles.toggleRow}>
        <Pressable
          onPress={() => setPeriod("monthly")}
          style={[styles.toggle, period === "monthly" && styles.toggleActive]}
        >
          <Text style={styles.toggleText}>Havi</Text>
        </Pressable>
        <Pressable
          onPress={() => setPeriod("yearly")}
          style={[styles.toggle, period === "yearly" && styles.toggleActive]}
        >
          <Text style={styles.toggleText}>Éves</Text>
          <Text style={styles.toggleBonus}>2 hónap ajándék 🎁</Text>
        </Pressable>
      </View>

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
            <Text style={styles.price}>{priceLabelFor(p, period)}</Text>
            {period === "yearly" && p.priceHuf > 0 && (
              <Text style={styles.yearlyNote}>
                12 hónap a 10 áráért — {p.priceLabel} helyett
              </Text>
            )}
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

      <SectionTitle>Csak kredit kell? 🔋</SectionTitle>
      <Text style={styles.lead}>
        Ha elfogyott a havi kereted, de nem szeretnél csomagot váltani, vegyél
        kreditcsomagot — a vásárolt kreditek nem járnak le.
      </Text>
      {CREDIT_PACKS.map((pack) => (
        <Card key={pack.id}>
          <View style={styles.headerRow}>
            <Text style={styles.packTitle}>⚡ {pack.credits} AI-kredit</Text>
            {pack.note && <Badge label={pack.note} tone="success" />}
          </View>
          <Text style={styles.price}>{pack.priceLabel}</Text>
          <Button
            title="Megveszem"
            variant="secondary"
            loading={busy === pack.id}
            onPress={() => buyPack(pack.id, pack.credits, pack.priceLabel)}
            style={{ marginTop: spacing.sm }}
          />
        </Card>
      ))}

      <Text style={styles.finePrint}>
        Az előfizetés és a vásárlások az App Store / Google Play fiókodon
        keresztül kerülnek terhelésre, és a mindenkori áruházi feltételek
        szerint mondhatók le.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 24, fontWeight: "800" },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  toggle: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: radius.sm,
  },
  toggleActive: { backgroundColor: colors.primary },
  toggleText: { color: colors.text, fontWeight: "700" },
  toggleBonus: { color: colors.text, fontSize: 11, marginTop: 2 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  planName: { color: colors.text, fontSize: 20, fontWeight: "800" },
  price: { color: colors.primary, fontSize: 18, fontWeight: "700", marginTop: 4 },
  yearlyNote: { color: colors.success, fontSize: 12, marginTop: 2 },
  tagline: { color: colors.textMuted, marginTop: 2, marginBottom: spacing.sm },
  feature: { color: colors.text, lineHeight: 24, fontSize: 14 },
  lead: { color: colors.textMuted, marginBottom: spacing.sm, lineHeight: 20 },
  packTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  finePrint: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 18,
  },
});
