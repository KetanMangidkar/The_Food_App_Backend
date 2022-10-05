import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    house_No: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    phone_No: {
      type: String,
      required: true,
    },
  },

  // check product once...
  orderItems: {
    cheesBurger: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },

    burgerWithFries: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },

    vegCheesBurger: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  },

  //for showing user ID in the oerder...
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  paymentMethod: {
    type: "String",
    enum: ["COD", "Online"],
    default: "COD",
  },

  paymentInfo: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },

  paidAt: {
    type: Date,
  },

  itemsPrice: {
    type: Number,
    default: 0,
  },

  taxAmount: {
    type: Number,
    default: 0,
  },

  shippingCharges: {
    type: Number,
    default: 0,
  },

  totalAmount: {
    type: Number,
    default: 0,
  },

  orderStatus: {
    type: String,
    enum: ["Preparing", "Shipped", "Delivered"],
    default: "Preparing",
  },

  deliveredAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,  
  },
});

export const Order = mongoose.model("Order", orderSchema);
