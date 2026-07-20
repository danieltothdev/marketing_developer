import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { colors, radius, spacing } from "@/theme";

export function Card({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, style, pressed && { opacity: 0.75 }]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  loading,
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "gold";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  // TD-AI arculat: az arany gombokon sötét szöveg ül, mint a logó érme-felületén.
  const bg =
    variant === "primary"
      ? colors.primary
      : variant === "gold"
        ? colors.accent
        : colors.cardAlt;
  const fg = variant === "secondary" ? colors.text : colors.onGold;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.8 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text style={[styles.buttonText, { color: fg }]}>{title}</Text>
      )}
    </Pressable>
  );
}

export function Badge({
  label,
  tone = "primary",
}: {
  label: string;
  tone?: "primary" | "gold" | "muted" | "success";
}) {
  const map = {
    primary: { bg: colors.primarySoft, fg: colors.accent },
    gold: { bg: colors.accentSoft, fg: "#F6D584" },
    muted: { bg: colors.cardAlt, fg: colors.textMuted },
    success: { bg: "#22301A", fg: colors.success },
  } as const;
  const t = map[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }]}>
      <Text style={{ color: t.fg, fontSize: 12, fontWeight: "600" }}>{label}</Text>
    </View>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

// TD-AI életfa logó az assets/logo.png fájlból. A fájl cseréjével
// (ugyanezen a néven) azonnal a valódi logó jelenik meg mindenhol.
export function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <Image
      source={require("../../assets/logo.png")}
      style={[
        styles.brandCircle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
      resizeMode="cover"
    />
  );
}

export function BrandHeader() {
  return (
    <View style={styles.brandRow}>
      <BrandMark />
      <View style={{ marginLeft: spacing.sm }}>
        <Text style={styles.brandName}>TD-AI</Text>
        <Text style={styles.brandSub}>& Marketing Ügynökség</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
  },
  button: {
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  brandCircle: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  brandName: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 3,
  },
  brandSub: {
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 1,
  },
});
