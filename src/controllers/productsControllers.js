const Product = require("../models/productModel");
const bcrypt = require("bcrypt");


class ProductController {
  async indexProduct(req, res) {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(401).json({
        errors: ["Erro ao acessar produtos"],
      });
    }
  }

  async showProduct(req, res) {
    try {
      const name = req.params.id;
      const product = await Product.findOne({ name: name });
      if (!product) {
        return res.status(404).json({ errors: ["Product not found"] });
      }
      res.json({ product });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async storeProduct(req, res) {
    try {

      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        allergens: req.body.allergens,
        price: req.body.price,
        portion: req.body.portion,
        url_image: req.file.filename,
      });

      await product.save();
      res.status(201).json({ product });
    } catch (error) {
      res.status(400).json({ errors: ["erro ao criar produto"] });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!product) {
        return res.status(404).json({ errors: ["Produto inexistente"] });
      }

      res.json({ product });
    } catch (error) {
      res.status(400).json({ errors: ["Erro ao atulalizar produto"] });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productDeleted = await Product.findByIdAndDelete(req.params.id, {
        new: true,
      });

      if (!productDeleted) {
        return res.status(404).json({ errors: ["Produto não encontrado"] });
      }

      res.json({ productDeleted });
    } catch (error) {
      res.status(500).json({ errors: ["Erro "] });
    }
  }
}

module.exports = new ProductController();
