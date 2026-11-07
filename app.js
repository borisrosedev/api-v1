const path = require("node:path");
const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const usersRoutes = require("./app/routes/users-routes");
const productsRoutes = require("./app/routes/products-routes");
const authRoutes = require("./app/routes/auth-routes");
const adminRoutes = require("./app/routes/admin-routes");

const {
  errorHandler,
  NotFoundErrorMiddleware,
} = require("./app/middlewares/errors-middleware");

dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV == "dev" ? ".env.local" : ".env.prod",
  ),
});

const app = express();
app.disable("x-powered-by");

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors({ origin: [] })); // à modifier

app.set("host", process.env.HOST);
app.set("port", process.env.PORT);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(NotFoundErrorMiddleware);
app.use(errorHandler);

module.exports = app;
