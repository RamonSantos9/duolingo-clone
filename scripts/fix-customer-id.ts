import { stripe } from "@/lib/stripe";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

async function fixCustomerId() {
  try {
    console.log("🔧 Corrigindo stripeCustomerId...");

    // Buscar a assinatura existente
    const subscription = await db.query.userSubscription.findFirst({
      where: (userSubscription, { eq }) =>
        eq(userSubscription.userId, "user_2tYDgI1GAsM7q5LlYuNsThKjqe7"),
    });

    if (!subscription) {
      console.log("❌ Nenhuma assinatura encontrada");
      return;
    }

    console.log("📋 Assinatura encontrada:", subscription);

    // Criar um cliente real no Stripe
    const customer = await stripe.customers.create({
      email: "ramonfishh@gmail.com", // Seu email
      name: "Ramon", // Seu nome
      metadata: {
        userId: "user_2tYDgI1GAsM7q5LlYuNsThKjqe7",
      },
    });

    console.log("✅ Cliente criado no Stripe:", customer.id);

    // Atualizar a assinatura com o ID correto do cliente
    await db
      .update(userSubscription)
      .set({
        stripeCustomerId: customer.id,
      })
      .where(eq(userSubscription.userId, "user_2tYDgI1GAsM7q5LlYuNsThKjqe7"));

    console.log("✅ stripeCustomerId atualizado para:", customer.id);
  } catch (error) {
    console.error("❌ Erro ao corrigir customer ID:", error);
  }
}

fixCustomerId();
