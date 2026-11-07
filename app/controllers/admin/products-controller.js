const { Product } = require("../../../database/models");
const ProductDto = require("../../dto/ProductDto");
const HttpError = require("../../utils/HttpError");

const adminProductsCtrl = {
  async readOneById(req, res) {
    const id = req.params.id;
    try {
      const prod = await Product.findByPk(id);
      if (!prod) {
        next(
          new HttpError(
            404,
            `Product with id ${id} cannot be found`,
            "Product not found",
            `/products/${id}`,
          ),
        );
      }
    } catch (err) {
      console.trace(err);
      next(err);
    }
  },
  async readAll(req, res) {
    try {
      const prods = await Product.findAll();
      if (!prods) {
        next(
          new HttpError(
            404,
            `Aucun produit n'a été trouvé`,
            "Produits non trouvés",
            `/products`,
          ),
        );
      }
    } catch (err) {}
  },
  async updateOneById(req, res) {
    const id = req.params.id;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return next(
          new HttpError(
            404,
            `Le produit avec l'identifiant ${id} n'a pas pu être trouvé`,
            "Produit non trouvé",
            `/products/${id}`,
          ),
        );
      }
      await Product.update({ ...ProductDto.update(req.body) });
      return res.status(204).json();
    } catch (err) {
      console.trace(err);
      next(err);
    }
  },
  async deleteOneById(req, res) {
    const id = req.params.id;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return next(
          new HttpError(
            404,
            `Le produit avec l'identifiant ${id} n'a pas pu être trouvé`,
            "Produit non trouvé",
            `/products/${id}`,
          ),
        );
      }
    } catch (err) {
      console.trace(err);
      next(err);
    }
  },
};

module.exports = adminProductsCtrl;
