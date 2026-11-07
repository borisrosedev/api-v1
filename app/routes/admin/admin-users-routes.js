const express = require("express");
const adminUsersCtrl = require("../../controllers/admin/users-controller");
const { usersAdminOnly } = require("../../middlewares/authz-middleware");
const authMiddleware = require("../../middlewares/auth-middleware");
const adminUsersRoutes = express.Router();

adminUsersRoutes.get(
  "/",
  [authMiddleware, usersAdminOnly],
  adminUsersCtrl.readAll,
);

module.exports = adminUsersRoutes;
