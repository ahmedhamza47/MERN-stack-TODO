const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Route/authRoute");
// const { MONGO_URL, PORT } = process.env;
// const MONGO_URL = require("./key").MONGO_URL;
// const PORT = require("./key").PORT; http://localhost:5173/
const PORT = 3000;

const MONGO_URL = "mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/Test";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// const { MONGO_URL, PORT } = require("./key");
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
