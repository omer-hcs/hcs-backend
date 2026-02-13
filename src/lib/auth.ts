import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// We need a direct pool connection for better-auth's adapter if we're not injecting through NestJS yet
// But since NestJS owns the DB connection, we'll try to use a shared instance if possible.
// For now, let's create a separate pool for auth or better: create a config factory.

export const auth = betterAuth({
    database: drizzleAdapter(drizzle(new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }), { schema }), {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001"
    ]
});
