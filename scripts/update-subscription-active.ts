import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🔧 Updating subscription to active...");

    // Buscar a assinatura existente
    const subscriptions = await db.select().from(schema.userSubscription);

    if (subscriptions.length === 0) {
      console.log("❌ No subscriptions found. Run db:fix-subscription first.");
      return;
    }

    const subscription = subscriptions[0];
    console.log(`👤 Found subscription for user: ${subscription.userId}`);

    // Atualizar para ativa
    await db
      .update(schema.userSubscription)
      .set({ isActive: true })
      .where(eq(schema.userSubscription.id, subscription.id));

    console.log("✅ Subscription updated to active!");

    // Verificar se foi atualizada
    const updatedSubscription = await db
      .select()
      .from(schema.userSubscription)
      .where(eq(schema.userSubscription.id, subscription.id));

    if (updatedSubscription.length > 0) {
      console.log("\n🎉 Subscription is now active!");
      console.log(`✅ User: ${updatedSubscription[0].userId}`);
      console.log(`✅ Is Active: ${updatedSubscription[0].isActive}`);
      console.log(
        `✅ Stripe Customer: ${updatedSubscription[0].stripeCustomerId}`
      );
      console.log(
        `✅ Stripe Subscription: ${updatedSubscription[0].stripeSubscriptionId}`
      );
      console.log(
        "\n🔄 Now restart your app and the infinity symbol should appear!"
      );
    }
  } catch (error) {
    console.error("❌ Error updating subscription:", error);
    throw new Error("Failed to update subscription");
  }
};

main();
