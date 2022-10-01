const express = require("express");
const app = express();
const { rootRoute, authRoute, coffeeRoute } = require("./routes/routesExport");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

try {
  mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, autoIndex: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );
} catch (error) {
  console.error(error);
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use("/", rootRoute);
app.use("/auth", authRoute);
app.use("/coffee", coffeeRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
