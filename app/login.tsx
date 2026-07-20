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
import { BrandMark, Button } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { colors, radius, spacing } from "@/theme";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedName.length < 2) {
      setError("Add meg a neved.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Adj meg egy érvényes e-mail címet.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await signIn({
        name: trimmedName,
        email: trimmedEmail,
        businessName: businessName.trim() || undefined,
      });
      router.replace("/");
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <BrandMark size={110} />
          <Text style={styles.brand}>TD-AI</Text>
          <Text style={styles.brandSub}>& Marketing Ügynökség</Text>
          <Text style={styles.tagline}>
            AI-marketing, tanulás és automatizáció — hogy a vállalkozásod
            gyökeret verjen és teremjen. 🌳
          </Text>
        </View>

        <Text style={styles.label}>Neved</Text>
        <TextInput
          style={styles.input}
          placeholder="pl. Tóth Dániel"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>E-mail címed</Text>
        <TextInput
          style={styles.input}
          placeholder="pl. daniel@cegem.hu"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Vállalkozásod neve (opcionális)</Text>
        <TextInput
          style={styles.input}
          placeholder="pl. Tóth Bt."
          placeholderTextColor={colors.textMuted}
          value={businessName}
          onChangeText={setBusinessName}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Button
          title="Belépés ✨"
          onPress={submit}
          loading={busy}
          style={{ marginTop: spacing.md }}
        />

        <Text style={styles.finePrint}>
          A belépéssel elfogadod a felhasználási feltételeket. Az adataidat
          bizalmasan kezeljük, harmadik félnek nem adjuk ki.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  header: { alignItems: "center", marginBottom: spacing.xl },
  brand: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 6,
    marginTop: spacing.md,
  },
  brandSub: {
    color: colors.textMuted,
    fontSize: 13,
    letterSpacing: 2,
    marginTop: 2,
  },
  tagline: {
    color: colors.text,
    textAlign: "center",
    marginTop: spacing.md,
    lineHeight: 22,
    fontSize: 14,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 6,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    color: colors.text,
    padding: 14,
    fontSize: 15,
  },
  error: { color: colors.danger, marginTop: spacing.sm },
  finePrint: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginTop: spacing.md,
    lineHeight: 16,
  },
});
