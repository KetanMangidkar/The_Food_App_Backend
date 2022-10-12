import express from "express";
import passport from "passport";
import {
  getAllStatistics,
  getAllUsers,
  logout,
  userProfile,
} from "../controllers/userController.js";
import {
  authorisedAdmin,
  isAuthenticated,
} from "../middlewares/authentication.js";

//create routes
const router = express.Router();

router.get(
  "/logingoogle",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URI,
  })
);

router.get("/userprofile", isAuthenticated, userProfile);
router.get("/logout", logout);

//Admin Routes
router.get("/admin/users", isAuthenticated, authorisedAdmin, getAllUsers);

router.get(
  "/admin/statistics",
  isAuthenticated,
  authorisedAdmin,
  getAllStatistics
);
export default router;
