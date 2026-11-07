const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../database/models");
const HttpError = require("../utils/HttpError");
const tokenService = require("../services/token-service");
const cookieService = require("../services/cookie-service");

const authCtrl = {
  async login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return next(
          new HttpError(
            400,
            "La requête ne correspond pas aux exigences de l'API",
            "Requête invalide",
            "/users",
          ),
        );
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return next(
          new HttpError(
            400,
            "La requête ne correspond pas aux exigences de l'API",
            "Requête invalide",
            "/users",
          ),
        );
      }

      const token = tokenService.sign(user);

      res.cookie(
        "token",
        token,
        cookieService.params(process.env.NODE_ENV ?? "prod"),
      );

      res.status(200).json({ code: 200, message: "utilisateur connecté" });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = authCtrl;
