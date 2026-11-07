const express = require("express");
const productsCtrl = require("../controllers/products-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const { selfOnly } = require("../middlewares/authz-middleware");
const { id, report } = require("../middlewares/validation-middleware");

const productsRoutes = express.Router();

productsRoutes.post("/", authMiddleware, productsCtrl.create);
productsRoutes.get("/:id", [id, report], productsCtrl.readOneById);
productsRoutes.delete(
  "/:id",
  [id, report],
  authMiddleware,
  productsCtrl.deleteOneById,
);
productsRoutes.patch(
  "/:id",
  [id, report],
  authMiddleware,
  selfOnly,
  productsCtrl.updateOneById,
);

module.exports = productsRoutes;
