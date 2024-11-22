const express = require("express");
const route = express.Router();
const UserController = require("../controllers/userControllers");
const loginRequired = require("../middlewares/loginRequired");

route.get('/', UserController.getUser)
route.post("/", UserController.storeUser);
route.delete("/:id", loginRequired, UserController.deleteUser);
route.put("/:id", loginRequired, UserController.updateUser);

module.exports = route;
