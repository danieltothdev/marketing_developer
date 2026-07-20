import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import {
  DEEP_AUDIT_CATEGORIES,
  DEEP_AUDIT_MAX_PER_CATEGORY,
  getDeepAuditBand,
} from "@/data/deepAudit";
import { DEEP_AUDIT_PRODUCT } from "@/data/products";
import { colors, radius, spacing } from "@/theme";

export default function DeepAuditScreen() {
  const router = useRouter();
  const { ownedProducts, buyProduct } = useSubscription();
  const owned = ownedProducts.includes(DEEP_AUDIT_PRODUCT.id);

  const [busy, setBusy] = useState(false);
  // answers: "kategória.kérdésId" -> kiválasztott opció indexe
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const buy = async () => {
    setBusy(true);
    try {
      // Élesben: RevenueCat non-consumable vásárlás.
      await buyProduct(DEEP_AUDIT_PRODUCT.id);
      Alert.alert("Sikeres vásárlás ✅", "A mélyaudit a tiéd — kezdheted is. (Demó mód)");
    } finally {
      setBusy(false);
    }
  };

  // ---- Értékesítési oldal, ha még nincs megvéve ----
  if (!owned) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ fontSize: 40 }}>{DEEP_AUDIT_PRODUCT.emoji}</Text>
        <Text style={styles.title}>{DEEP_AUDIT_PRODUCT.title}</Text>
        <Text style={styles.lead}>{DEEP_AUDIT_PRODUCT.description}</Text>
        <Card>
          <Text style={styles.sellHeading}>Mit kapsz?</Text>
          {[
            "30 kérdés, 6 terület: pozicionálás, jelenlét, lead-szerzés, hirdetés, megtartás, automatizáció",
            "Területenkénti pontszám és erősség–gyengeség térkép",
            "Személyre szabott javaslatok a leggyengébb területeidre",
            "Bármikor újra kitöltheted, és követheted a fejlődést",
          ].map((b, i) => (
            <Text key={i} style={styles.bullet}>
              ✓ {b}
            </Text>
          ))}
        </Card>
        <Card>
          <Text style={styles.sellHeading}>Kinek való?</Text>
          <Text style={styles.desc}>
            Annak a vállalkozónak, aki pontosan tudni akarja, hol folyik el a
            pénz és az idő a marketingjében — mielőtt ügynökségre vagy
            hirdetésre költene. Egy tanácsadói átvilágítás töredékéért.
          </Text>
        </Card>
        <Button
          title={`Megveszem — ${DEEP_AUDIT_PRODUCT.priceLabel}`}
          variant="gold"
          loading={busy}
          onPress={buy}
        />
        <Button
          title="Előbb kipróbálom az ingyenes auditot"
          variant="secondary"
          onPress={() => router.push("/audit")}
          style={{ marginTop: spacing.sm }}
        />
      </ScrollView>
    );
  }

  // ---- Eredmény ----
  if (submitted) {
    const categoryScores = DEEP_AUDIT_CATEGORIES.map((cat) => {
      const score = cat.questions.reduce((sum, q) => {
        const idx = answers[`${cat.id}.${q.id}`];
        return sum + (idx !== undefined ? q.options[idx].score : 0);
      }, 0);
      return { cat, score };
    });
    const total = categoryScores.reduce((s, c) => s + c.score, 0);
    const band = getDeepAuditBand(total);
    const weak = categoryScores.filter(
      (c) => c.score < DEEP_AUDIT_MAX_PER_CATEGORY * 0.6
    );

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={{ backgroundColor: colors.cardAlt }}>
          <Badge
            label={`Összpontszám: ${total} / ${DEEP_AUDIT_CATEGORIES.length * DEEP_AUDIT_MAX_PER_CATEGORY}`}
            tone="primary"
          />
          <Text style={styles.title}>{band.title}</Text>
          <Text style={styles.desc}>{band.summary}</Text>
        </Card>

        <Card>
          <Text style={styles.sellHeading}>Területenkénti eredmény</Text>
          {categoryScores.map(({ cat, score }) => {
            const pct = score / DEEP_AUDIT_MAX_PER_CATEGORY;
            const barColor =
              pct >= 0.6 ? colors.success : pct >= 0.35 ? colors.accent : colors.danger;
            return (
              <View key={cat.id} style={{ marginBottom: spacing.sm }}>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreLabel}>
                    {cat.emoji} {cat.title}
                  </Text>
                  <Text style={[styles.scoreValue, { color: barColor }]}>
                    {score}/{DEEP_AUDIT_MAX_PER_CATEGORY}
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: `${Math.max(4, pct * 100)}%`, backgroundColor: barColor },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </Card>

        {weak.length > 0 ? (
          weak.map(({ cat }) => (
            <Card key={cat.id} style={{ borderColor: colors.danger }}>
              <Text style={styles.sellHeading}>
                {cat.emoji} {cat.title} — ezzel kezdd
              </Text>
              {cat.recommendations.map((r, i) => (
                <Text key={i} style={styles.bullet}>
                  {i + 1}. {r}
                </Text>
              ))}
            </Card>
          ))
        ) : (
          <Card style={{ borderColor: colors.success }}>
            <Text style={styles.sellHeading}>Nincs kritikus terület 🎉</Text>
            <Text style={styles.desc}>
              Minden területed 60% felett teljesít — nálad a finomhangolás és a
              skálázás a következő lépés.
            </Text>
          </Card>
        )}

        {categoryScores
          .filter((c) => c.score >= DEEP_AUDIT_MAX_PER_CATEGORY * 0.7)
          .map(({ cat }) => (
            <Card key={cat.id} style={{ borderColor: colors.success }}>
              <Text style={styles.strengthText}>
                💪 {cat.emoji} {cat.strengthNote}
              </Text>
            </Card>
          ))}

        <Button
          title="Újrakitöltés"
          variant="secondary"
          onPress={() => {
            setAnswers({});
            setSubmitted(false);
          }}
        />
      </ScrollView>
    );
  }

  // ---- Kérdőív ----
  const totalQuestions = DEEP_AUDIT_CATEGORIES.reduce(
    (n, c) => n + c.questions.length,
    0
  );
  const answered = Object.keys(answers).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Badge label={`${answered} / ${totalQuestions} megválaszolva`} tone="primary" />
      {DEEP_AUDIT_CATEGORIES.map((cat) => (
        <View key={cat.id}>
          <Text style={styles.categoryTitle}>
            {cat.emoji} {cat.title}
          </Text>
          {cat.questions.map((q) => {
            const key = `${cat.id}.${q.id}`;
            return (
              <Card key={key}>
                <Text style={styles.question}>{q.question}</Text>
                {q.options.map((optItem, oi) => (
                  <Pressable
                    key={oi}
                    onPress={() => setAnswers({ ...answers, [key]: oi })}
                    style={[
                      styles.option,
                      answers[key] === oi && {
                        borderColor: colors.primary,
                        backgroundColor: colors.cardAlt,
                      },
                    ]}
                  >
                    <Text style={{ color: colors.text }}>{optItem.label}</Text>
                  </Pressable>
                ))}
              </Card>
            );
          })}
        </View>
      ))}
      <Button
        title="Kiértékelés 🔬"
        onPress={() => setSubmitted(true)}
        disabled={answered < totalQuestions}
      />
      {answered < totalQuestions && (
        <Text style={styles.hint}>
          Még {totalQuestions - answered} kérdés van hátra.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginTop: spacing.sm },
  lead: { color: colors.textMuted, marginTop: 6, marginBottom: spacing.md, lineHeight: 21 },
  sellHeading: { color: colors.text, fontWeight: "800", fontSize: 15, marginBottom: spacing.sm },
  bullet: { color: colors.text, fontSize: 14, lineHeight: 22, marginBottom: 4 },
  desc: { color: colors.textMuted, lineHeight: 21, marginTop: 4 },
  categoryTitle: {
    color: colors.accent,
    fontWeight: "800",
    fontSize: 16,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  question: { color: colors.text, fontWeight: "700", marginBottom: spacing.sm },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 12,
    marginBottom: spacing.sm,
  },
  hint: { color: colors.textMuted, textAlign: "center", marginTop: spacing.sm },
  scoreRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  scoreLabel: { color: colors.text, fontSize: 13, fontWeight: "600" },
  scoreValue: { fontSize: 13, fontWeight: "800" },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cardAlt,
    overflow: "hidden",
  },
  barFill: { height: 8, borderRadius: 4 },
  strengthText: { color: colors.text, lineHeight: 21 },
});
