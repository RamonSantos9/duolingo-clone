import "dotenv/config";
import type { Config } from "drizzle-kit";
import { parse } from "pg-connection-string";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não está definida");
}

const connectionConfig = parse(process.env.DATABASE_URL);

// Assegurando que 'host' e 'database' não sejam nulos
if (!connectionConfig.host || !connectionConfig.database) {
  throw new Error("Host ou database ausentes na connection string");
}

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: connectionConfig.host!, // Garantido que é string
    port: connectionConfig.port ? parseInt(connectionConfig.port) : 5432,
    user: connectionConfig.user, // pode ser undefined
    password: connectionConfig.password, // pode ser undefined
    database: connectionConfig.database!, // Garantido que é string
    ssl: connectionConfig.ssl ? true : false,
  },
} satisfies Config;
