import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔧 Adding missing correct answers...");

    // 1. Buscar todos os challenges e suas opções
    const challenges = await db.select().from(schema.challenges);
    const challengeOptions = await db.select().from(schema.challengeOptions);

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

    // 3. Identificar challenges que precisam de correção
    const challengesToFix = [];

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
              // Verificar se a opção correta existe
              const correctOptionExists = options.find(opt => 
                opt.text.toLowerCase() === expectedEnglish.toLowerCase()
              );
              
              if (!correctOptionExists) {
                challengesToFix.push({
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
    }

    console.log(`⚠️ Found ${challengesToFix.length} challenges that need correct options added`);

    // 4. Adicionar as opções corretas
    if (challengesToFix.length > 0) {
      console.log("🔄 Adding correct options...");
      
      for (const item of challengesToFix) {
        const options = challengeOptions.filter(opt => opt.challengeId === item.challenge.id);
        
        // Encontrar a opção que está marcada como correta
        const currentlyCorrect = options.find(opt => opt.correct === true);
        
        if (currentlyCorrect) {
          // Primeiro, marcar a atual como incorreta
          await db
            .update(schema.challengeOptions)
            .set({ correct: false })
            .where(eq(schema.challengeOptions.id, currentlyCorrect.id));
          
          // Adicionar a nova opção correta
          const maxId = Math.max(...challengeOptions.map(opt => opt.id));
          const newOptionId = maxId + 1;
          
          await db.insert(schema.challengeOptions).values({
            id: newOptionId,
            challengeId: item.challenge.id,
            text: item.expectedEnglish,
            correct: true,
            imageSrc: "/coffee.svg", // Usar uma imagem padrão
            audioSrc: "/coffee.mp3"  // Usar um áudio padrão
          });
          
          // Atualizar a lista local para evitar IDs duplicados
          challengeOptions.push({
            id: newOptionId,
            challengeId: item.challenge.id,
            text: item.expectedEnglish,
            correct: true,
            imageSrc: "/coffee.svg",
            audioSrc: "/coffee.mp3"
          });
          
          console.log(`✅ Added correct option: "${item.expectedEnglish}" for "${item.portugueseWord}"`);
        }
      }
      
      console.log("✅ All correct options added!");
    }

    // 5. Verificação final
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
    console.error("❌ Error adding missing answers:", error);
    throw new Error("Failed to add missing answers");
  }
};

main(); 