const express = require("express");
const User = require("../models/user.model");
const { isAuth } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const log = console.log;

const router = express.Router();


// @route   POST api/users/regiser
// @desc    Create new user
// @access  Public
router.post("/register", async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    log(chalk.green(firstName, lastName, email, password));

    email = email.toLowerCase();

    if (!firstName || !lastName || !password || !email)
      return res.status(400).send("Please enter all fields.");
    if (password.length < 6)
      return res.status(400).send("Please make sure that your password length is longer than 5 letters.");

    password = await bcrypt.hash(password, 8);

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send("User is already exist.");
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
    res.status(400).send("User not created");
  }
});


// @route   POST api/users/login
// @desc    Sign in user and send their token
// @access  Publlic
router.post("/login", async (req, res) => {
  try {
    let { email = "", password = "" } = req.body;

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("User not exist.");

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
            city: user.city,
            phone: user.phone,
            country: user.country,
            gender: user.gender,
          }
        });
      }
    );
  } catch (err) {
    console.log(chalk.red(err));
    res.status(400).send();
  }
});


// @route    GET api/users/profile
// @desc     Read user data for profile
// @access  Private
router.get("/profile", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    res.send(user);
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send();
  }
});


// @route    PATCH api/users
// @desc     Update user info
// @access  Private
router.patch("/", isAuth, async (req, res, next) => {
  try {
    let update = ({
      firstName,
      lastName,
      email,
      city,
      password,
      phone,
      gender,
      state,
      country,
    } = req.body);

    console.log('updating: ')
    console.log(update)
    // log(chalk.green(update));

    email = email.toLowerCase();

    if (
      !firstName ||
      !lastName ||
      !password ||
      !city ||
      !phone ||
      !gender ||
      !city ||
      !country
    )
      return res.status(400).send("Please enter all fields.");

    if (password.length < 6)
      return res.status(400).send("Please make sure that your password length is longer than 5 letters.");

    update.password = await bcrypt.hash(password, 8);

    const user = await User.findOneAndUpdate({ email }, update);
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
            country: user.country,
            city: user.city,
            phone: user.phone,
          },
        });
      }
    );
  } catch (err) {
    log(err);
    res.status(400).send("User not updated");
  }
});


// @route    GET api/users
// @desc     Logout User
// @access  Public
router.get("/logout", (req, res) => {
  try {
    res.send();
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send();
  }
});


// @route    GET api/users/auth
// @desc     Check user auth and send their info
// @access  Private
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
