import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Card } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { getCourse } from "@/data/courses";
import { colors, spacing } from "@/theme";

export default function CourseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completedLessons } = useSubscription();
  const course = getCourse(id);

  if (!course) {
    return <Text style={{ color: colors.text, padding: spacing.md }}>A kurzus nem található.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: course.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ fontSize: 40 }}>{course.emoji}</Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.desc}>{course.description}</Text>
        <View style={{ flexDirection: "row", gap: 8, marginTop: spacing.sm }}>
          <Badge label={course.level} tone="muted" />
          <Badge label={`${course.lessons.length} lecke`} tone="primary" />
        </View>

        <View style={{ marginTop: spacing.lg }}>
          {course.lessons.map((lesson, i) => {
            const done = completedLessons.includes(`${course.id}/${lesson.id}`);
            return (
              <Card
                key={lesson.id}
                onPress={() =>
                  router.push(`/lesson/${course.id}/${lesson.id}`)
                }
              >
                <View style={styles.lessonRow}>
                  <Ionicons
                    name={done ? "checkmark-circle" : "play-circle-outline"}
                    size={26}
                    color={done ? colors.success : colors.primary}
                  />
                  <View style={{ flex: 1, marginLeft: spacing.sm }}>
                    <Text style={styles.lessonTitle}>
                      {i + 1}. {lesson.title}
                    </Text>
                    <Text style={styles.lessonMeta}>
                      {lesson.durationMin} perc
                      {lesson.quiz ? " · kvízzel" : ""}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginTop: spacing.sm },
  desc: { color: colors.textMuted, marginTop: 6, lineHeight: 21 },
  lessonRow: { flexDirection: "row", alignItems: "center" },
  lessonTitle: { color: colors.text, fontWeight: "700", fontSize: 15 },
  lessonMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
});
