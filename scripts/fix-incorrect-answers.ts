import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔧 Fixing incorrect answers...");

    // 1. Buscar todos os challenges e suas opções
    const challenges = await db.select().from(schema.challenges);
    const challengeOptions = await db.select().from(schema.challengeOptions);

    console.log(`📊 Found ${challenges.length} challenges`);
    console.log(`📊 Found ${challengeOptions.length} challenge options`);

    // 2. Mapear palavras em português para inglês
    const portugueseToEnglish: Record<string, string> = {
      "maçã": "apple",
      "café": "coffee",
      "água": "water",
      "chá": "tea",
      "comer": "eat",
      "beber": "drink",
      "dormir": "sleep",
      "grande": "big",
      "pequeno": "small",
      "bonito": "beautiful",
      "feio": "ugly",
      "novo": "new",
      "velho": "old",
      "lentamente": "slowly",
      "rapidamente": "quickly",
      "mal": "badly",
      "bem": "well",
      "eu": "I",
      "ele": "he",
      "ela": "she",
      "nós": "we",
      "você": "you",
      "bom dia": "good morning",
      "boa noite": "good night",
      "meu nome é": "my name is",
      "de onde você é": "where are you from",
      "quantos anos você tem": "how old are you",
      "estou bem": "I am fine",
      "obrigado": "thank you",
      "quem": "who",
      "quando": "when",
      "por que": "why",
      "não": "no",
      "sim": "yes",
      "claro": "of course",
      "passaporte": "passport",
      "aeroporto": "airport",
      "carro": "car",
      "trem": "train",
      "barco": "boat",
      "esquerda": "left",
      "direita": "right",
      "atrás": "behind",
      "trabalho": "work",
      "colega": "colleague",
      "reunião": "meeting",
      "projeto": "project",
      "relatório": "report",
      "anexo": "attachment",
      "encaminhar": "forward",
      "auditório": "auditorium",
      "projetor": "projector",
      "equipe": "team",
      "resultado": "result",
      "execução": "execution",
      "tradição": "tradition",
      "arte": "art",
      "costume": "custom",
      "lenda": "legend",
      "casamento": "wedding",
      "presente": "gift",
      "carnaval": "carnival",
      "Páscoa": "Easter",
      "feriado": "holiday",
      "quarto": "room",
      "banheiro": "bathroom",
      "museu": "museum",
      "parque": "park",
      "vista": "view"
    };

    // 3. Identificar challenges com respostas incorretas
    const incorrectChallenges = [];

    for (const challenge of challenges) {
      if (challenge.type === "SELECT") {
        // Extrair a palavra em português da pergunta
        const match = challenge.question.match(/Qual destas imagens é "([^"]+)"/);
        if (match) {
          const portugueseWord = match[1].toLowerCase();
          const expectedEnglish = portugueseToEnglish[portugueseWord];
          
          if (expectedEnglish) {
            // Buscar as opções deste challenge
            const options = challengeOptions.filter(opt => opt.challengeId === challenge.id);
            
            // Verificar se a resposta correta está errada
            const correctOption = options.find(opt => opt.correct === true);
            if (correctOption && correctOption.text.toLowerCase() !== expectedEnglish.toLowerCase()) {
              incorrectChallenges.push({
                challenge,
                portugueseWord,
                expectedEnglish,
                currentAnswer: correctOption.text,
                options
              });
            }
          }
        }
      }
    }

    console.log(`⚠️ Found ${incorrectChallenges.length} challenges with incorrect answers`);

    // 4. Mostrar exemplos de respostas incorretas
    if (incorrectChallenges.length > 0) {
      console.log("\n📝 Examples of incorrect answers:");
      incorrectChallenges.slice(0, 10).forEach(item => {
        console.log(`   Challenge ${item.challenge.id}: "${item.challenge.question}"`);
        console.log(`   Portuguese: "${item.portugueseWord}"`);
        console.log(`   Expected: "${item.expectedEnglish}"`);
        console.log(`   Current: "${item.currentAnswer}"`);
        console.log("");
      });
    }

    // 5. Corrigir as respostas incorretas
    if (incorrectChallenges.length > 0) {
      console.log("🔄 Fixing incorrect answers...");
      
      for (const item of incorrectChallenges) {
        const options = challengeOptions.filter(opt => opt.challengeId === item.challenge.id);
        
        // Encontrar a opção que deveria ser correta
        const shouldBeCorrect = options.find(opt => 
          opt.text.toLowerCase() === item.expectedEnglish.toLowerCase()
        );
        
        // Encontrar a opção que está marcada como correta
        const currentlyCorrect = options.find(opt => opt.correct === true);
        
        if (shouldBeCorrect && currentlyCorrect) {
          // Trocar as respostas
          await db
            .update(schema.challengeOptions)
            .set({ correct: false })
            .where(eq(schema.challengeOptions.id, currentlyCorrect.id));
          
          await db
            .update(schema.challengeOptions)
            .set({ correct: true })
            .where(eq(schema.challengeOptions.id, shouldBeCorrect.id));
          
          console.log(`✅ Fixed: "${item.portugueseWord}" -> "${item.expectedEnglish}"`);
        }
      }
      
      console.log("✅ All incorrect answers fixed!");
    }

    // 6. Verificação final
    console.log("\n🔍 Final verification...");
    const finalIncorrect = [];
    
    for (const challenge of challenges) {
      if (challenge.type === "SELECT") {
        const match = challenge.question.match(/Qual destas imagens é "([^"]+)"/);
        if (match) {
          const portugueseWord = match[1].toLowerCase();
          const expectedEnglish = portugueseToEnglish[portugueseWord];
          
          if (expectedEnglish) {
            const options = challengeOptions.filter(opt => opt.challengeId === challenge.id);
            const correctOption = options.find(opt => opt.correct === true);
            
            if (correctOption && correctOption.text.toLowerCase() !== expectedEnglish.toLowerCase()) {
              finalIncorrect.push({
                challenge,
                portugueseWord,
                expectedEnglish,
                currentAnswer: correctOption.text
              });
            }
          }
        }
      }
    }

    console.log(`📊 Final check: ${finalIncorrect.length} still incorrect`);

    if (finalIncorrect.length > 0) {
      console.log("\n⚠️ Still incorrect:");
      finalIncorrect.forEach(item => {
        console.log(`   "${item.portugueseWord}" -> expected "${item.expectedEnglish}", got "${item.currentAnswer}"`);
      });
    } else {
      console.log("🎉 All answers are now correct!");
    }

  } catch (error) {
    console.error("❌ Error fixing incorrect answers:", error);
    throw new Error("Failed to fix incorrect answers");
  }
};

main(); 