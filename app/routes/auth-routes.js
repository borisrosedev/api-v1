const express = require("express");
const authCtrl = require("../controllers/auth-controller");
const authRoutes = express.Router();
const {
  email,
  password,
  report,
  ifPassword,
} = require("../middlewares/validation-middleware");
const rateLimitMiddleware = require("../middlewares/rate-limit-middleware");

authRoutes.post(
  "/",
  rateLimitMiddleware({ limit: 3, windowMs: 15 * 60 * 1000 }),
  [email, password, report],
  authCtrl.login,
);

module.exports = authRoutes;
