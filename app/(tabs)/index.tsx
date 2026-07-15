import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card, SectionTitle } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { COURSES } from "@/data/courses";
import { colors, spacing } from "@/theme";

export default function HomeScreen() {
  const router = useRouter();
  const { plan, creditsRemaining, isPremium, completedLessons } = useSubscription();

  const totalLessons = COURSES.reduce((n, c) => n + c.lessons.length, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.hello}>Szia! 👋</Text>
      <Text style={styles.subtitle}>
        Mit hozzunk ki ma a marketingedből?
      </Text>

      <Card>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.cardLabel}>Csomagod</Text>
            <Text style={styles.cardValue}>{plan.name}</Text>
          </View>
          <View>
            <Text style={styles.cardLabel}>AI-kredit</Text>
            <Text style={styles.cardValue}>
              {creditsRemaining === -1 ? "∞" : creditsRemaining}
            </Text>
          </View>
          <View>
            <Text style={styles.cardLabel}>Leckék</Text>
            <Text style={styles.cardValue}>
              {completedLessons.length}/{totalLessons}
            </Text>
          </View>
        </View>
        {!isPremium && (
          <Button
            title="Váltás Próra – korlátlan AI 🚀"
            variant="gold"
            onPress={() => router.push("/paywall")}
            style={{ marginTop: spacing.md }}
          />
        )}
      </Card>

      <SectionTitle>Gyorsindítás</SectionTitle>

      <Card onPress={() => router.push("/copilot")}>
        <Badge label="AI" tone="primary" />
        <Text style={styles.itemTitle}>✨ Generálj tartalmat</Text>
        <Text style={styles.itemDesc}>
          Poszt, hirdetés, e-mail vagy havi tartalomnaptár — másodpercek alatt,
          a vállalkozásodra szabva.
        </Text>
      </Card>

      <Card onPress={() => router.push("/audit")}>
        <Badge label="Ingyenes" tone="success" />
        <Text style={styles.itemTitle}>📊 AI Marketing Audit</Text>
        <Text style={styles.itemDesc}>
          8 kérdés, 2 perc — és megkapod, hol tart a marketinged, és mi a
          következő 4 lépésed.
        </Text>
      </Card>

      <Card onPress={() => router.push("/academy")}>
        <Badge label="Tanulás" tone="gold" />
        <Text style={styles.itemTitle}>🎓 Mai 5 perces lecke</Text>
        <Text style={styles.itemDesc}>
          Rövid, gyakorlati leckék marketingről és automatizációról — kávészünet
          alatt elvégezhető.
        </Text>
      </Card>

      <Card onPress={() => router.push("/automation")}>
        <Badge label="Időspórolás" tone="primary" />
        <Text style={styles.itemTitle}>⚙️ Automatizációs receptek</Text>
        <Text style={styles.itemDesc}>
          Kész, lépésről lépésre útmutatók, amikkel heti órákat spórolsz —
          programozás nélkül.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  hello: { color: colors.text, fontSize: 26, fontWeight: "800" },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  cardLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 2 },
  cardValue: { color: colors.text, fontSize: 20, fontWeight: "800" },
  itemTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700",
    marginTop: spacing.sm,
  },
  itemDesc: { color: colors.textMuted, fontSize: 14, marginTop: 4, lineHeight: 20 },
});
