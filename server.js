import app from "./index.js";
import { connect } from "./config/db.js";
import Razorpay from "razorpay";

connect();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET_KEY,
});

app.get("/", (req, res, next) => {
  res.send("<h1>Working<h1/>");
});

app.listen(process.env.PORT, () =>
  console.log(
    `Server running sucessfully on PORT: ${process.env.PORT}, in ${process.env.NODE_ENV} MODE`
  )
);
