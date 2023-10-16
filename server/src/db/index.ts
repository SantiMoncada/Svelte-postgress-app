import { Pool, Client } from 'pg'

export const pool = new Pool({
  user: "web_payments",
  password: "admin",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  database: "web_payments"
})

async function connectDataBase() {
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    user: 'web_payments',
    password: 'admin',
    database: 'web_payments',
    port: 5432,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('Error al conectar o consultar la base de datos:', error);
  } finally {
    await client.end();
  }
}

connectDataBase();