import express from "express";
import cors from "cors";
import passport from "passport";
import pool from "./dbConnecion/connection.js";

const app = express();
// app.use(passport.initialize());

// app.use(cors);
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("hola");
  const bank = await pool.query("SELECT * FROM todo");
  console.log(bank.rows);
  res.send(`<h1>hy<h1>`);
});

app.listen(3001, () => {
  console.log("Server has started running on port 3001");
});
