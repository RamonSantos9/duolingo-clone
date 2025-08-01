import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔧 Fixing Portuguese answers...");

    // 1. Buscar todas as opções
    const challengeOptions = await db.select().from(schema.challengeOptions);

    // 2. Encontrar opções com "dançar"
    const dançarOptions = challengeOptions.filter((option) =>
      option.text.toLowerCase().includes("dançar")
    );

    console.log(`⚠️ Found ${dançarOptions.length} options with "dançar"`);

    if (dançarOptions.length > 0) {
      console.log("🔄 Replacing 'dançar' with 'dance'...");

      for (const option of dançarOptions) {
        await db
          .update(schema.challengeOptions)
          .set({
            text: option.text.replace(/dançar/gi, "dance"),
          })
          .where(eq(schema.challengeOptions.id, option.id));
      }

      console.log("✅ Portuguese answers fixed!");
    }

    // 3. Verificar se há outras palavras em português
    const nonEnglishAnswers = challengeOptions.filter((option) => {
      const portugueseWords = [
        "café",
        "água",
        "comer",
        "grande",
        "bonito",
        "novo",
        "lentamente",
        "mal",
        "eu",
        "ele",
        "nós",
        "bom dia",
        "boa noite",
        "meu nome é",
        "de onde você é",
        "quantos anos você tem",
        "estou bem",
        "obrigado",
        "quem",
        "quando",
        "por que",
        "não",
        "claro",
        "passaporte",
        "aeroporto",
        "carro",
        "trem",
        "barco",
        "esquerda",
        "atrás",
        "trabalho",
        "colega",
        "reunião",
        "projeto",
        "relatório",
        "anexo",
        "encaminhar",
        "auditório",
        "projetor",
        "equipe",
        "resultado",
        "execução",
        "tradição",
        "arte",
        "costume",
        "lenda",
        "casamento",
        "presente",
        "carnaval",
        "Páscoa",
        "feriado",
        "quarto",
        "banheiro",
        "museu",
        "parque",
        "vista",
      ];

      return portugueseWords.some((word) =>
        option.text.toLowerCase().includes(word.toLowerCase())
      );
    });

    console.log(
      `⚠️ Found ${nonEnglishAnswers.length} options with Portuguese words`
    );

    if (nonEnglishAnswers.length > 0) {
      console.log("\n📝 Portuguese words found:");
      nonEnglishAnswers.slice(0, 10).forEach((option) => {
        console.log(`   Option ${option.id}: "${option.text}"`);
      });
    }

    console.log("\n🎉 Portuguese answer check completed!");
  } catch (error) {
    console.error("❌ Error fixing Portuguese answers:", error);
    throw new Error("Failed to fix Portuguese answers");
  }
};

main();
