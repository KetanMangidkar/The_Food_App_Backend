import express from "express";
import {
  getAdminOrders,
  getMyOrders,
  getOrderDetails,
  placedOrder,
  processOrders,
} from "../controllers/orderController.js";
import {
  authorisedAdmin,
  isAuthenticated,
} from "../middlewares/authentication.js";

const router = express.Router();

router.post("/placedorder", placedOrder);
router.get("/myorders", isAuthenticated, getMyOrders);
router.get("/order/:id", isAuthenticated, getOrderDetails);

//Admin routes with admin middleware "authorisedAdmin"
router.get("/admin/orders", isAuthenticated, authorisedAdmin, getAdminOrders);
router.get("/admin/order/:id", isAuthenticated, authorisedAdmin, processOrders);

export default router;
