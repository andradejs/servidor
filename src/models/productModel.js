const moongose = require("mongoose");
const bcrypt = require("bcrypt");

const productSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  allergens: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  portion: {
    type: String,
  },
  url_image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = moongose.model("Product", productSchema);

module.exports = Product;
