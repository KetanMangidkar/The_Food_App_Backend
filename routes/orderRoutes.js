import express from "express";
import { placedOrder } from "../controllers/orderController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/placedorder", isAuthenticated, placedOrder);
export default router;
