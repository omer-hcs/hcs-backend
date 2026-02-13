import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema";

// Define the auth type based on better-auth generic return
// We can use a simplified type or ‘any’ temporarily if types are hard to infer dynamically
// For better type safety, we can try to import type only
import type { betterAuth } from "better-auth";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if (authInstance) return authInstance;

    try {
        const { betterAuth } = await import("better-auth");
        const { drizzleAdapter } = await import("better-auth/adapters/drizzle");

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
                "https://hcs-backend.vercel.app",
                "https://hcs-frontend-three.vercel.app"
            ]
        });

        return authInstance;
    } catch (error) {
        console.error("Failed to initialize better-auth:", error);
        throw error;
    }
};

// Type helper
export type Auth = Awaited<ReturnType<typeof getAuth>>;
