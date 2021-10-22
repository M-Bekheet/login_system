const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
const chalk = require("chalk");
const userRouter = require("./routers/user.router");

/**
 * Config:
 **/

// Environment Variables
dotenv.config();
const { PORT = 5000, DB_URL, NODE_ENV = "development" } = process.env;

// Basic Middlwares
const app = express();
app.use(logger("dev"));  // print requests logs
app.use(express.json()); // makes req.body object available
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

//session mdlw should be before routes mdlws
app.set("trust proxy", 1); // trust first proxy

// Routers
app.use("/api/users", userRouter);

// DB
mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
});
