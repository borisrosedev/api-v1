const express = require("express");
const adminUsersRoutes = require("./admin/admin-users-routes");
const adminRoutes = express.Router();

adminRoutes.use("/users", adminUsersRoutes);

module.exports = adminRoutes;
