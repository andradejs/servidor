const express = require("express");
const route = express.Router();
const SaleController = require("../controllers/saleControllers");

const loginRequired = require("../middlewares/loginRequired");
route.get("/", loginRequired, SaleController.indexSale);
route.get("/:date",loginRequired, SaleController.showSale);
route.delete("/:id", loginRequired, SaleController.deleteSale);
route.put("/:id", loginRequired, SaleController.updateSale);
route.post("/", loginRequired, SaleController.storeSale);

module.exports = route;
