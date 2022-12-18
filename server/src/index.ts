import express from "express";
import { rootRoute, authRoute, coffeeRoute } from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

dotenv.config();

const app = express();

const port = process.env.PORT as string;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "*"],
  })
);
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(
  (process.env.NODE_ENV === "production" && morgan("tiny")) || morgan("dev")
);

app.use("/", rootRoute);
app.use("/auth", authRoute);
app.use("/coffee", coffeeRoute);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
