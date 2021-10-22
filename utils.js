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


module.exports = {
  isAuth,
};
