const Sale = require("../models/saleModel");
const User = require("../models/userModel");

class SaleController {
  async indexSale(req, res) {
    try {
      const sale = await Sale.find({});
      res.json(sale);
    } catch (error) {
      res.status(401).json({
        errors: ["Erro ao acessar produtos"],
      });
    }
  }

  async showSale(req, res) {
    try {
      const date = req.params.date;
      const sale = await Sale.findOne({ date: date });
      if (!sale) {
        return res.status(404).json({ errors: ["Sale not found"] });
      }
      res.json({ sale });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async storeSale(req, res) {
    try {
      const id = req.userId;

      const sale = new Sale({
        description: req.body.description,
        paymentMethod: req.body.paymentMethod,
        value: req.body.value,
        user: id,
      });

      const resultSave = await sale
        .save()
        .then((exp) => Sale.findById(exp._id).populate("user", "name"));

      const { customIdSale, description, value, date, user, paymentMethod } =
        resultSave;

      res.status(201).json({
        customIdSale,
        description,
        value,
        date,
        name: user.name,
        paymentMethod,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async updateSale(req, res) {
    try {
      const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!sale) {
        return res.status(404).json({ errors: ["Produto inexistente"] });
      }

      res.json({ sale });
    } catch (error) {
      res.status(400).json({ errors: ["Erro ao atulalizar produto"] });
    }
  }

  async deleteSale(req, res) {
    try {
      const saleDeleted = await Sale.findByIdAndDelete(req.params.id, {
        new: true,
      });

      if (!saleDeleted) {
        return res.status(404).json({ errors: ["Produto não encontrado"] });
      }

      res.json({ saleDeleted });
    } catch (error) {
      res.status(500).json({ errors: ["Erro "] });
    }
  }
}

module.exports = new SaleController();
