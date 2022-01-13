import passport from "passport";
import fs from "fs";
import { ExtractJwt, Strategy } from "passport-jwt";

const jwtStrategy = Strategy;

const PUB_KEY = fs.readFileSync("id_rsa_pub.pem", { encoding: "utf8" }, import.meta.url);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

passport.use(
  new jwtStrategy(options, (payload, done) => {
    User.findOne({ _id: payload.sub }, (err, user) => {
      if (user) {
        done(null, user);
      } else {
        done(err, false);
      }
    });
  })
);
