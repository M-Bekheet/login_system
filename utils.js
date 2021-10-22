const jwt = require("jsonwebtoken");

const chalk = require("chalk");
const log = console.log;

const isAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  log(chalk.red(token));
  // Check for token
  if (!token)
    return res.status(401).send({ msg: "Authorization denied. No Token!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ msg: "Token is not valid" });
  }
};

// const isAdmin = (req, res, next) => {
//   try {
//     req.session.userID && req.session.isAdmin
//       ? next()
//       : res.status(400).send("Not Authenticated");
//   } catch (err) {
//     console.log(chalk.red(err));
//     res.send(401).send("Not Authorized!!!");
//   }
// };

module.exports = {
  isAuth,
  //   isAdmin,
};
