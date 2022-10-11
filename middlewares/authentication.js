import ErrorHandler from "../utils/ErrorHandler.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];
  if (!token) {
    return next(new ErrorHandler("Not Logged In", 401));
  }
  next();
};

export const authorisedAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler("This is admin Routes, Only admin allowed", 405)
    );
  }
  next();
};
