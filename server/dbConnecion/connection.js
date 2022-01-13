import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "christopher",
  password: "yalbano2",
  host: "localhost",
  database: "banksystem",
  port: 5432,
});

export default pool;
