import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPasport } from "./utils/googleauthProvider.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { miderror } from "./middlewares/miderror.js";
import cors from "cors";

const app = express();
export default app;
dotenv.config({
  path: "./config/config.env",
});

//all middlewares call here (must),
app.use(
  session({
    secret: process.env.SECREATE_SESSION_KEY,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: true,
      httponly: true,
      sameSite: "none",
    },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPasport();

//Import routes
import userRoute from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoutes.js";

app.use("/api/foodapp", userRoute);
app.use("/api/foodapp", orderRoute);

//error middleware used
app.use(miderror);
