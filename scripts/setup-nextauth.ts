import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔧 Setting up NextAuth.js configuration...");

    // 1. Verificar se já existem usuários
    const existingUsers = await db.select().from(schema.userProgress);
    console.log(`📊 Found ${existingUsers.length} existing users`);

    // 2. Criar usuário de teste se não existir
    if (existingUsers.length === 0) {
      console.log("👤 Creating test user...");

      const testUser = {
        userId: "nextauth_test_user_1",
        userName: "Test User",
        userImageSrc: "/lili.svg",
        activeCourseId: 1,
        hearts: 5,
        points: 0,
      };

      await db.insert(schema.userProgress).values(testUser);
      console.log("✅ Test user created successfully");
    }

    // 3. Verificar configuração do NextAuth
    console.log("🔍 Checking NextAuth configuration...");

    const requiredEnvVars = [
      "NEXTAUTH_URL",
      "NEXTAUTH_SECRET",
      "GOOGLE_CLIENT_ID",
      "GOOGLE_CLIENT_SECRET",
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      console.log("⚠️ Missing environment variables:");
      missingVars.forEach((varName) => console.log(`   - ${varName}`));
      console.log("\n📝 Please add these to your .env.local file:");
      console.log("NEXTAUTH_URL=http://localhost:3000");
      console.log("NEXTAUTH_SECRET=your-secret-key-here");
      console.log("GOOGLE_CLIENT_ID=your-google-client-id");
      console.log("GOOGLE_CLIENT_SECRET=your-google-client-secret");
    } else {
      console.log("✅ All required environment variables are set");
    }

    console.log("\n🎉 NextAuth.js setup completed!");
    console.log("📝 Next steps:");
    console.log("1. Run: npm install next-auth");
    console.log("2. Create app/api/auth/[...nextauth]/route.ts");
    console.log("3. Update your components to use NextAuth");
    console.log("4. Test authentication flow");
  } catch (error) {
    console.error("❌ Setup failed:", error);
    throw new Error("Failed to setup NextAuth.js");
  }
};

main();
