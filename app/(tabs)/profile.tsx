import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card, SectionTitle } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { COURSES } from "@/data/courses";
import { DEEP_AUDIT_PRODUCT, getShopProduct } from "@/data/products";
import { isBackendConfigured } from "@/lib/supabase";
import { colors, spacing } from "@/theme";

export default function ProfileScreen() {
  const router = useRouter();
  const {
    plan,
    billing,
    creditsUsed,
    creditsRemaining,
    bonusCredits,
    isPremium,
    completedLessons,
    ownedProducts,
  } = useSubscription();

  const totalLessons = COURSES.reduce((n, c) => n + c.lessons.length, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionTitle>Előfizetésed</SectionTitle>
      <Card>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planPrice}>
              {plan.priceLabel}
              {isPremium && billing === "yearly" ? " · éves számlázás 🎁" : ""}
            </Text>
          </View>
          <Badge
            label={isPremium ? "Aktív" : "Ingyenes"}
            tone={isPremium ? "success" : "muted"}
          />
        </View>
        <Button
          title={isPremium ? "Csomag módosítása" : "Előfizetés indítása 🚀"}
          variant={isPremium ? "secondary" : "gold"}
          onPress={() => router.push("/paywall")}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      <SectionTitle>Statisztikáid</SectionTitle>
      <Card>
        <StatRow label="AI-generálás e hónapban" value={String(creditsUsed)} />
        <StatRow
          label="Hátralévő kredit"
          value={creditsRemaining === -1 ? "Korlátlan" : String(creditsRemaining)}
        />
        {bonusCredits > 0 && (
          <StatRow label="Ebből vásárolt kredit" value={String(bonusCredits)} />
        )}
        <StatRow
          label="Elvégzett leckék"
          value={`${completedLessons.length} / ${totalLessons}`}
        />
      </Card>

      <SectionTitle>Vásárlásaid</SectionTitle>
      <Card>
        {ownedProducts.length === 0 ? (
          <Text style={styles.about}>
            Még nincs egyszeri vásárlásod. A boltban sablonokat és a mélyauditot
            találod — előfizetés nélkül is megvehetők.
          </Text>
        ) : (
          ownedProducts.map((id) => (
            <Text key={id} style={styles.ownedItem}>
              ✅ {productLabel(id)}
            </Text>
          ))
        )}
        <Button
          title="Bolt megnyitása 🛒"
          variant="secondary"
          onPress={() => router.push("/shop")}
          style={{ marginTop: spacing.sm }}
        />
      </Card>

      <SectionTitle>Az appról</SectionTitle>
      <Card>
        <Text style={styles.about}>
          KKV Boost — AI-alapú marketing, tanulás és automatizáció magyar kis-
          és középvállalkozásoknak.
        </Text>
        <Text style={[styles.about, { marginTop: spacing.sm }]}>
          Backend: {isBackendConfigured ? "Supabase (éles)" : "demó mód"} · v1.0.0
        </Text>
      </Card>
    </ScrollView>
  );
}

function productLabel(id: string): string {
  if (id === DEEP_AUDIT_PRODUCT.id) return DEEP_AUDIT_PRODUCT.title;
  return getShopProduct(id)?.title ?? id;
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planName: { color: colors.text, fontSize: 20, fontWeight: "800" },
  planPrice: { color: colors.textMuted, marginTop: 2 },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  statLabel: { color: colors.textMuted, fontSize: 14 },
  statValue: { color: colors.text, fontWeight: "700", fontSize: 14 },
  ownedItem: { color: colors.text, lineHeight: 24, fontSize: 14 },
  about: { color: colors.textMuted, lineHeight: 20, fontSize: 13 },
});
