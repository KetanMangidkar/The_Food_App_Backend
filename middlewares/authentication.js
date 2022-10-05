export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];
  if (!token) {
    return next(new Error("Not Logged In"));
  }
  next();
};
