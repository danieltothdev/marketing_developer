import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Badge, Button, Card } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { getShopProduct } from "@/data/products";
import { colors, spacing } from "@/theme";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { ownedProducts } = useSubscription();
  const product = getShopProduct(id);

  if (!product) {
    return (
      <Text style={{ color: colors.text, padding: spacing.md }}>
        A termék nem található.
      </Text>
    );
  }

  if (!ownedProducts.includes(product.id)) {
    return (
      <>
        <Stack.Screen options={{ title: product.title }} />
        <ScrollView contentContainerStyle={styles.container}>
          <Card>
            <Text style={styles.locked}>
              🔒 Ez a csomag még nincs megvásárolva.
            </Text>
            <Button
              title="Ugrás a boltba"
              onPress={() => router.push("/shop")}
              style={{ marginTop: spacing.sm }}
            />
          </Card>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: product.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Badge label="Megvásárolva ✅" tone="success" />
        <Text style={styles.title}>
          {product.emoji} {product.title}
        </Text>
        <Text style={styles.tip}>
          Tipp: nyomd hosszan bármelyik sablont a másoláshoz, és illeszd be a
          saját szövegeiddel kitöltve.
        </Text>
        {product.sections.map((section, si) => (
          <Card key={si}>
            <Text style={styles.sectionHeading}>{section.heading}</Text>
            {section.items.map((item, ii) => (
              <Text key={ii} selectable style={styles.item}>
                {item}
              </Text>
            ))}
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  locked: { color: colors.text, fontSize: 16, textAlign: "center" },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    marginTop: spacing.sm,
  },
  tip: {
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: spacing.md,
    lineHeight: 20,
    fontSize: 13,
  },
  sectionHeading: {
    color: colors.accent,
    fontWeight: "800",
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  item: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    paddingLeft: 10,
  },
});
