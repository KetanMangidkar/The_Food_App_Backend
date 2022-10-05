import express from "express";
import passport from "passport";
import { logout, userProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

//create routes
const router = express.Router();

router.get(
  "/authorisedlogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google"),
  //  {
  //   scope: ["profile"],
  //   successRedirect: process.env.FRONTEND_URI,
  // })
  (req, res, next) => {
    res.send("Logged In");
  }
);

router.get("/userprofile",isAuthenticated, userProfile);

router.get("/logout", logout);

export default router;
