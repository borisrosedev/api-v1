const { body, validationResult, param } = require("express-validator");

const validationMiddleware = {
  report: (req, res, next) => {
    const report = validationResult(req);
    if (report.isEmpty()) {
      return next();
    }
    return next(
      new HttpError(
        422,
        "Le format des données de la requête ne correspond pas aux exigences de l'API",
        "Format des données invalide",
        req.url,
      ),
    );
  },
  email: body("email").notEmpty().bail().trim().isEmail(),
  password: body("password").notEmpty().bail().trim().isStrongPassword({
    minLength: 12,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  mandatoryParams: (params) => {
    return param(...params)
      .notEmpty()
      .bail();
  },
  id: param("id").notEmpty().bail().isUUID("4"),
  ifPassword: body("password").optional().trim().isStrongPassword({
    minLength: 12,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
};

module.exports = validationMiddleware;
