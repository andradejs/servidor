const mongoose = require("mongoose");
const User = require("./userModel");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const expenseSchema = new mongoose.Schema({
  customId: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  date: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setHours(now.getHours() - 3);
      return now;
    },
  },
});

expenseSchema.plugin(AutoIncrement, { inc_field: "customId" });

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
