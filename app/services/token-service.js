const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV == "prod" ? "../../.env.prod" : "../../.env.local",
  ),
});

const tokenService = {
  sign(user) {
    return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      issuer: process.env.TOKEN_ISSUER,
      subject: process.env.TOKEN_SUBJECT,
      expiresIn: 15 * 60 * 1000,
    });
  },
};

module.exports = tokenService;
