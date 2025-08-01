"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";

const returnUrl = "http://localhost:3000/shop";

export const createStripeUrl = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      throw new Error("Unauthorized");
    }

    const userSubscription = await getUserSubscription();

    if (
      userSubscription &&
      userSubscription.stripeCustomerId &&
      userSubscription.stripeCustomerId.startsWith("cus_")
    ) {
      try {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: userSubscription.stripeCustomerId,
          return_url: returnUrl,
        });

        return { data: stripeSession.url };
      } catch (stripeError) {
        // Se o portal não estiver configurado, continuar para criar checkout
      }
    }

    // Se o usuário já tem uma assinatura ativa, criar uma sessão de checkout para gerenciar
    if (userSubscription?.isActive) {
      const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: userSubscription.stripeCustomerId,
        line_items: [
          {
            price: userSubscription.stripePriceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
      });

      return { data: stripeSession.url };
    }

    // Se não tem assinatura, criar uma nova
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "brl",
            product_data: {
              name: "Duolingo Pro",
              description: "Corações ilimitado",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
        },
      ],
      metadata: {
        userId,
      },
      success_url: returnUrl,
      cancel_url: returnUrl,
    });

    return { data: stripeSession.url };
  } catch (error) {
    throw error;
  }
};
