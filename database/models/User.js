const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const dbClient = require("../db-client");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue("password", bcrypt.hashSync(val, 10));
      },
    },
    scopes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["me:read", "me:write"],
      allowNull: false,
    },
  },
  {
    sequelize: dbClient,
    tableName: "users",
  },
);

module.exports = User;
