import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔧 Fixing challenges...");

    // 1. Buscar todos os challenges
    const challenges = await db.select().from(schema.challenges);
    console.log(`📊 Found ${challenges.length} challenges`);

    // 2. Buscar todos os challenge options
    const challengeOptions = await db.select().from(schema.challengeOptions);
    console.log(`📊 Found ${challengeOptions.length} challenge options`);

    // 3. Identificar challenges ASSIST que têm imagens
    const assistChallenges = challenges.filter((c) => c.type === "ASSIST");
    console.log(`🎯 Found ${assistChallenges.length} ASSIST challenges`);

    // 4. Encontrar challenge options com imagens para ASSIST
    const assistOptionsWithImages = challengeOptions.filter((option) => {
      const challenge = challenges.find((c) => c.id === option.challengeId);
      return challenge?.type === "ASSIST" && option.imageSrc;
    });

    console.log(
      `⚠️ Found ${assistOptionsWithImages.length} ASSIST options with images`
    );

    // 5. Remover imagens dos ASSIST
    if (assistOptionsWithImages.length > 0) {
      console.log("🗑️ Removing images from ASSIST challenges...");

      for (const option of assistOptionsWithImages) {
        await db
          .update(schema.challengeOptions)
          .set({
            imageSrc: null,
            audioSrc: null, // Também remover áudio dos ASSIST
          })
          .where(eq(schema.challengeOptions.id, option.id));
      }

      console.log("✅ Images removed from ASSIST challenges");
    }

    // 6. Verificar se SELECT challenges têm imagens
    const selectChallenges = challenges.filter((c) => c.type === "SELECT");
    console.log(`🎯 Found ${selectChallenges.length} SELECT challenges`);

    const selectOptionsWithoutImages = challengeOptions.filter((option) => {
      const challenge = challenges.find((c) => c.id === option.challengeId);
      return challenge?.type === "SELECT" && !option.imageSrc;
    });

    console.log(
      `⚠️ Found ${selectOptionsWithoutImages.length} SELECT options without images`
    );

    // 7. Verificar se as perguntas estão corretas
    console.log("\n🔍 Checking challenge questions...");

    const incorrectQuestions = challenges.filter((challenge) => {
      if (challenge.type === "SELECT") {
        // SELECT deve ter pergunta em português com palavra em português
        return (
          !challenge.question.includes('Qual destas imagens é "') ||
          !challenge.question.includes('"?')
        );
      } else if (challenge.type === "ASSIST") {
        // ASSIST deve ter pergunta em inglês
        return (
          !challenge.question.includes('Complete: "') ||
          !challenge.question.includes('"')
        );
      }
      return false;
    });

    console.log(
      `⚠️ Found ${incorrectQuestions.length} challenges with incorrect question format`
    );

    // 8. Mostrar exemplos de perguntas incorretas
    if (incorrectQuestions.length > 0) {
      console.log("\n📝 Examples of incorrect questions:");
      incorrectQuestions.slice(0, 5).forEach((challenge) => {
        console.log(
          `   Challenge ${challenge.id}: "${challenge.question}" (${challenge.type})`
        );
      });
    }

    // 9. Verificar se as respostas estão em inglês
    const nonEnglishAnswers = challengeOptions.filter((option) => {
      // Verificar se a resposta contém caracteres não-ASCII (possível português)
      const hasNonEnglish = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/.test(
        option.text
      );
      return hasNonEnglish;
    });

    console.log(
      `⚠️ Found ${nonEnglishAnswers.length} options with non-English answers`
    );

    if (nonEnglishAnswers.length > 0) {
      console.log("\n📝 Examples of non-English answers:");
      nonEnglishAnswers.slice(0, 5).forEach((option) => {
        console.log(`   Option ${option.id}: "${option.text}"`);
      });
    }

    console.log("\n🎉 Challenge analysis completed!");
    console.log("\n📋 Summary:");
    console.log(`   ✅ ASSIST challenges: ${assistChallenges.length}`);
    console.log(`   ✅ SELECT challenges: ${selectChallenges.length}`);
    console.log(
      `   ⚠️ ASSIST with images: ${assistOptionsWithImages.length} (fixed)`
    );
    console.log(
      `   ⚠️ SELECT without images: ${selectOptionsWithoutImages.length}`
    );
    console.log(`   ⚠️ Incorrect questions: ${incorrectQuestions.length}`);
    console.log(`   ⚠️ Non-English answers: ${nonEnglishAnswers.length}`);

    if (assistOptionsWithImages.length > 0) {
      console.log("\n✅ Images removed from ASSIST challenges successfully!");
    }
  } catch (error) {
    console.error("❌ Error fixing challenges:", error);
    throw new Error("Failed to fix challenges");
  }
};

main();
