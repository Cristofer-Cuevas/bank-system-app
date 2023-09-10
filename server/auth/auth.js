import passport from "passport";
import fs from "fs";
import { ExtractJwt, Strategy } from "passport-jwt";
import pool from "../dbConnecion/connection.js";

const JwtStrategy = Strategy;

// ---------- Reading public key ---------- //
const PUB_KEY = fs.readFileSync("id_rsa_pub.pem", { encoding: "utf8" }, import.meta.url);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
     pool.query("SELECT id, name, last_name, name_initials, email FROM users WHERE id = $1", [payload.sub], (err, {rows} ) => {
      if (rows[0]) {
        done(null, rows[0]);
      } else {
        done(err, false);
      }
    });
  })
);
