import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card, SectionTitle } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { TEMPLATES } from "@/data/templates";
import { colors, spacing } from "@/theme";

export default function AutomationScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={{ backgroundColor: colors.cardAlt }}>
        <Text style={styles.auditTitle}>📊 Hol tart a marketinged?</Text>
        <Text style={styles.auditDesc}>
          Töltsd ki a 2 perces auditot, és személyre szabott akciótervet kapsz.
        </Text>
        <Button
          title="AI Marketing Audit indítása"
          onPress={() => router.push("/audit")}
          style={{ marginTop: spacing.sm }}
        />
      </Card>

      <SectionTitle>Automatizációs receptek</SectionTitle>
      <Text style={styles.lead}>
        Kész, lépésről lépésre útmutatók. Egy recept beállítása kb. 30 perc —
        utána magától dolgozik.
      </Text>

      {TEMPLATES.map((t) => {
        const locked = t.isPremium && !isPremium;
        const open = openId === t.id;
        return (
          <Card
            key={t.id}
            onPress={() =>
              locked ? router.push("/paywall") : setOpenId(open ? null : t.id)
            }
          >
            <View style={styles.row}>
              <Text style={{ fontSize: 24 }}>{t.emoji}</Text>
              <View style={{ flex: 1, marginLeft: spacing.sm }}>
                <Text style={styles.title}>{t.title}</Text>
                <View style={styles.metaRow}>
                  <Badge label={t.category} tone="muted" />
                  <Badge label={t.difficulty} tone="primary" />
                  <Badge label={t.timeSavedPerWeek} tone="success" />
                  {locked && <Badge label="🔒" tone="gold" />}
                </View>
              </View>
            </View>
            <Text style={styles.desc}>{t.description}</Text>
            {open && !locked && (
              <View style={styles.steps}>
                <Text style={styles.stepsTitle}>Eszközök:</Text>
                <Text style={styles.stepText}>{t.tools.join(" · ")}</Text>
                <Text style={[styles.stepsTitle, { marginTop: spacing.sm }]}>
                  Lépések:
                </Text>
                {t.steps.map((s, i) => (
                  <Text key={i} style={styles.stepText}>
                    {i + 1}. {s}
                  </Text>
                ))}
              </View>
            )}
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  auditTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  auditDesc: { color: colors.textMuted, marginTop: 4, lineHeight: 20 },
  lead: { color: colors.textMuted, marginBottom: spacing.sm, lineHeight: 20 },
  row: { flexDirection: "row", alignItems: "flex-start" },
  title: { color: colors.text, fontSize: 15, fontWeight: "700" },
  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  desc: { color: colors.textMuted, fontSize: 13, marginTop: spacing.sm, lineHeight: 19 },
  steps: {
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  stepsTitle: { color: colors.text, fontWeight: "700", fontSize: 13 },
  stepText: { color: colors.textMuted, fontSize: 13, lineHeight: 20, marginTop: 2 },
});
