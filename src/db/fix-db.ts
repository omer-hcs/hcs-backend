import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for NeonDB/cloud PG usually
});

async function run() {
  const client = await pool.connect();
  try {
    console.log('Checking for map columns...');
    
    // Check if map_lat exists
    const check = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name='clinic_settings' AND column_name='map_lat'");
    
    if (check.rows.length === 0) {
        console.log('Adding map_lat and map_lng columns...');
        await client.query("ALTER TABLE clinic_settings ADD COLUMN map_lat varchar(50)");
        await client.query("ALTER TABLE clinic_settings ADD COLUMN map_lng varchar(50)");
        console.log('Columns added successfully.');
    } else {
        console.log('Columns already exist. No action needed.');
    }

    // Verify
    const verify = await client.query("SELECT * FROM clinic_settings LIMIT 1");
    // console.log('Current Record:', verify.rows[0]);

  } catch (err) {
    console.error('Error modifying DB:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
