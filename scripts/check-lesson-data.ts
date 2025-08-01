import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Verificando dados da lição...");

    const userId = "user_2tYDgI1GAsM7q5LlYuNsThKjqe7";

    // Verificar progresso do usuário
    const userProgress = await db.query.userProgress.findFirst({
      where: eq(schema.userProgress.userId, userId),
    });

    console.log("📋 Progresso do usuário:", userProgress);

    if (!userProgress?.activeCourseId) {
      console.log("❌ Usuário não tem curso ativo");
      return;
    }

    // Verificar unidades do curso
    const units = await db.query.units.findMany({
      where: eq(schema.units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          with: {
            challenges: {
              with: {
                challengeOptions: true,
              },
            },
          },
        },
      },
    });

    console.log("📋 Unidades encontradas:", units.length);

    // Verificar primeira lição
    const firstLesson = units[0]?.lessons[0];
    console.log("📋 Primeira lição:", firstLesson);

    if (firstLesson) {
      console.log("📋 Desafios da primeira lição:", firstLesson.challenges.length);
      firstLesson.challenges.forEach((challenge, index) => {
        console.log(`  Desafio ${index + 1}:`, {
          id: challenge.id,
          question: challenge.question,
          options: challenge.challengeOptions.length,
        });
      });
    }

  } catch (error) {
    console.error("❌ Erro ao verificar dados:", error);
  }
};

main(); 