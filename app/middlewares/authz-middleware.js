const { User } = require("../../database/models");
const HttpError = require("../utils/HttpError");

const authorizationMiddleware = {
  async selfOnly(req, res, next) {
    const id = req.params.id;
    const tokenId = req.token.id;
    if (!(id == tokenId)) {
      return next(
        new HttpError(
          403,
          "Vous n'avez pas les droits nécessaires pour accéder à la ressource",
          "Interdiction d'accès",
          req.url,
        ),
      );
    }
    return next();
  },

  async usersAdminOnly(req, res, next) {
    const tokenId = req.token.id;

    if (req.userScopes) {
      const scopes = new Set(req.userScopes);

      if (!(scopes.has("users:write") && scopes.has("users:read"))) {
        return next(
          new HttpError(
            403,
            "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
            "Requête interdite",
            req.url,
          ),
        );
      }
    } else {
      const user = await User.findByPk(tokenId);

      const scopes = new Set(user.scopes);

      if (!(scopes.has("users:write") && scopes.has("users:read"))) {
        return next(
          new HttpError(
            403,
            "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
            "Requête interdite",
            req.url,
          ),
        );
      }
      req.userScopes = user.scopes;
    }

    return next();
  },
  async productsAdminOnly(req, res, next) {
    const tokenId = req.token.id;

    if (req.userScopes) {
      const scopes = new Set(req.userScopes);

      if (!(scopes.has("products:read") && scopes.has("products:write"))) {
        return next(
          new HttpError(
            403,
            "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
            "Requête interdite",
            req.url,
          ),
        );
      }
    } else {
      const user = await User.findByPk(tokenId);

      const scopes = new Set(user.scopes);

      if (!(scopes.has("products:read") && scopes.has("products:write"))) {
        return next(
          new HttpError(
            403,
            "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
            "Requête interdite",
            req.url,
          ),
        );
      }
      req.userScopes = user.scopes;
    }

    return next();
  },
};

module.exports = authorizationMiddleware;
