const HttpError = require("../utils/HttpError");
const sendProblem = (res, code, title = null, detail = null) => {
  return res
    .status(code)
    .type("application/problem+json")
    .json({ status: code, title: title, detail: detail });
};

const NotFoundErrorMiddleware = (req, res, next) =>
  next(new HttpError(404, "Route introuvable"));

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const code = err.status ?? err.statusCode ?? 500;
  const message = code < 500 && err.expose ? err.message : "Error";
  if (code >= 500) {
    console.error(err);
  }
  return sendProblem(res, code, message);
};

module.exports = { errorHandler, NotFoundErrorMiddleware };
