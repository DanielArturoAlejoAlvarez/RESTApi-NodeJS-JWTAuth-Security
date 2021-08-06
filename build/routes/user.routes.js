"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controllers");

var router = (0, _express.Router)();
router.get('/', _user.getUsers);
router.get('/:idUser', _user.getUser);
router.post('/', _user.saveUser);
router.put('/:idUser', _user.updateUser);
router["delete"]('/:idUser', _user.deleteUser);
var _default = router;
exports["default"] = _default;