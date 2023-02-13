import { connect } from "./db/client";
import {
  rootRoute,
  authRoute,
  coffeeRoute,
  userRoute,
  usersRoute,
} from "./routes";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

const port = process.env.SERVER_PORT as string;

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(process.env.NODE_ENV === "production" ? morgan("tiny") : morgan("dev"));

app.use("/", rootRoute);
app.use("/auth", authRoute);
app.use("/coffee", coffeeRoute);
app.use("/user", userRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
  console.log("Server is running on port " + port);
  void connect();
});
