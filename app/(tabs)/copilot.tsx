import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Badge, Button, Card, SectionTitle } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import {
  BusinessProfile,
  GENERATION_KINDS,
  GenerationKind,
  generate,
} from "@/lib/ai";
import { colors, radius, spacing } from "@/theme";

export default function CopilotScreen() {
  const router = useRouter();
  const { canGenerate, creditsRemaining, consumeCredit } = useSubscription();

  const [kind, setKind] = useState<GenerationKind>("post");
  const [profile, setProfile] = useState<BusinessProfile>({
    businessName: "",
    industry: "",
    audience: "",
    goal: "",
  });
  const [extra, setExtra] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGenerate = async () => {
    if (!canGenerate) {
      router.push("/paywall");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const text = await generate(kind, profile, extra);
      setResult(text);
      await consumeCredit();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Hiba történt a generálás közben."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.creditsRow}>
          <Badge
            label={
              creditsRemaining === -1
                ? "Korlátlan AI-kredit"
                : `${creditsRemaining} kredit maradt e hónapban`
            }
            tone={creditsRemaining === 0 ? "muted" : "primary"}
          />
        </View>

        <SectionTitle>Mit generáljunk?</SectionTitle>
        <View style={styles.kindGrid}>
          {GENERATION_KINDS.map((k) => (
            <Card
              key={k.id}
              onPress={() => setKind(k.id)}
              style={{
                width: "48%",
                borderColor: kind === k.id ? colors.primary : colors.border,
                backgroundColor: kind === k.id ? colors.cardAlt : colors.card,
              }}
            >
              <Text style={{ fontSize: 22 }}>{k.emoji}</Text>
              <Text style={styles.kindLabel}>{k.label}</Text>
              <Text style={styles.kindDesc}>{k.description}</Text>
            </Card>
          ))}
        </View>

        <SectionTitle>A vállalkozásod</SectionTitle>
        <Input
          placeholder="Vállalkozás neve (pl. Kovács Fogtechnika)"
          value={profile.businessName}
          onChangeText={(v) => setProfile({ ...profile, businessName: v })}
        />
        <Input
          placeholder="Iparág / szolgáltatás (pl. fogtechnikai labor)"
          value={profile.industry}
          onChangeText={(v) => setProfile({ ...profile, industry: v })}
        />
        <Input
          placeholder="Célközönség (pl. fogorvosi rendelők Budapesten)"
          value={profile.audience}
          onChangeText={(v) => setProfile({ ...profile, audience: v })}
        />
        <Input
          placeholder="Cél (pl. új partnerrendelők megszerzése)"
          value={profile.goal}
          onChangeText={(v) => setProfile({ ...profile, goal: v })}
        />
        <Input
          placeholder="Egyéb kérés (hangnem, konkrét téma…) — opcionális"
          value={extra}
          onChangeText={setExtra}
          multiline
        />

        <Button
          title={canGenerate ? "Generálás ✨" : "Elfogytak a kreditek – csomagváltás"}
          onPress={onGenerate}
          loading={loading}
          variant={canGenerate ? "primary" : "gold"}
          style={{ marginTop: spacing.md }}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        {result && (
          <Card style={{ marginTop: spacing.md }}>
            <Badge label="Eredmény" tone="success" />
            <Text selectable style={styles.result}>
              {result}
            </Text>
          </Card>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Input(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      placeholderTextColor={colors.textMuted}
      style={[styles.input, props.multiline && { minHeight: 70 }]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  creditsRow: { flexDirection: "row" },
  kindGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  kindLabel: { color: colors.text, fontWeight: "700", marginTop: 6, fontSize: 14 },
  kindDesc: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    color: colors.text,
    padding: 12,
    marginBottom: spacing.sm,
    fontSize: 15,
  },
  error: { color: colors.danger, marginTop: spacing.sm },
  result: { color: colors.text, marginTop: spacing.sm, lineHeight: 22, fontSize: 15 },
});
