import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// We need a direct pool connection for better-auth's adapter if we're not injecting through NestJS yet
// But since NestJS owns the DB connection, we'll try to use a shared instance if possible.
// For now, let's create a separate pool for auth or better: create a config factory.

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = () => {
    if (authInstance) return authInstance;

    authInstance = betterAuth({
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
            "http://127.0.0.1:3001",
            "https://hcs-frontend.vercel.app",
            "https://hcs-backend.vercel.app"
        ]
    });

    return authInstance;
};

// Keep specific export for type usage if needed, but runtime usage must go through getAuth()
export type Auth = ReturnType<typeof getAuth>;
