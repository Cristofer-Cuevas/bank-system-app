import express from "express";
import cors from "cors";
import passport from "passport";
import pool from "./dbConnecion/connection.js";
import userAuthRoutes from "./routes/user-auth-routes.js";
import generalRoutes from "./routes/general-routes.js";
import transporter from "./lib/emailerUtils.js";
import "./auth/auth.js";

const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(generalRoutes);
app.use(userAuthRoutes);

app.listen(PORT, () => {
  console.log("Server running", PORT);
});
