import express from "express";
import userAuthControllers from "../controllers/user-auth-controllers.js";

import passport from "passport";

const userAuthRoutes = express.Router();

userAuthRoutes.post("/signin", userAuthControllers.logInPost);

userAuthRoutes.post("/signup", userAuthControllers.signUpPost);

userAuthRoutes.post("/google-auth", userAuthControllers.googleSignInPost);

userAuthRoutes.post("/google/signup", userAuthControllers.googleSignUpPost);

userAuthRoutes.get("/verify/:id", userAuthControllers.getVerificationId);

userAuthRoutes.get("/get-auth", passport.authenticate("jwt", { session: false, failureRedirect: "/auth-failed" }), userAuthControllers.getAuth);

userAuthRoutes.get("/auth-failed", userAuthControllers.authFailed);

export default userAuthRoutes;
