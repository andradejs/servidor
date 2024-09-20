const express = require("express");
const multer = require("multer");
const route = express.Router();
const TokenController = require("../controllers/tokenController");


route.post("/", TokenController.store);

module.exports = route;
