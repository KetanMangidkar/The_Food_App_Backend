import { catchAsyncError } from "../middlewares/miderror.js";
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
