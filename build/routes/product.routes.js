"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Authentication = require("../middlewares/Authentication");

var _product = require("../controllers/product.controllers");

var router = (0, _express.Router)();
router.get('/', _product.getProducts);
router.get('/:idProduct', _product.getProduct);
router.post('/', _Authentication.verifyToken, _product.saveProduct);
router.put('/:idProduct', _Authentication.verifyToken, _product.updateProduct);
router["delete"]('/:idProduct', _Authentication.verifyToken, _product.deleteProduct);
var _default = router;
exports["default"] = _default;