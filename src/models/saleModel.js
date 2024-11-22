const mongoose = require("mongoose");
const User = require("./userModel");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const saleSchema = new mongoose.Schema({
  customIdSale: {
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

saleSchema.plugin(AutoIncrement, { inc_field: "customIdSale" });

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
