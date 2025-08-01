import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID é obrigatório" },
        { status: 400 }
      );
    }

    console.log("🔧 Corrigindo stripeCustomerId para usuário:", userId);

    // Buscar a assinatura existente
    const subscription = await db.query.userSubscription.findFirst({
      where: (userSubscription, { eq }) => eq(userSubscription.userId, userId),
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Assinatura não encontrada" },
        { status: 404 }
      );
    }

    console.log("📋 Assinatura encontrada:", subscription);

    // Verificar se o customer ID e price ID já são válidos no Stripe
    let customer = null;
    let price = null;

    if (
      subscription.stripeCustomerId &&
      subscription.stripeCustomerId.startsWith("cus_")
    ) {
      try {
        // Tentar buscar o cliente no Stripe para verificar se existe
        customer = await stripe.customers.retrieve(
          subscription.stripeCustomerId
        );
        console.log("✅ Customer ID válido:", customer.id);
      } catch {
        console.log("📋 Customer ID não existe no Stripe, criando novo...");
        customer = null;
      }
    }

    if (
      subscription.stripePriceId &&
      subscription.stripePriceId.startsWith("price_")
    ) {
      try {
        // Tentar buscar o preço no Stripe para verificar se existe
        price = await stripe.prices.retrieve(subscription.stripePriceId);
        console.log("✅ Price ID válido:", price.id);
      } catch {
        console.log("📋 Price ID não existe no Stripe, criando novo...");
        price = null;
      }
    }

    // Se ambos são válidos, retornar sucesso
    if (customer && price) {
      return NextResponse.json({
        message: "Customer ID e Price ID já são válidos",
        customerId: customer.id,
        priceId: price.id,
      });
    }

    // Criar cliente se não existir
    if (!customer) {
      customer = await stripe.customers.create({
        email: "ramonfishh@gmail.com", // Seu email
        name: "Ramon", // Seu nome
        metadata: {
          userId: userId,
        },
      });
      console.log("✅ Cliente criado no Stripe:", customer.id);
    }

    // Criar produto e preço se não existirem
    if (!price) {
      const product = await stripe.products.create({
        name: "Duolingo Pro",
        description: "Corações ilimitado",
      });

      console.log("✅ Produto criado no Stripe:", product.id);

      price = await stripe.prices.create({
        product: product.id,
        unit_amount: 2000, // R$ 20,00
        currency: "brl",
        recurring: {
          interval: "month",
        },
      });

      console.log("✅ Preço criado no Stripe:", price.id);
    }

    // Atualizar a assinatura com os IDs corretos
    await db
      .update(userSubscription)
      .set({
        stripeCustomerId: customer.id,
        stripePriceId: price.id,
      })
      .where(eq(userSubscription.userId, userId));

    console.log("✅ stripeCustomerId e stripePriceId atualizados");

    return NextResponse.json({
      success: true,
      message: "Customer ID e Price ID corrigidos com sucesso",
      customerId: customer.id,
      priceId: price.id,
    });
  } catch (error) {
    console.error("❌ Erro ao corrigir customer ID:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
