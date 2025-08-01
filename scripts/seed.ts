import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    // Backup dos dados do usuário antes de deletar
    console.log("Backing up user data...");
    const userProgressBackup = await db.select().from(schema.userProgress);
    const userSubscriptionBackup = await db
      .select()
      .from(schema.userSubscription);
    const challengeProgressBackup = await db
      .select()
      .from(schema.challengeProgress);

    console.log(`Backed up ${userProgressBackup.length} user progress records`);
    console.log(
      `Backed up ${userSubscriptionBackup.length} user subscription records`
    );
    console.log(
      `Backed up ${challengeProgressBackup.length} challenge progress records`
    );

    // Deletar dados do curso (mantendo dados do usuário)
    console.log("Deleting course data...");
    await db.delete(schema.courses);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);

    // Deletar dados do usuário (serão restaurados depois)
    console.log("Deleting user data (will be restored)...");
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);
    await db.delete(schema.challengeProgress);

    console.log("Inserting courses...");
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

    console.log("Inserting units...");
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Inglês
        title: "Seção 1, Unidade 1",
        description: "Faça pedido em um café",
        order: 1,
      },
      {
        id: 2,
        courseId: 1, // Inglês
        title: "Seção 1, Unidade 2",
        description: "Apresente-se e conheça pessoas",
        order: 2,
      },
      {
        id: 3,
        courseId: 1, // Inglês
        title: "Seção 2, Unidade 1",
        description: "Viaje pelo mundo",
        order: 3,
      },
      {
        id: 4,
        courseId: 1, // Inglês
        title: "Seção 2, Unidade 2",
        description: "Comunicação no trabalho",
        order: 4,
      },
      {
        id: 5,
        courseId: 1, // Inglês
        title: "Seção 3, Unidade 1",
        description: "Cultura e tradições",
        order: 5,
      },
    ]);

    console.log("Inserting lessons...");
    await db.insert(schema.lessons).values([
      // Lições da Unidade 1
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Adjectives",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Adverbs",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Pronouns",
      },
      // Lições da Unidade 2
      {
        id: 6,
        unitId: 2,
        order: 1,
        title: "Greetings",
      },
      {
        id: 7,
        unitId: 2,
        order: 2,
        title: "Introductions",
      },
      {
        id: 8,
        unitId: 2,
        order: 3,
        title: "Conversations",
      },
      {
        id: 9,
        unitId: 2,
        order: 4,
        title: "Questions",
      },
      {
        id: 10,
        unitId: 2,
        order: 5,
        title: "Answers",
      },
      // Lições da Unidade 3
      {
        id: 11,
        unitId: 3,
        order: 1,
        title: "Travel",
      },
      {
        id: 12,
        unitId: 3,
        order: 2,
        title: "Transportation",
      },
      {
        id: 13,
        unitId: 3,
        order: 3,
        title: "Directions",
      },
      {
        id: 14,
        unitId: 3,
        order: 4,
        title: "Accommodation",
      },
      {
        id: 15,
        unitId: 3,
        order: 5,
        title: "Sightseeing",
      },
      // Lições da Unidade 4
      {
        id: 16,
        unitId: 4,
        order: 1,
        title: "Work",
      },
      {
        id: 17,
        unitId: 4,
        order: 2,
        title: "Meetings",
      },
      {
        id: 18,
        unitId: 4,
        order: 3,
        title: "Emails",
      },
      {
        id: 19,
        unitId: 4,
        order: 4,
        title: "Presentations",
      },
      {
        id: 20,
        unitId: 4,
        order: 5,
        title: "Projects",
      },
      // Lições da Unidade 5
      {
        id: 21,
        unitId: 5,
        order: 1,
        title: "Culture",
      },
      {
        id: 22,
        unitId: 5,
        order: 2,
        title: "Traditions",
      },
      {
        id: 23,
        unitId: 5,
        order: 3,
        title: "Celebrations",
      },
      {
        id: 24,
        unitId: 5,
        order: 4,
        title: "Festivals",
      },
      {
        id: 25,
        unitId: 5,
        order: 5,
        title: "Customs",
      },
    ]);

    console.log("Inserting challenges...");
    await db.insert(schema.challenges).values([
      // Desafios para Lição 1 (Nouns) - Alternando SELECT e ASSIST
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "Café "?',
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: 'Complete: "I want a cup of ___"',
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "água"?',
      },
      {
        id: 4,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 4,
        question: 'Complete: "I need some ___"',
      },
      {
        id: 5,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "maçã"?',
      },
      // Desafios para Lição 2 (Verbs) - Alternando SELECT e ASSIST
      {
        id: 6,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 1,
        question: 'Complete: "I ___ coffee every morning"',
      },
      {
        id: 7,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "comer"?',
      },
      {
        id: 8,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 3,
        question: 'Complete: "I ___ at night"',
      },
      {
        id: 9,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "acordar"?',
      },
      {
        id: 10,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I ___ my hands"',
      },
      // Desafios para Lição 3 (Adjectives) - Alternando SELECT e ASSIST
      {
        id: 11,
        lessonId: 3, // Adjectives
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "grande"?',
      },
      {
        id: 12,
        lessonId: 3, // Adjectives
        type: "ASSIST",
        order: 2,
        question: 'Complete: "This is a ___ house"',
      },
      {
        id: 13,
        lessonId: 3, // Adjectives
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "bonito"?',
      },
      {
        id: 14,
        lessonId: 3, // Adjectives
        type: "ASSIST",
        order: 4,
        question: 'Complete: "She is very ___"',
      },
      {
        id: 15,
        lessonId: 3, // Adjectives
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "novo"?',
      },
      // Desafios para Lição 4 (Adverbs) - Alternando SELECT e ASSIST
      {
        id: 16,
        lessonId: 4, // Adverbs
        type: "ASSIST",
        order: 1,
        question: 'Complete: "He runs ___"',
      },
      {
        id: 17,
        lessonId: 4, // Adverbs
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "lentamente"?',
      },
      {
        id: 18,
        lessonId: 4, // Adverbs
        type: "ASSIST",
        order: 3,
        question: 'Complete: "She sings ___"',
      },
      {
        id: 19,
        lessonId: 4, // Adverbs
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "mal"?',
      },
      {
        id: 20,
        lessonId: 4, // Adverbs
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I am ___ tired"',
      },
      // Desafios para Lição 5 (Pronouns) - Alternando SELECT e ASSIST
      {
        id: 21,
        lessonId: 5, // Pronouns
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "eu"?',
      },
      {
        id: 22,
        lessonId: 5, // Pronouns
        type: "ASSIST",
        order: 2,
        question: 'Complete: "___ are my friend"',
      },
      {
        id: 23,
        lessonId: 5, // Pronouns
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "ele"?',
      },
      {
        id: 24,
        lessonId: 5, // Pronouns
        type: "ASSIST",
        order: 4,
        question: 'Complete: "___ is beautiful"',
      },
      {
        id: 25,
        lessonId: 5, // Pronouns
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "nós"?',
      },
      // Desafios para Lição 6 (Greetings) - Alternando SELECT e ASSIST
      {
        id: 26,
        lessonId: 6, // Greetings
        type: "ASSIST",
        order: 1,
        question: 'Complete: "___ there!"',
      },
      {
        id: 27,
        lessonId: 6, // Greetings
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "bom dia"?',
      },
      {
        id: 28,
        lessonId: 6, // Greetings
        type: "ASSIST",
        order: 3,
        question: 'Complete: "Good ___"',
      },
      {
        id: 29,
        lessonId: 6, // Greetings
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "boa noite"?',
      },
      {
        id: 30,
        lessonId: 6, // Greetings
        type: "ASSIST",
        order: 5,
        question: 'Complete: "Good ___"',
      },
      // Desafios para Lição 7 (Introductions) - Alternando SELECT e ASSIST
      {
        id: 31,
        lessonId: 7, // Introductions
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "meu nome é"?',
      },
      {
        id: 32,
        lessonId: 7, // Introductions
        type: "ASSIST",
        order: 2,
        question: 'Complete: "Nice to ___ you"',
      },
      {
        id: 33,
        lessonId: 7, // Introductions
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "de onde você é"?',
      },
      {
        id: 34,
        lessonId: 7, // Introductions
        type: "ASSIST",
        order: 4,
        question: 'Complete: "I am from ___"',
      },
      {
        id: 35,
        lessonId: 7, // Introductions
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "quantos anos você tem"?',
      },
      // Desafios para Lição 8 (Conversations) - Alternando SELECT e ASSIST
      {
        id: 36,
        lessonId: 8, // Conversations
        type: "ASSIST",
        order: 1,
        question: 'Complete: "How are ___?"',
      },
      {
        id: 37,
        lessonId: 8, // Conversations
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "estou bem"?',
      },
      {
        id: 38,
        lessonId: 8, // Conversations
        type: "ASSIST",
        order: 3,
        question: 'Complete: "And ___?"',
      },
      {
        id: 39,
        lessonId: 8, // Conversations
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "obrigado"?',
      },
      {
        id: 40,
        lessonId: 8, // Conversations
        type: "ASSIST",
        order: 5,
        question: 'Complete: "___ you"',
      },
      // Desafios para Lição 9 (Questions) - Alternando SELECT e ASSIST
      {
        id: 41,
        lessonId: 9, // Questions
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "quem"?',
      },
      {
        id: 42,
        lessonId: 9, // Questions
        type: "ASSIST",
        order: 2,
        question: 'Complete: "___ is this?"',
      },
      {
        id: 43,
        lessonId: 9, // Questions
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "quando"?',
      },
      {
        id: 44,
        lessonId: 9, // Questions
        type: "ASSIST",
        order: 4,
        question: 'Complete: "___ are you going?"',
      },
      {
        id: 45,
        lessonId: 9, // Questions
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "por que"?',
      },
      // Desafios para Lição 10 (Answers) - Alternando SELECT e ASSIST
      {
        id: 46,
        lessonId: 10, // Answers
        type: "ASSIST",
        order: 1,
        question: 'Complete: "___ I am"',
      },
      {
        id: 47,
        lessonId: 10, // Answers
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "não"?',
      },
      {
        id: 48,
        lessonId: 10, // Answers
        type: "ASSIST",
        order: 3,
        question: 'Complete: "___ I will"',
      },
      {
        id: 49,
        lessonId: 10, // Answers
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "claro"?',
      },
      {
        id: 50,
        lessonId: 10, // Answers
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I do not ___"',
      },
      // Desafios para Lição 11 (Travel) - Alternando SELECT e ASSIST
      {
        id: 51,
        lessonId: 11, // Travel
        type: "ASSIST",
        order: 1,
        question: 'Complete: "I love to ___"',
      },
      {
        id: 52,
        lessonId: 11, // Travel
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "passaporte"?',
      },
      {
        id: 53,
        lessonId: 11, // Travel
        type: "ASSIST",
        order: 3,
        question: 'Complete: "I stay at a ___"',
      },
      {
        id: 54,
        lessonId: 11, // Travel
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "aeroporto"?',
      },
      {
        id: 55,
        lessonId: 11, // Travel
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I pack my ___"',
      },
      // Desafios para Lição 12 (Transportation) - Alternando SELECT e ASSIST
      {
        id: 56,
        lessonId: 12, // Transportation
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "carro"?',
      },
      {
        id: 57,
        lessonId: 12, // Transportation
        type: "ASSIST",
        order: 2,
        question: 'Complete: "I take the ___"',
      },
      {
        id: 58,
        lessonId: 12, // Transportation
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "trem"?',
      },
      {
        id: 59,
        lessonId: 12, // Transportation
        type: "ASSIST",
        order: 4,
        question: 'Complete: "I fly by ___"',
      },
      {
        id: 60,
        lessonId: 12, // Transportation
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "barco"?',
      },
      // Desafios para Lição 13 (Directions) - Alternando SELECT e ASSIST
      {
        id: 61,
        lessonId: 13, // Directions
        type: "ASSIST",
        order: 1,
        question: 'Complete: "Turn ___"',
      },
      {
        id: 62,
        lessonId: 13, // Directions
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "esquerda"?',
      },
      {
        id: 63,
        lessonId: 13, // Directions
        type: "ASSIST",
        order: 3,
        question: 'Complete: "Go straight ___"',
      },
      {
        id: 64,
        lessonId: 13, // Directions
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "atrás"?',
      },
      {
        id: 65,
        lessonId: 13, // Directions
        type: "ASSIST",
        order: 5,
        question: 'Complete: "It is ___ away"',
      },
      // Desafios para Lição 14 (Work) - Alternando SELECT e ASSIST
      {
        id: 66,
        lessonId: 14, // Work
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "trabalho"?',
      },
      {
        id: 67,
        lessonId: 14, // Work
        type: "ASSIST",
        order: 2,
        question: 'Complete: "I work in an ___"',
      },
      {
        id: 68,
        lessonId: 14, // Work
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "colega"?',
      },
      {
        id: 69,
        lessonId: 14, // Work
        type: "ASSIST",
        order: 4,
        question: 'Complete: "My ___ is nice"',
      },
      {
        id: 70,
        lessonId: 14, // Work
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "reunião"?',
      },
      // Desafios para Lição 15 (Meetings) - Alternando SELECT e ASSIST
      {
        id: 71,
        lessonId: 15, // Meetings
        type: "ASSIST",
        order: 1,
        question: 'Complete: "I give a ___"',
      },
      {
        id: 72,
        lessonId: 15, // Meetings
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "projeto"?',
      },
      {
        id: 73,
        lessonId: 15, // Meetings
        type: "ASSIST",
        order: 3,
        question: 'Complete: "The ___ is tomorrow"',
      },
      {
        id: 74,
        lessonId: 15, // Meetings
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "relatório"?',
      },
      {
        id: 75,
        lessonId: 15, // Meetings
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I need ___"',
      },
      // Desafios para Lição 16 (Emails) - Alternando SELECT e ASSIST
      {
        id: 76,
        lessonId: 16, // Emails
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "email"?',
      },
      {
        id: 77,
        lessonId: 16, // Emails
        type: "ASSIST",
        order: 2,
        question: 'Complete: "The ___ is important"',
      },
      {
        id: 78,
        lessonId: 16, // Emails
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "anexo"?',
      },
      {
        id: 79,
        lessonId: 16, // Emails
        type: "ASSIST",
        order: 4,
        question: 'Complete: "I will ___ to your email"',
      },
      {
        id: 80,
        lessonId: 16, // Emails
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "encaminhar"?',
      },
      // Desafios para Lição 17 (Presentations) - Alternando SELECT e ASSIST
      {
        id: 81,
        lessonId: 17, // Presentations
        type: "ASSIST",
        order: 1,
        question: 'Complete: "I show a ___"',
      },
      {
        id: 82,
        lessonId: 17, // Presentations
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "auditório"?',
      },
      {
        id: 83,
        lessonId: 17, // Presentations
        type: "ASSIST",
        order: 3,
        question: 'Complete: "I use a ___"',
      },
      {
        id: 84,
        lessonId: 17, // Presentations
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "projetor"?',
      },
      {
        id: 85,
        lessonId: 17, // Presentations
        type: "ASSIST",
        order: 5,
        question: 'Complete: "The ___ listens"',
      },
      // Desafios para Lição 18 (Projects) - Alternando SELECT e ASSIST
      {
        id: 86,
        lessonId: 18, // Projects
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "equipe"?',
      },
      {
        id: 87,
        lessonId: 18, // Projects
        type: "ASSIST",
        order: 2,
        question: 'Complete: "Our ___ is clear"',
      },
      {
        id: 88,
        lessonId: 18, // Projects
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "resultado"?',
      },
      {
        id: 89,
        lessonId: 18, // Projects
        type: "ASSIST",
        order: 4,
        question: 'Complete: "Good ___ is key"',
      },
      {
        id: 90,
        lessonId: 18, // Projects
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "execução"?',
      },
      // Desafios para Lição 19 (Culture) - Alternando SELECT e ASSIST
      {
        id: 91,
        lessonId: 19, // Culture
        type: "ASSIST",
        order: 1,
        question: 'Complete: "I love the ___"',
      },
      {
        id: 92,
        lessonId: 19, // Culture
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "tradição"?',
      },
      {
        id: 93,
        lessonId: 19, // Culture
        type: "ASSIST",
        order: 3,
        question: 'Complete: "I study ___"',
      },
      {
        id: 94,
        lessonId: 19, // Culture
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "arte"?',
      },
      {
        id: 95,
        lessonId: 19, // Culture
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I listen to ___"',
      },
      // Desafios para Lição 20 (Traditions) - Alternando SELECT e ASSIST
      {
        id: 96,
        lessonId: 20, // Traditions
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "festival"?',
      },
      {
        id: 97,
        lessonId: 20, // Traditions
        type: "ASSIST",
        order: 2,
        question: 'Complete: "The ___ is beautiful"',
      },
      {
        id: 98,
        lessonId: 20, // Traditions
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "costume"?',
      },
      {
        id: 99,
        lessonId: 20, // Traditions
        type: "ASSIST",
        order: 4,
        question: 'Complete: "This is a ___"',
      },
      {
        id: 100,
        lessonId: 20, // Traditions
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "lenda"?',
      },
      // Desafios para Lição 21 (Celebrations) - Alternando SELECT e ASSIST
      {
        id: 101,
        lessonId: 21, // Celebrations
        type: "ASSIST",
        order: 1,
        question: 'Complete: "Happy ___!"',
      },
      {
        id: 102,
        lessonId: 21, // Celebrations
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "casamento"?',
      },
      {
        id: 103,
        lessonId: 21, // Celebrations
        type: "ASSIST",
        order: 3,
        question: 'Complete: "I go to a ___"',
      },
      {
        id: 104,
        lessonId: 21, // Celebrations
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "presente"?',
      },
      {
        id: 105,
        lessonId: 21, // Celebrations
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I love the ___"',
      },
      // Desafios para Lição 22 (Festivals) - Alternando SELECT e ASSIST
      {
        id: 106,
        lessonId: 22, // Festivals
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "carnaval"?',
      },
      {
        id: 107,
        lessonId: 22, // Festivals
        type: "ASSIST",
        order: 2,
        question: 'Complete: "Merry ___!"',
      },
      {
        id: 108,
        lessonId: 22, // Festivals
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "Páscoa"?',
      },
      {
        id: 109,
        lessonId: 22, // Festivals
        type: "ASSIST",
        order: 4,
        question: 'Complete: "Happy ___ Year!"',
      },
      {
        id: 110,
        lessonId: 22, // Festivals
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "feriado"?',
      },
      // Desafios para Lição 23 (Customs) - Alternando SELECT e ASSIST
      {
        id: 111,
        lessonId: 23, // Customs
        type: "ASSIST",
        order: 1,
        question: 'Complete: "This is a ___"',
      },
      {
        id: 112,
        lessonId: 23, // Customs
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "custom"?',
      },
      {
        id: 113,
        lessonId: 23, // Customs
        type: "ASSIST",
        order: 3,
        question: 'Complete: "This is a ___"',
      },
      {
        id: 114,
        lessonId: 23, // Customs
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "legend"?',
      },
      {
        id: 115,
        lessonId: 23, // Customs
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I love ___"',
      },
      // Desafios para Lição 24 (Accommodation) - Alternando SELECT e ASSIST
      {
        id: 116,
        lessonId: 24, // Accommodation
        type: "ASSIST",
        order: 1,
        question: 'Complete: "I stay at a ___"',
      },
      {
        id: 117,
        lessonId: 24, // Accommodation
        type: "SELECT",
        order: 2,
        question: 'Qual destas imagens é "quarto"?',
      },
      {
        id: 118,
        lessonId: 24, // Accommodation
        type: "ASSIST",
        order: 3,
        question: 'Complete: "I sleep in a ___"',
      },
      {
        id: 119,
        lessonId: 24, // Accommodation
        type: "SELECT",
        order: 4,
        question: 'Qual destas imagens é "banheiro"?',
      },
      {
        id: 120,
        lessonId: 24, // Accommodation
        type: "ASSIST",
        order: 5,
        question: 'Complete: "I make a ___"',
      },
      // Desafios para Lição 25 (Sightseeing) - Alternando SELECT e ASSIST
      {
        id: 121,
        lessonId: 25, // Sightseeing
        type: "SELECT",
        order: 1,
        question: 'Qual destas imagens é "museu"?',
      },
      {
        id: 122,
        lessonId: 25, // Sightseeing
        type: "ASSIST",
        order: 2,
        question: 'Complete: "I visit a ___"',
      },
      {
        id: 123,
        lessonId: 25, // Sightseeing
        type: "SELECT",
        order: 3,
        question: 'Qual destas imagens é "parque"?',
      },
      {
        id: 124,
        lessonId: 25, // Sightseeing
        type: "ASSIST",
        order: 4,
        question: 'Complete: "I see a ___"',
      },
      {
        id: 125,
        lessonId: 25, // Sightseeing
        type: "SELECT",
        order: 5,
        question: 'Qual destas imagens é "vista"?',
      },
    ]);

    // Criar as opções dos desafios
    await db.insert(schema.challengeOptions).values([
      // Opções para o desafio 1 (coffee)
      {
        id: 1,
        challengeId: 1,
        text: "coffee",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 2,
        challengeId: 1,
        text: "tea",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 3,
        challengeId: 1,
        text: "water",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para o desafio 2 (tea)
      {
        id: 4,
        challengeId: 2,
        text: "coffee",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 5,
        challengeId: 2,
        text: "tea",
        correct: true,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 6,
        challengeId: 2,
        text: "water",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para o desafio 3 (water)
      {
        id: 7,
        challengeId: 3,
        text: "coffee",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 8,
        challengeId: 3,
        text: "tea",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 9,
        challengeId: 3,
        text: "water",
        correct: true,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 2 - Desafio 4 (drink)
      {
        id: 10,
        challengeId: 4,
        text: "drink",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 11,
        challengeId: 4,
        text: "eat",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 12,
        challengeId: 4,
        text: "sleep",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 2 - Desafio 5 (eat)
      {
        id: 13,
        challengeId: 5,
        text: "drink",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 14,
        challengeId: 5,
        text: "eat",
        correct: true,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 15,
        challengeId: 5,
        text: "sleep",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 2 - Desafio 6 (sleep)
      {
        id: 16,
        challengeId: 6,
        text: "drink",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 17,
        challengeId: 6,
        text: "eat",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 18,
        challengeId: 6,
        text: "sleep",
        correct: true,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 3 - Desafio 7 (run)
      {
        id: 19,
        challengeId: 7,
        text: "run",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 20,
        challengeId: 7,
        text: "walk",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 21,
        challengeId: 7,
        text: "jump",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 3 - Desafio 8 (walk)
      {
        id: 22,
        challengeId: 8,
        text: "run",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 23,
        challengeId: 8,
        text: "walk",
        correct: true,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 24,
        challengeId: 8,
        text: "jump",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 3 - Desafio 9 (jump)
      {
        id: 25,
        challengeId: 9,
        text: "run",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 26,
        challengeId: 9,
        text: "walk",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 27,
        challengeId: 9,
        text: "jump",
        correct: true,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 4 - Desafio 10 (study)
      {
        id: 28,
        challengeId: 10,
        text: "study",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 29,
        challengeId: 10,
        text: "work",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 30,
        challengeId: 10,
        text: "play",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 4 - Desafio 11 (trabalhar)
      {
        id: 31,
        challengeId: 11,
        text: "estudar",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 32,
        challengeId: 11,
        text: "trabalhar",
        correct: true,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 33,
        challengeId: 11,
        text: "brincar",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 4 - Desafio 12 (brincar)
      {
        id: 34,
        challengeId: 12,
        text: "estudar",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 35,
        challengeId: 12,
        text: "trabalhar",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 36,
        challengeId: 12,
        text: "brincar",
        correct: true,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 5 - Desafio 13 (cantar)
      {
        id: 37,
        challengeId: 13,
        text: "cantar",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 38,
        challengeId: 13,
        text: "dançar",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 39,
        challengeId: 13,
        text: "ouvir",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 5 - Desafio 14 (dançar)
      {
        id: 40,
        challengeId: 14,
        text: "cantar",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 41,
        challengeId: 14,
        text: "dançar",
        correct: true,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 42,
        challengeId: 14,
        text: "ouvir",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções para Lição 5 - Desafio 15 (ouvir)
      {
        id: 43,
        challengeId: 15,
        text: "cantar",
        correct: false,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 44,
        challengeId: 15,
        text: "dançar",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 45,
        challengeId: 15,
        text: "ouvir",
        correct: true,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Opções básicas para os novos desafios (usando imagens existentes)
      // Desafio 16 (olá)
      {
        id: 46,
        challengeId: 16,
        text: "hello",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 47,
        challengeId: 16,
        text: "goodbye",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 48,
        challengeId: 16,
        text: "please",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 17 (bom dia)
      {
        id: 49,
        challengeId: 17,
        text: "good morning",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 50,
        challengeId: 17,
        text: "good night",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 51,
        challengeId: 17,
        text: "good afternoon",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 18 (boa noite)
      {
        id: 52,
        challengeId: 18,
        text: "good night",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 53,
        challengeId: 18,
        text: "good morning",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 54,
        challengeId: 18,
        text: "good evening",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 19 (meu nome é)
      {
        id: 55,
        challengeId: 19,
        text: "my name is",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 56,
        challengeId: 19,
        text: "your name is",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 57,
        challengeId: 19,
        text: "his name is",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 20 (prazer em conhecer)
      {
        id: 58,
        challengeId: 20,
        text: "nice to meet you",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 59,
        challengeId: 20,
        text: "see you later",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 60,
        challengeId: 20,
        text: "thank you",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 21 (de onde você é)
      {
        id: 61,
        challengeId: 21,
        text: "where are you from",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 62,
        challengeId: 21,
        text: "how are you",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 63,
        challengeId: 21,
        text: "what is your name",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 22 (como vai)
      {
        id: 64,
        challengeId: 22,
        text: "how are you",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 65,
        challengeId: 22,
        text: "where are you",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 66,
        challengeId: 22,
        text: "what are you",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 23 (estou bem)
      {
        id: 67,
        challengeId: 23,
        text: "I am fine",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 68,
        challengeId: 23,
        text: "I am tired",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 69,
        challengeId: 23,
        text: "I am hungry",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 24 (obrigado)
      {
        id: 70,
        challengeId: 24,
        text: "thank you",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 71,
        challengeId: 24,
        text: "please",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 72,
        challengeId: 24,
        text: "sorry",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 25 (passaporte)
      {
        id: 73,
        challengeId: 25,
        text: "passport",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 74,
        challengeId: 25,
        text: "ticket",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 75,
        challengeId: 25,
        text: "money",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 26 (hotel)
      {
        id: 76,
        challengeId: 26,
        text: "hotel",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 77,
        challengeId: 26,
        text: "restaurant",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 78,
        challengeId: 26,
        text: "airport",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 27 (bagagem)
      {
        id: 79,
        challengeId: 27,
        text: "luggage",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 80,
        challengeId: 27,
        text: "passport",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 81,
        challengeId: 27,
        text: "ticket",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 28 (avião)
      {
        id: 82,
        challengeId: 28,
        text: "airplane",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 83,
        challengeId: 28,
        text: "train",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 84,
        challengeId: 28,
        text: "bus",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 29 (trem)
      {
        id: 85,
        challengeId: 29,
        text: "train",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 86,
        challengeId: 29,
        text: "airplane",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 87,
        challengeId: 29,
        text: "car",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 30 (ônibus)
      {
        id: 88,
        challengeId: 30,
        text: "bus",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 89,
        challengeId: 30,
        text: "train",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 90,
        challengeId: 30,
        text: "airplane",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 31 (direita)
      {
        id: 91,
        challengeId: 31,
        text: "right",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 92,
        challengeId: 31,
        text: "left",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 93,
        challengeId: 31,
        text: "straight",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 32 (esquerda)
      {
        id: 94,
        challengeId: 32,
        text: "left",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 95,
        challengeId: 32,
        text: "right",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 96,
        challengeId: 32,
        text: "back",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 33 (em frente)
      {
        id: 97,
        challengeId: 33,
        text: "straight",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 98,
        challengeId: 33,
        text: "left",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 99,
        challengeId: 33,
        text: "right",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 34 (escritório)
      {
        id: 100,
        challengeId: 34,
        text: "office",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 101,
        challengeId: 34,
        text: "home",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 102,
        challengeId: 34,
        text: "school",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 35 (reunião)
      {
        id: 103,
        challengeId: 35,
        text: "meeting",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 104,
        challengeId: 35,
        text: "party",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 105,
        challengeId: 35,
        text: "class",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 36 (projeto)
      {
        id: 106,
        challengeId: 36,
        text: "project",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 107,
        challengeId: 36,
        text: "meeting",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 108,
        challengeId: 36,
        text: "office",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 37 (apresentação)
      {
        id: 109,
        challengeId: 37,
        text: "presentation",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 110,
        challengeId: 37,
        text: "meeting",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 111,
        challengeId: 37,
        text: "project",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 38 (agenda)
      {
        id: 112,
        challengeId: 38,
        text: "agenda",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 113,
        challengeId: 38,
        text: "meeting",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 114,
        challengeId: 38,
        text: "project",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 39 (decisão)
      {
        id: 115,
        challengeId: 39,
        text: "decision",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 116,
        challengeId: 39,
        text: "meeting",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 117,
        challengeId: 39,
        text: "project",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 40 (assunto)
      {
        id: 118,
        challengeId: 40,
        text: "subject",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 119,
        challengeId: 40,
        text: "email",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 120,
        challengeId: 40,
        text: "message",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 41 (anexo)
      {
        id: 121,
        challengeId: 41,
        text: "attachment",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 122,
        challengeId: 41,
        text: "email",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 123,
        challengeId: 41,
        text: "message",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 42 (responder)
      {
        id: 124,
        challengeId: 42,
        text: "reply",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 125,
        challengeId: 42,
        text: "send",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 126,
        challengeId: 42,
        text: "write",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 43 (tradição)
      {
        id: 127,
        challengeId: 43,
        text: "tradition",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 128,
        challengeId: 43,
        text: "culture",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 129,
        challengeId: 43,
        text: "history",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 44 (costume)
      {
        id: 130,
        challengeId: 44,
        text: "custom",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 131,
        challengeId: 44,
        text: "tradition",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 132,
        challengeId: 44,
        text: "culture",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 45 (história)
      {
        id: 133,
        challengeId: 45,
        text: "history",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 134,
        challengeId: 45,
        text: "tradition",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 135,
        challengeId: 45,
        text: "culture",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 46 (festival)
      {
        id: 136,
        challengeId: 46,
        text: "festival",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 137,
        challengeId: 46,
        text: "party",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 138,
        challengeId: 46,
        text: "celebration",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 47 (cerimônia)
      {
        id: 139,
        challengeId: 47,
        text: "ceremony",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 140,
        challengeId: 47,
        text: "festival",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 141,
        challengeId: 47,
        text: "party",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 48 (ritual)
      {
        id: 142,
        challengeId: 48,
        text: "ritual",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 143,
        challengeId: 48,
        text: "ceremony",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 144,
        challengeId: 48,
        text: "tradition",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 49 (aniversário)
      {
        id: 145,
        challengeId: 49,
        text: "birthday",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 146,
        challengeId: 49,
        text: "party",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 147,
        challengeId: 49,
        text: "celebration",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 50 (casamento)
      {
        id: 148,
        challengeId: 50,
        text: "wedding",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 149,
        challengeId: 50,
        text: "birthday",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 150,
        challengeId: 50,
        text: "party",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
      // Desafio 51 (festa)
      {
        id: 151,
        challengeId: 51,
        text: "party",
        correct: true,
        imageSrc: "/coffee.svg",
        audioSrc: "/coffee.mp3",
      },
      {
        id: 152,
        challengeId: 51,
        text: "birthday",
        correct: false,
        imageSrc: "/tea.svg",
        audioSrc: "/tea.mp3",
      },
      {
        id: 153,
        challengeId: 51,
        text: "wedding",
        correct: false,
        imageSrc: "/water.svg",
        audioSrc: "/water.mp3",
      },
    ]);

    // Restaurar dados do usuário
    console.log("Restoring user data...");

    if (userProgressBackup.length > 0) {
      console.log("Restoring user progress...");
      await db.insert(schema.userProgress).values(userProgressBackup);
      console.log(
        `Restored ${userProgressBackup.length} user progress records`
      );
    }

    if (userSubscriptionBackup.length > 0) {
      console.log("Restoring user subscriptions...");
      await db.insert(schema.userSubscription).values(userSubscriptionBackup);
      console.log(
        `Restored ${userSubscriptionBackup.length} user subscription records`
      );
    }

    if (challengeProgressBackup.length > 0) {
      console.log("Restoring challenge progress...");
      await db.insert(schema.challengeProgress).values(challengeProgressBackup);
      console.log(
        `Restored ${challengeProgressBackup.length} challenge progress records`
      );
    }

    console.log("Seeding finished");
    console.log("✅ User data preserved successfully!");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
