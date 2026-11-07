const express = require("express");
const usersCtrl = require("../controllers/users-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const {
  email,
  password,
  report,
  ifPassword,
} = require("../middlewares/validation-middleware");

const usersRoutes = express.Router();

usersRoutes.post("/", [email, password, report], usersCtrl.create);
usersRoutes.get("/me", authMiddleware, usersCtrl.me);
usersRoutes.delete("/", authMiddleware, usersCtrl.delete);
usersRoutes.patch("/", authMiddleware, [ifPassword, report], usersCtrl.update);

module.exports = usersRoutes;
