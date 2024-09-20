const express = require("express");
const multer = require("multer");
const route = express.Router();
const ProductController = require("../controllers/productsControllers");
const multerConfig = require("../config/multerConfig");

const loginRequired = require("../middlewares/loginRequired");
const upload = multer(multerConfig);

route.get("/", ProductController.indexProduct);
route.get("/:id", ProductController.showProduct);
route.post("/", upload.single("image"), ProductController.storeProduct);
route.delete("/:id", loginRequired, ProductController.deleteProduct);
route.put("/:id", loginRequired, ProductController.updateProduct);

module.exports = route;
