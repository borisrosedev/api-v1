const { User } = require("../../database/models");
const HttpError = require("../utils/HttpError");
const UserDto = require("../dto/UserDto");

const usersCtrl = {
  async create(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const old_user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (old_user) {
        return next(
          new HttpError(
            400,
            "La requête ne correspond pas aux exigences de l'API",
            "Requête invalide",
            "/users",
          ),
        );
      }
      const user = await User.create({ email, password });
      return res.status(201).json({
        code: 201,
        message: "user created",
        Location: `/users/${user.id}`,
      });
    } catch (err) {
      return next(err);
    }
  },
  async me(req, res, next) {
    const id = req.token.id;
    try {
      const user = await User.findByPk(id, {
        include: "assets",
        attributes: {
          exclude: "scopes",
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
      return res.status(200).json(UserDto.me(user));
    } catch (err) {
      console.error(err);

      return next(err);
    }
  },
  async update(req, res, next) {
    const id = req.token.id;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return next();
      }
      const securedData = UserDto.update(req.body);

      if (!securedData) {
        return next(
          new HttpError(
            400,
            "La requête ne correspond pas aux exigences de l'API",
            "Requête invalide",
            "/users",
          ),
        );
      }

      if (securedData.password) {
        user.password = securedData.password;
      }

      if (securedData.email) {
        user.email = securedData.email;
      }
      await user.save();
      return res.status(204).json();
    } catch (err) {
      return next(err);
    }
  },
  async delete(req, res, next) {
    const id = req.token.id;
    try {
      const user = await User.findByPk(id);
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
      await user.destroy();
      return res.status(204);
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = usersCtrl;
