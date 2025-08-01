import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Configurando progresso do usuário...");

    // Buscar o usuário existente ou criar um novo
    const userId = "user_2tYDgI1GAsM7q5LlYuNsThKjqe7"; // Seu user ID

    // Verificar se já existe progresso
    const existingProgress = await db.query.userProgress.findFirst({
      where: eq(schema.userProgress.userId, userId),
    });

    if (existingProgress) {
      console.log("✅ Progresso do usuário já existe:", existingProgress);
      return;
    }

    // Criar progresso do usuário com o curso de inglês ativo
    const userProgress = await db.insert(schema.userProgress).values({
      userId: userId,
      userName: "Ramon",
      userImageSrc: "/lili.svg",
      activeCourseId: 1, // Curso de inglês
      hearts: 5,
      points: 0,
      gems: 0,
    }).returning();

    console.log("✅ Progresso do usuário criado:", userProgress[0]);

  } catch (error) {
    console.error("❌ Erro ao configurar progresso:", error);
    throw new Error("Failed to setup user progress");
  }
};

main(); 