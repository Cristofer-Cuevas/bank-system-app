import express from "express";
import generalControllers from "../controllers/general-controllers.js";
import passport from "passport";

const generalRoutes = express.Router();

generalRoutes.get("/users", passport.authenticate("jwt", { session: false, failureRedirect: "/auth-failed" }), generalControllers.getUsers);

generalRoutes.post("/transfer", passport.authenticate("jwt", { session: false, failureRedirect: "/auth-failed" }), generalControllers.transferPost);

export default generalRoutes;
