import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_Order_Id: {
    type: String,
    required: true,
  },
  razorpay_Payment_Id: {
    type: String,
    required: true,
  },
  razorpay_Signature_Id: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);
