import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔍 Checking subscription status...");

    // Buscar todos os usuários e suas assinaturas
    const userProgress = await db.select().from(schema.userProgress);
    const userSubscriptions = await db.select().from(schema.userSubscription);

    console.log(`\n📊 Found ${userProgress.length} users:`);
    userProgress.forEach((user, index) => {
      console.log(`\n👤 User ${index + 1}:`);
      console.log(`   ID: ${user.userId}`);
      console.log(`   Name: ${user.userName}`);
      console.log(`   Active Course: ${user.activeCourseId}`);
      console.log(`   Hearts: ${user.hearts}`);
      console.log(`   Points: ${user.points}`);
    });

    console.log(`\n💳 Found ${userSubscriptions.length} subscriptions:`);
    userSubscriptions.forEach((sub, index) => {
      console.log(`\n🔐 Subscription ${index + 1}:`);
      console.log(`   User ID: ${sub.userId}`);
      console.log(`   Stripe Customer ID: ${sub.stripeCustomerId}`);
      console.log(`   Stripe Price ID: ${sub.stripePriceId}`);
      console.log(`   Stripe Subscription ID: ${sub.stripeSubscriptionId}`);
      console.log(`   Is Active: ${sub.isActive}`);
      console.log(`   Current Period End: ${sub.stripeCurrentPeriodEnd}`);
    });

    // Verificar se há usuários sem assinatura
    const usersWithoutSubscription = userProgress.filter(user => 
      !userSubscriptions.some(sub => sub.userId === user.userId)
    );

    if (usersWithoutSubscription.length > 0) {
      console.log(`\n⚠️ Users without subscription (${usersWithoutSubscription.length}):`);
      usersWithoutSubscription.forEach(user => {
        console.log(`   - ${user.userName} (${user.userId})`);
      });
    }

    // Verificar se há assinaturas órfãs
    const orphanedSubscriptions = userSubscriptions.filter(sub => 
      !userProgress.some(user => user.userId === sub.userId)
    );

    if (orphanedSubscriptions.length > 0) {
      console.log(`\n⚠️ Orphaned subscriptions (${orphanedSubscriptions.length}):`);
      orphanedSubscriptions.forEach(sub => {
        console.log(`   - User ID: ${sub.userId}`);
      });
    }

    console.log("\n🎯 Recommendations:");
    
    if (userSubscriptions.length === 0) {
      console.log("❌ No subscriptions found. You need to upgrade to Pro first.");
    } else {
      const activeSubscriptions = userSubscriptions.filter(sub => sub.isActive);
      if (activeSubscriptions.length === 0) {
        console.log("❌ No active subscriptions found. Check if webhook was processed.");
        console.log("🔧 Try running: npm run stripe:listen");
      } else {
        console.log(`✅ Found ${activeSubscriptions.length} active subscription(s)`);
        console.log("🔍 Check if the user ID matches between userProgress and userSubscription");
      }
    }

  } catch (error) {
    console.error("❌ Error checking subscription status:", error);
    throw new Error("Failed to check subscription status");
  }
};

main(); 