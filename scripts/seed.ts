import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Inglês",
        imageSrc: "/icons/eua.svg",
      },
      {
        id: 2,
        title: "Espanhol",
        imageSrc: "/icons/es.svg",
      },
      {
        id: 3,
        title: "Francês",
        imageSrc: "/icons/fr.svg",
      },
      {
        id: 4,
        title: "Alemão",
        imageSrc: "/icons/de.svg",
      },
      {
        id: 5,
        title: "Italiano",
        imageSrc: "/icons/it.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Inglês
        title: "Seção 1, Unidade 1",
        description: "Faça pedido em um café",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unidade 1 (aprenda o basico do ingles)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unidade 1 (aprenda o basico do ingles)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, // Unidade 1 (aprenda o basico do ingles)
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1, // Unidade 1 (aprenda o basico do ingles)
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitId: 1, // Unidade 1 (aprenda o basico do ingles)
        order: 5,
        title: "Verbs",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "café"?',
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "chá"?',
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "Aguá"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // challenge 1
        imageSrc: "tea.svg",
        correct: false,
        text: "tea",
        audioSrc: "tea.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "coffee.svg",
        correct: true,
        text: "coffee",
        audioSrc: "coffee.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "water.svg",
        correct: false,
        text: "water",
        audioSrc: "water.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, // challenge 2
        imageSrc: "coffee.svg",
        correct: false,
        text: "coffee",
        audioSrc: "coffe.mp3",
      },
      {
        challengeId: 2,
        imageSrc: "water.svg",
        correct: false,
        text: "water",
        audioSrc: "water.mp3",
      },
      {
        challengeId: 2,
        imageSrc: "tea.svg",
        correct: true,
        text: "tea",
        audioSrc: "tea.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // challenge 3
        imageSrc: "coffee.svg",
        correct: false,
        text: "coffee",
        audioSrc: "coffee.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "water.svg",
        correct: true,
        text: "water",
        audioSrc: "water.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "tea.svg",
        correct: false,
        text: "tea",
        audioSrc: "tea.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "café"?',
      },
      {
        id: 5,
        lessonId: 2,
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "chá"?',
      },
      {
        id: 6,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "Aguá"?',
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
