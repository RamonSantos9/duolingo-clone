import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const main = async () => {
  try {
    console.log("🔧 Fixing user subscription...");

    // 1. Buscar o usuário atual
    const userProgress = await db.select().from(schema.userProgress);
    
    if (userProgress.length === 0) {
      console.log("❌ No users found. Please create a user first.");
      return;
    }

    const user = userProgress[0];
    console.log(`👤 Found user: ${user.userName} (${user.userId})`);

    // 2. Verificar se já existe assinatura
    const existingSubscription = await db
      .select()
      .from(schema.userSubscription)
      .where(eq(schema.userSubscription.userId, user.userId));

    if (existingSubscription.length > 0) {
      console.log("✅ User already has a subscription:");
      console.log(`   Is Active: ${existingSubscription[0].isActive}`);
      console.log(`   Stripe Customer ID: ${existingSubscription[0].stripeCustomerId}`);
      return;
    }

    // 3. Criar cliente no Stripe
    console.log("💳 Creating Stripe customer...");
    const customer = await stripe.customers.create({
      email: `${user.userId}@example.com`,
      name: user.userName,
      metadata: {
        userId: user.userId,
      },
    });

    console.log(`✅ Created Stripe customer: ${customer.id}`);

    // 4. Criar produto e preço no Stripe
    console.log("🏷️ Creating Stripe product and price...");
    
    const product = await stripe.products.create({
      name: "Duolingo Clone Pro",
      description: "Corações Ilimitado e recursos premium",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 999, // $9.99
      currency: "usd",
      recurring: {
        interval: "month",
      },
    });

    console.log(`✅ Created product: ${product.id}`);
    console.log(`✅ Created price: ${price.id}`);

    // 5. Criar assinatura no Stripe
    console.log("📅 Creating Stripe subscription...");
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    console.log(`✅ Created subscription: ${subscription.id}`);

    // 6. Salvar no banco de dados
    console.log("💾 Saving subscription to database...");
    await db.insert(schema.userSubscription).values({
      userId: user.userId,
      stripeCustomerId: customer.id,
      stripePriceId: price.id,
      stripeSubscriptionId: subscription.id,
      stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias a partir de agora
    });

    console.log("✅ Subscription saved successfully!");

    // 7. Verificar se foi salvo
    const savedSubscription = await db
      .select()
      .from(schema.userSubscription)
      .where(eq(schema.userSubscription.userId, user.userId));

    if (savedSubscription.length > 0) {
      console.log("\n🎉 Subscription fixed successfully!");
      console.log(`✅ User: ${user.userName}`);
      console.log(`✅ Is Active: ${savedSubscription[0].isActive}`);
      console.log(`✅ Stripe Customer: ${savedSubscription[0].stripeCustomerId}`);
      console.log(`✅ Stripe Subscription: ${savedSubscription[0].stripeSubscriptionId}`);
      console.log("\n🔄 Now restart your app and the infinity symbol should appear!");
    } else {
      console.log("❌ Failed to save subscription to database");
    }

  } catch (error) {
    console.error("❌ Error fixing subscription:", error);
    throw new Error("Failed to fix subscription");
  }
};

main(); 