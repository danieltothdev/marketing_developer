import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Badge, Button, Card } from "@/components/ui";
import { useSubscription } from "@/context/SubscriptionContext";
import { getCourse } from "@/data/courses";
import { colors, radius, spacing } from "@/theme";

export default function LessonScreen() {
  const { courseId, lessonId } = useLocalSearchParams<{
    courseId: string;
    lessonId: string;
  }>();
  const router = useRouter();
  const { markLessonCompleted, completedLessons } = useSubscription();

  const course = getCourse(courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const key = `${courseId}/${lessonId}`;
  const done = completedLessons.includes(key);

  if (!course || !lesson) {
    return <Text style={{ color: colors.text, padding: spacing.md }}>A lecke nem található.</Text>;
  }

  const quiz = lesson.quiz ?? [];
  const allCorrect =
    quiz.length === 0 ||
    quiz.every((q, i) => answers[i] === q.correctIndex);

  const complete = async () => {
    await markLessonCompleted(key);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: lesson.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Badge label={`${lesson.durationMin} perces lecke`} tone="primary" />
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.content}>{lesson.content}</Text>

        {quiz.length > 0 && (
          <Card style={{ marginTop: spacing.lg }}>
            <Badge label="Gyors kvíz" tone="gold" />
            {quiz.map((q, qi) => (
              <React.Fragment key={qi}>
                <Text style={styles.question}>{q.question}</Text>
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  const correct = selected && oi === q.correctIndex;
                  const wrong = selected && oi !== q.correctIndex;
                  return (
                    <Pressable
                      key={oi}
                      onPress={() => setAnswers({ ...answers, [qi]: oi })}
                      style={[
                        styles.option,
                        selected && {
                          borderColor: correct ? colors.success : colors.danger,
                          backgroundColor: colors.cardAlt,
                        },
                      ]}
                    >
                      <Text style={{ color: colors.text }}>
                        {opt}
                        {correct ? "  ✅" : wrong ? "  ❌" : ""}
                      </Text>
                    </Pressable>
                  );
                })}
              </React.Fragment>
            ))}
          </Card>
        )}

        <Button
          title={done ? "Elvégezve ✅" : "Lecke befejezése"}
          onPress={complete}
          disabled={done || !allCorrect}
          style={{ marginTop: spacing.lg }}
        />
        {!allCorrect && quiz.length > 0 && (
          <Text style={styles.hint}>
            Válaszold meg helyesen a kvízt a lecke befejezéséhez.
          </Text>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  title: {
    color: colors.text,
    fontSize: 21,
    fontWeight: "800",
    marginTop: spacing.sm,
  },
  content: {
    color: colors.text,
    marginTop: spacing.md,
    fontSize: 15,
    lineHeight: 24,
  },
  question: {
    color: colors.text,
    fontWeight: "700",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 12,
    marginBottom: spacing.sm,
  },
  hint: { color: colors.textMuted, textAlign: "center", marginTop: spacing.sm },
});
