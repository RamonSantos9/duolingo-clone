import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Testando função getCourseProgress...");

    const userId = "user_2tYDgI1GAsM7q5LlYuNsThKjqe7";

    // Simular getUserProgress
    const userProgress = await db.query.userProgress.findFirst({
      where: eq(schema.userProgress.userId, userId),
    });

    console.log("📋 Progresso do usuário:", userProgress);

    if (!userProgress?.activeCourseId) {
      console.log("❌ Usuário não tem curso ativo");
      return;
    }

    // Simular getCourseProgress
    const unitsInActiveCourse = await db.query.units.findMany({
      orderBy: [schema.units.order],
      where: eq(schema.units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          orderBy: [schema.lessons.order],
          with: {
            challenges: {
              with: {
                challengeProgress: {
                  where: eq(schema.challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });

    console.log("📋 Unidades encontradas:", unitsInActiveCourse.length);

    // Encontrar primeira lição não completada
    const firstUncompletedLesson = unitsInActiveCourse
      .flatMap((unit) => unit.lessons)
      .find((lesson) => {
        return lesson.challenges.some((challenge) => {
          return (
            !challenge.challengeProgress ||
            challenge.challengeProgress.length === 0 ||
            challenge.challengeProgress.some(
              (progress) => progress.completed === false
            )
          );
        });
      });

    console.log("📋 Primeira lição não completada:", firstUncompletedLesson);

    if (firstUncompletedLesson) {
      console.log("✅ Lição ativa encontrada:", firstUncompletedLesson.id);
    } else {
      console.log("❌ Nenhuma lição não completada encontrada");
    }
  } catch (error) {
    console.error("❌ Erro ao testar getCourseProgress:", error);
  }
};

main();
