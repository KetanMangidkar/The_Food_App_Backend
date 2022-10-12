import { catchAsyncError } from "../middlewares/miderror.js";
import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";

export const userProfile = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    } else {
      res.clearCookie("connect.sid"); //default name of the cookie
      res.status(200).json({
        message: "Logged Out",
      });
    }
  });
};

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
});

//for admin dashboard
export const getAllStatistics = catchAsyncError(async (req, res, next) => {
  const totalUsers = await User.countDocuments();

  const orders = await Order.find({});

  const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
  const shippingOrders = orders.filter((i) => i.orderStatus === "Shipped");
  const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");

  let totalIncome = 0;
  orders.forEach((i) => {
    totalIncome += i.totalAmount;
  });

  res.status(200).json({
    success: true,
    totalUsers,
    totalOrders: {
      total: orders.length,
      preparing: preparingOrders.length,
      shipped: shippingOrders.length,
      delivered: deliveredOrders.length,
    },
    totalIncome,
  });
});
