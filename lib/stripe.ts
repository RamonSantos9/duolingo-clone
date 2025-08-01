import Stripe from "stripe";

// Verifica se a chave do Stripe está disponível
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Cria uma instância do Stripe apenas se a chave estiver disponível
export const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    })
  : null;

// Função helper para verificar se o Stripe está configurado
export const isStripeConfigured = () => {
  return stripe !== null && stripeSecretKey !== undefined;
};
