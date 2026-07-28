import mysql from 'mysql2/promise';

const port = Number(process.env.DB_PORT ?? 3306);

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'pokemon-website',
  port,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;