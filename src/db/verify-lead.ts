import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { desc } from 'drizzle-orm';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const db = drizzle(pool, { schema });

async function verifyLeads() {
  console.log('Verifying leads in database...');
  try {
    const leads = await db.select().from(schema.leads).orderBy(desc(schema.leads.createdAt)).limit(5);
    console.log(`Found ${leads.length} leads.`);
    if (leads.length > 0) {
        console.log('Most recent lead:', leads[0]);
    } else {
        console.log('No leads found.');
    }
  } catch (error) {
    console.error('Error querying leads:', error);
  } finally {
    await pool.end();
  }
}

verifyLeads();
