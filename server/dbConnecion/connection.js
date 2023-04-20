import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    connectionString: "postgres://christopher:i6QKzqGbT51beU7R5qj94aJfgqAS7JQn@dpg-ch0aae3h4hsukp11b350-a/banksystem",
    user: "christopher",
    password: "i6QKzqGbT51beU7R5qj94aJfgqAS7JQn",
    host: "dpg-ch0aae3h4hsukp11b350-a",
    database: "banksystem",
    port: 5432,
});

export default pool;
