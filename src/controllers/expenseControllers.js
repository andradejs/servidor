const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

class ExpenseController {
  async indexExpense(req, res) {
    try {
      const expenses = await Expense.find({});
      res.json(expenses);
    } catch (error) {
      res.status(401).json({
        errors: ["Erro ao acessar produtos"],
      });
    }
  }

  async showExpense(req, res) {
    try {
      const date = new Date(req.params.date);
      const startDay = new Date(date.getTime() );
      date.setHours(23, 59, 59, 999);
      const endDay = new Date(date.getTime() + (1000 * 60 * 60 * 21));

      console.log("date ", date);
      console.log("startDay ", startDay);
      console.log("endDay ", endDay);

      const expenses = await Expense.find({
        date: {
          $gte: startDay,
          $lte: endDay,
        },
      });
      // console.log(expenses);
      if (!expenses) {
        return res.status(404).json({ errors: ["Expense not found"] });
      }
      res.json(expenses);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async storeExpense(req, res) {
    try {
      const id = req.userId;

      const expense = new Expense({
        description: req.body.description,
        paymentMethod: req.body.paymentMethod,
        value: req.body.value,
        user: id,
      });

      const resultSave = await expense
        .save()
        .then((exp) => Expense.findById(exp._id).populate("user", "name"));

      const { customId, description, value, date, user, paymentMethod } =
        resultSave;

      res.status(201).json({
        customId,
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

  async updateExpense(req, res) {
    try {
      const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!expense) {
        return res.status(404).json({ errors: ["Produto inexistente"] });
      }

      res.json({ expense });
    } catch (error) {
      res.status(400).json({ errors: ["Erro ao atulalizar produto"] });
    }
  }

  async deleteExpense(req, res) {
    try {
      const expenseDeleted = await Expense.findByIdAndDelete(req.params.id, {
        new: true,
      });

      if (!expenseDeleted) {
        return res.status(404).json({ errors: ["Produto não encontrado"] });
      }

      res.json({ expenseDeleted });
    } catch (error) {
      res.status(500).json({ errors: ["Erro "] });
    }
  }
}

module.exports = new ExpenseController();
