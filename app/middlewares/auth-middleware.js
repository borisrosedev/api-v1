const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies) {
    return next(
      new HttpError(
        401,
        "Votre authentification a échouée",
        "Echec de l'authentification",
        req.url,
      ),
    );
  }
  const token = cookies["token"];
  if (!token) {
    return next(
      new HttpError(
        401,
        "Votre authentification a échouée",
        "Echec de l'authentification",
        req.url,
      ),
    );
  }

  try {
    verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET, {
      issuer: process.TOKEN_ISSUER,
      subject: process.TOKEN_SUBJECT,
    });

    req.token = Object.create({ id: "" });
    req.token.id = verifiedToken.id;

    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
