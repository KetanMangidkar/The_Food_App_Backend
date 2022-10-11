import { catchAsyncError, miderror } from "../middlewares/miderror.js";
import { Order } from "../models/orderModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const placedOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxAmount,
    shippingCharges,
    totalAmount,
  } = req.body;

  const user = "req.user._id";

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxAmount,
    shippingCharges,
    totalAmount,
    user,
  };

  await Order.create(orderOptions);
  res.status(201).json({
    success: true,
    message: "Order palced Successfully via Cash on Delivery",
  });
});

export const getMyOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  if (!order) {
    return next(new ErrorHandler("Invalid Order Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

export const getAdminOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name");

  res.status(200).json({
    success: true,
    orders,
  });
});

export const processOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Invalid Order Id", 404));
  }

  if (order.orderStatus === "Preparing") {
    order.orderStatus = "Shipped";
  } else if (order.orderStatus === "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  } else if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order already Delivered", 400));
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Status Updated Successfully",
  });
});
