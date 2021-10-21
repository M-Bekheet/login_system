const express = require("express");
const User = require("../models/user.model");
const { isAuth } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const log = console.log;

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    log(chalk.green(firstName, lastName, email, password));

    email = email.toLowerCase();

    if (!firstName || !lastName || !password || !email)
      return res.status(400).send({
        msg: "Please enter all fields.",
      });
    if (password.length < 6)
      return res.status(400).send({
        msg: "Please make sure that your password length is longer than 5 letters.",
      });

    password = await bcrypt.hash(password, 8);

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send({ msg: "User is already exist." });
    }

    const user = new User({
      firstName,
      lastName,
      password,
      email,
    });

    if (!user) throw new Error();

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 21600 },
      (err, token) => {
        if (err) throw err;
        user.save();
        res.send({
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    log(chalk.red(err));
    res.status(400).send({ msg: "User not created" });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { firstName = "", lastName = "", email = "", password = "" } = req.body;

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ msg: "User not exist." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Wrong Login Data");

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 21600 },
      (err, token) => {
        if (err) throw err;
        user.save();
        res.send({
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.log(chalk.red(err));
    res.status(400).send();
  }
});

router.get("/profile", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    res.send(user);
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  try {
    res.send();
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send();
  }
});

router.get("/auth", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    res.send(user);
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send();
  }
});

module.exports = router;
