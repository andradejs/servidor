const express = require("express");
const route = express.Router();
const TokenController = require("../controllers/tokenController");

route.post("/", TokenController.store);

module.exports = route;
