const { User } = require("../../../database/models");

const adminUsersCtrl = {
  async readOneById(req, res) {
    try {
    } catch (err) {}
  },
  async readAll(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      return res.status(200).json({ code: 200, users });
    } catch (err) {}
  },
  async updateOneById(req, res) {
    try {
    } catch (err) {}
  },
  async deleteOneById(req, res) {
    try {
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminUsersCtrl;
