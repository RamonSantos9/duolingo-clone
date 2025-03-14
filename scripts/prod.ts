import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Resetting the database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    // Insere courses
    const courses = await db
      .insert(schema.courses)
      .values([
        {
          title: "Inglês",
          imageSrc: "icons/eua.svg",
        },
      ])
      .returning();

    // Para cada course, insere units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Seção 1, Unidade 1",
            description: `Faça pedido em um café ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Seção 1, Unidade 2",
            description: `Apresente-se ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // Para cada unit, insere lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // Para cada lesson, insere desafios (challenges)
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Qual destas imagens é "Café"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Qual destas imagens é o "Chá"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Qual destas imagens é "Água"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"Sim"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"Açúcar."',
                order: 5,
              },
            ])
            .returning();

          // Para cada desafio, insere as opções correspondentes
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Coffee",
                  imageSrc: "/coffee.svg",
                  audioSrc: "/coffee.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Tea",
                  imageSrc: "/tea.svg",
                  audioSrc: "/tea.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Water",
                  imageSrc: "/water.svg",
                  audioSrc: "/water.mp3",
                },
              ]);
            }
            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Tea",
                  imageSrc: "/tea.svg",
                  audioSrc: "/tea.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Coffee",
                  imageSrc: "/coffee.svg",
                  audioSrc: "/coffee.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Water",
                  imageSrc: "/water.svg",
                  audioSrc: "/water.mp3",
                },
              ]);
            }
            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Water",
                  imageSrc: "/water.svg",
                  audioSrc: "/water.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Coffee",
                  imageSrc: "/coffee.svg",
                  audioSrc: "/coffee.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Tea",
                  imageSrc: "/tea.svg",
                  audioSrc: "/tea.mp3",
                },
              ]);
            }
            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "And",

                  audioSrc: "/and.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Não",

                  audioSrc: "/nao.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Yes",

                  audioSrc: "/yes.mp3",
                },
              ]);
            }
            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Sugar",
                  audioSrc: "/sugar.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Salt",
                  audioSrc: "/salt.mp3",
                },
              ]);
            }
          }
        }
      }
    }

    console.log("Resetting finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
