import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: false },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: "String", enum: ["admin", "user"], default: "user" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
