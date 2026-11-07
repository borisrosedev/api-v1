const { Product, User } = require("../../database/models");
const ProductDto = require("../dto/ProductDto");

const productsCtrl = {
  async create(req, res, next) {
    const id = req.token.id;
    const title = req.body.title;
    const desc = req.body.desc;
    const price = req.body.price;

    try {
      const user = await User.findByPk(id);
      const prod = await user.createAsset({ title, desc, price });
      return res.status(201).json({
        code: 201,
        message: "product created",
        Location: `/products/${prod.id}`,
      });
    } catch (err) {
      return next(err);
    }
  },
  async readOneById(req, res, next) {
    const id = req.params.id;
    try {
      const prod = await Product.findByPk(id, { include: "owner" });
      if (!prod) {
        return next(new HttpError(400, "Invalid Request"));
      }

      return res.status(200).json({
        code: 200,
        product: ProductDto.read(prod),
      });
    } catch (err) {
      return next(err);
    }
  },
  async readAll(req, res, next) {
    try {
      const prods = await Product.findAll();
      if (!prods) {
        return next(
          new HttpError(
            404,
            "Aucun produit n'a été trouvé",
            "Produits non trouvés",
            req.url,
          ),
        );
      }
      return res.status(200).json({ code: 200, products: prods });
    } catch (err) {
      return next(err);
    }
  },
  async updateOneById(req, res, next) {
    const tokenId = req.token.id;

    const id = req.params.id;

    const securedData = ProductDto.update(req.body);

    try {
      const prod = await Product.findByPk(id, { include: "owner" });

      if (!prod) {
        return next(
          new HttpError(
            400,
            "La requête ne correspond pas aux exigences de l'API",
            "Requête invalide",
            req.url,
          ),
        );
      }

      await prod.update({ ...securedData });
      return res.status(204).json();
    } catch (err) {
      return next(err);
    }
  },
  async deleteOneById(req, res, next) {
    const id = req.params.id;
    try {
      const prod = await Product.findByPk(id, { include: "owner_id" });
      if (!prod) {
        return next(
          new HttpError(
            400,
            "La requête ne correspond pas aux exigences de l'API",
            "Requête invalide",
            req.url,
          ),
        );
      }

      if (!(prod.owner_id == tokenId)) {
        return next(
          new HttpError(
            403,
            "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
            "Requête interdite",
            req.url,
          ),
        );
      }

      await prod.destroy();
      return res.status(204).json();
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = productsCtrl;
