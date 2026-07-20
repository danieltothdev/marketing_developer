import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { DEEP_AUDIT_PRODUCT, SHOP_PRODUCTS } from "@/data/products";
import { colors, spacing } from "@/theme";

export default function ShopScreen() {
  const router = useRouter();
  const { ownedProducts, buyProduct } = useSubscription();
  const [busy, setBusy] = useState<string | null>(null);

  const buy = async (id: string, title: string) => {
    setBusy(id);
    try {
      // Élesben: RevenueCat non-consumable vásárlás.
      await buyProduct(id);
      Alert.alert("Sikeres vásárlás ✅", `A(z) „${title}" a tiéd. (Demó mód)`);
    } finally {
      setBusy(null);
    }
  };

  const deepOwned = ownedProducts.includes(DEEP_AUDIT_PRODUCT.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.lead}>
        Egyszeri vásárlások — előfizetés nélkül is a tiéid, örökre.
      </Text>

      <Card
        style={{ borderColor: colors.accent, borderWidth: 2 }}
        onPress={() => router.push("/deep-audit")}
      >
        <View style={styles.headerRow}>
          <Text style={{ fontSize: 26 }}>{DEEP_AUDIT_PRODUCT.emoji}</Text>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={styles.title}>{DEEP_AUDIT_PRODUCT.title}</Text>
            <Text style={styles.price}>
              {deepOwned ? "Megvásárolva ✅" : DEEP_AUDIT_PRODUCT.priceLabel}
            </Text>
          </View>
        </View>
        <Text style={styles.desc}>{DEEP_AUDIT_PRODUCT.description}</Text>
        <Button
          title={deepOwned ? "Mélyaudit indítása" : "Részletek és vásárlás"}
          variant="gold"
          onPress={() => router.push("/deep-audit")}
          style={{ marginTop: spacing.sm }}
        />
      </Card>

      {SHOP_PRODUCTS.map((p) => {
        const owned = ownedProducts.includes(p.id);
        return (
          <Card key={p.id}>
            <View style={styles.headerRow}>
              <Text style={{ fontSize: 26 }}>{p.emoji}</Text>
              <View style={{ flex: 1, marginLeft: spacing.sm }}>
                <Text style={styles.title}>{p.title}</Text>
                <Text style={styles.price}>
                  {owned ? "Megvásárolva ✅" : p.priceLabel}
                </Text>
              </View>
              {owned && <Badge label="Tiéd" tone="success" />}
            </View>
            <Text style={styles.desc}>{p.description}</Text>
            {p.bullets.map((b, i) => (
              <Text key={i} style={styles.bullet}>
                ✓ {b}
              </Text>
            ))}
            {owned ? (
              <Button
                title="Megnyitás 📂"
                onPress={() => router.push(`/product/${p.id}`)}
                style={{ marginTop: spacing.sm }}
              />
            ) : (
              <Button
                title={`Megveszem — ${p.priceLabel}`}
                variant="gold"
                loading={busy === p.id}
                onPress={() => buy(p.id, p.title)}
                style={{ marginTop: spacing.sm }}
              />
            )}
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  lead: { color: colors.textMuted, marginBottom: spacing.md, lineHeight: 20 },
  headerRow: { flexDirection: "row", alignItems: "center" },
  title: { color: colors.text, fontSize: 16, fontWeight: "700" },
  price: { color: colors.primary, fontWeight: "700", marginTop: 2 },
  desc: { color: colors.textMuted, marginTop: spacing.sm, lineHeight: 20, fontSize: 13 },
  bullet: { color: colors.text, fontSize: 13, lineHeight: 22 },
});
