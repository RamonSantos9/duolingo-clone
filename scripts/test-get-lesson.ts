import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Testando função getLesson...");

    const userId = "user_2tYDgI1GAsM7q5LlYuNsThKjqe7";

    // Simular a função getCourseProgress
    const userProgress = await db.query.userProgress.findFirst({
      where: eq(schema.userProgress.userId, userId),
    });

    console.log("📋 Progresso do usuário:", userProgress);

    if (!userProgress?.activeCourseId) {
      console.log("❌ Usuário não tem curso ativo");
      return;
    }

    // Buscar primeira lição diretamente
    const lesson = await db.query.lessons.findFirst({
      where: eq(schema.lessons.id, 1), // Primeira lição
      with: {
        challenges: {
          orderBy: (challenges, { asc }) => [asc(challenges.order)],
          with: {
            challengeOptions: true,
            challengeProgress: {
              where: eq(schema.challengeProgress.userId, userId),
            },
          },
        },
      },
    });

    console.log("📋 Lição encontrada:", lesson);
    console.log("📋 Desafios:", lesson?.challenges.length);

    if (lesson?.challenges) {
      lesson.challenges.forEach((challenge, index) => {
        const completed = challenge.challengeProgress && 
          challenge.challengeProgress.length > 0 && 
          challenge.challengeProgress.every((progress) => progress.completed);
        
        console.log(`  Desafio ${index + 1}:`, {
          id: challenge.id,
          question: challenge.question,
          options: challenge.challengeOptions.length,
          completed: completed,
          progressCount: challenge.challengeProgress.length,
        });
      });
    }

  } catch (error) {
    console.error("❌ Erro ao testar getLesson:", error);
  }
};

main(); 