import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Card } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { COURSES } from "@/data/courses";
import { colors, spacing } from "@/theme";

export default function AcademyScreen() {
  const router = useRouter();
  const { isPremium, completedLessons } = useSubscription();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.lead}>
        Rövid, gyakorlati leckék — mindegyik 5-8 perc, és azonnal használható
        tudást ad.
      </Text>
      {COURSES.map((course) => {
        const done = course.lessons.filter((l) =>
          completedLessons.includes(`${course.id}/${l.id}`)
        ).length;
        const locked = course.isPremium && !isPremium;
        return (
          <Card
            key={course.id}
            onPress={() =>
              locked
                ? router.push("/paywall")
                : router.push(`/course/${course.id}`)
            }
          >
            <View style={styles.row}>
              <Text style={{ fontSize: 28 }}>{course.emoji}</Text>
              <View style={{ flex: 1, marginLeft: spacing.sm }}>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.desc}>{course.description}</Text>
                <View style={styles.metaRow}>
                  <Badge label={course.level} tone="muted" />
                  {locked ? (
                    <Badge label="🔒 Előfizetéssel" tone="gold" />
                  ) : (
                    <Badge
                      label={`${done}/${course.lessons.length} lecke kész`}
                      tone={done === course.lessons.length ? "success" : "primary"}
                    />
                  )}
                </View>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  lead: { color: colors.textMuted, marginBottom: spacing.md, lineHeight: 20 },
  row: { flexDirection: "row", alignItems: "flex-start" },
  title: { color: colors.text, fontSize: 16, fontWeight: "700" },
  desc: { color: colors.textMuted, fontSize: 13, marginTop: 4, lineHeight: 18 },
  metaRow: { flexDirection: "row", gap: 8, marginTop: spacing.sm },
});
