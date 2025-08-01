import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔄 Starting migration from Clerk to NextAuth.js...");

    // 1. Backup dos dados atuais
    console.log("📦 Backing up current user data...");
    const userProgressBackup = await db.select().from(schema.userProgress);
    const userSubscriptionBackup = await db
      .select()
      .from(schema.userSubscription);
    const challengeProgressBackup = await db
      .select()
      .from(schema.challengeProgress);

    console.log(`📊 Found ${userProgressBackup.length} user progress records`);
    console.log(
      `💳 Found ${userSubscriptionBackup.length} subscription records`
    );
    console.log(
      `🎯 Found ${challengeProgressBackup.length} challenge progress records`
    );

    // 2. Criar novos registros com IDs do NextAuth
    console.log("🔄 Converting user IDs to NextAuth format...");

    const migratedUserProgress = userProgressBackup.map((progress) => ({
      ...progress,
      userId: progress.userId.replace("user_", "nextauth_"), // Converter formato do Clerk para NextAuth
    }));

    const migratedUserSubscription = userSubscriptionBackup.map(
      (subscription) => ({
        ...subscription,
        userId: subscription.userId.replace("user_", "nextauth_"),
      })
    );

    const migratedChallengeProgress = challengeProgressBackup.map(
      (progress) => ({
        ...progress,
        userId: progress.userId.replace("user_", "nextauth_"),
      })
    );

    // 3. Deletar dados antigos
    console.log("🗑️ Deleting old user data...");
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);
    await db.delete(schema.challengeProgress);

    // 4. Inserir dados migrados
    console.log("💾 Inserting migrated data...");

    if (migratedUserProgress.length > 0) {
      await db.insert(schema.userProgress).values(migratedUserProgress);
      console.log(
        `✅ Restored ${migratedUserProgress.length} user progress records`
      );
    }

    if (migratedUserSubscription.length > 0) {
      await db.insert(schema.userSubscription).values(migratedUserSubscription);
      console.log(
        `✅ Restored ${migratedUserSubscription.length} subscription records`
      );
    }

    if (migratedChallengeProgress.length > 0) {
      await db
        .insert(schema.challengeProgress)
        .values(migratedChallengeProgress);
      console.log(
        `✅ Restored ${migratedChallengeProgress.length} challenge progress records`
      );
    }

    console.log("🎉 Migration completed successfully!");
    console.log("📝 Next steps:");
    console.log("1. Install NextAuth.js: npm install next-auth");
    console.log("2. Configure NextAuth.js in your app");
    console.log("3. Update authentication logic in your components");
    console.log("4. Test the migration with a sample user");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw new Error("Failed to migrate from Clerk to NextAuth.js");
  }
};

main();
