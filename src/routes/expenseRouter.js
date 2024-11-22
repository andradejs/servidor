const express = require("express");
const route = express.Router();
const ExpenseController = require("../controllers/expenseControllers");

const loginRequired = require("../middlewares/loginRequired");
route.get("/", loginRequired, ExpenseController.indexExpense);
route.get("/:date",loginRequired, ExpenseController.showExpense);
route.delete("/:id", loginRequired, ExpenseController.deleteExpense);
route.put("/:id", loginRequired, ExpenseController.updateExpense);
route.post("/", loginRequired, ExpenseController.storeExpense);

module.exports = route;
