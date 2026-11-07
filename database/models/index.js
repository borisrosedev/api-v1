const Product = require("./Product");
const User = require("./User");

User.hasMany(Product, {
  as: "assets",
  foreignKey: {
    name: "owner_id",
    allowNull: false,
  },
});

Product.belongsTo(User, {
  as: "owner",
  foreignKey: {
    name: "owner_id",
    allowNull: false,
  },
});

// async function sync() {
//   await dbClient.sync({
//     force: true,
//   });
// }

// sync();

module.exports = { User, Product };
