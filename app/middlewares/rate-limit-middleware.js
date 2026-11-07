const { rateLimit } = require("express-rate-limit");

const rateLimitMiddleware = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs ?? 10 * 60 * 1000,
    limit: options.limit ?? 2,
    legacyHeaders: options.legacyHeaders ?? false,
    standardHeaders: options.standardHeaders ?? "draft-6",
    ipv6Subnet: 60,
    message:
      options.message ??
      "Vous avez effectué trop de requêtes. Veuillez réessayer plus tard.",
    handler: (req, res, next, limiterOptions) => {
      return res
        .status(limiterOptions.statusCode)
        .type("application/problem+json")
        .json({
          title: "Trop de requêtes",
          status: limiterOptions.statusCode,
          detail: limiterOptions.message,
        });
    },
  });
};

module.exports = rateLimitMiddleware;
