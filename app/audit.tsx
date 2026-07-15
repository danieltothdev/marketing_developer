import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { AUDIT_QUESTIONS, getAuditBand } from "@/data/audit";
import { colors, radius, spacing } from "@/theme";

export default function AuditScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // answers: kérdés-azonosító -> kiválasztott opció indexe
  const answeredAll = AUDIT_QUESTIONS.every((q) => answers[q.id] !== undefined);
  const score = AUDIT_QUESTIONS.reduce(
    (sum, q) =>
      sum + (answers[q.id] !== undefined ? q.options[answers[q.id]].score : 0),
    0
  );
  const maxScore = AUDIT_QUESTIONS.length * 2;
  const band = getAuditBand(score);

  if (submitted) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={{ backgroundColor: colors.cardAlt }}>
          <Badge label={`Pontszám: ${score} / ${maxScore}`} tone="primary" />
          <Text style={styles.resultTitle}>{band.title}</Text>
          <Text style={styles.resultSummary}>{band.summary}</Text>
        </Card>

        <Card>
          <Text style={styles.actionsTitle}>A következő 4 lépésed:</Text>
          {band.actions.map((a, i) => (
            <Text key={i} style={styles.actionItem}>
              {i + 1}. {a}
            </Text>
          ))}
        </Card>

        {!isPremium && (
          <Card style={{ borderColor: colors.accent }}>
            <Text style={styles.upsellTitle}>
              🚀 Kell egy részletes, személyre szabott akcióterv?
            </Text>
            <Text style={styles.upsellDesc}>
              A Pro csomagban az AI a válaszaid alapján részletes, iparág-specifikus
              marketingtervet készít — a Business csomagban pedig havi élő
              konzultáción megyünk végig rajta együtt.
            </Text>
            <Button
              title="Csomagok megtekintése"
              variant="gold"
              onPress={() => router.push("/paywall")}
              style={{ marginTop: spacing.sm }}
            />
          </Card>
        )}

        <Button
          title="Újrakezdés"
          variant="secondary"
          onPress={() => {
            setAnswers({});
            setSubmitted(false);
          }}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.lead}>
        8 kérdés, 2 perc. A végén megtudod, hol tart a marketinged, és mi a
        következő lépésed.
      </Text>
      {AUDIT_QUESTIONS.map((q, qi) => (
        <Card key={q.id}>
          <Text style={styles.question}>
            {qi + 1}. {q.question}
          </Text>
          {q.options.map((opt, oi) => (
            <Pressable
              key={oi}
              onPress={() => setAnswers({ ...answers, [q.id]: oi })}
              style={[
                styles.option,
                answers[q.id] === oi && {
                  borderColor: colors.primary,
                  backgroundColor: colors.cardAlt,
                },
              ]}
            >
              <Text style={{ color: colors.text }}>{opt.label}</Text>
            </Pressable>
          ))}
        </Card>
      ))}
      <Button
        title="Kiértékelés 📊"
        onPress={() => setSubmitted(true)}
        disabled={!answeredAll}
      />
      {!answeredAll && (
        <Text style={styles.hint}>Válaszolj minden kérdésre a kiértékeléshez.</Text>
      )}
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  lead: { color: colors.textMuted, marginBottom: spacing.md, lineHeight: 20 },
  question: { color: colors.text, fontWeight: "700", marginBottom: spacing.sm },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 12,
    marginBottom: spacing.sm,
  },
  hint: { color: colors.textMuted, textAlign: "center", marginTop: spacing.sm },
  resultTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
    marginTop: spacing.sm,
  },
  resultSummary: { color: colors.text, marginTop: spacing.sm, lineHeight: 22 },
  actionsTitle: { color: colors.text, fontWeight: "700", marginBottom: spacing.sm },
  actionItem: { color: colors.textMuted, lineHeight: 22, marginBottom: 6 },
  upsellTitle: { color: colors.text, fontWeight: "700", fontSize: 16 },
  upsellDesc: { color: colors.textMuted, marginTop: 6, lineHeight: 20 },
});
