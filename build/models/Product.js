"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productSchema = new _mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  category: {
    type: String,
    "enum": ['COMPUTER', 'TABLET', 'SMARTPHONE', 'ACCESSORIES'],
    "default": 'COMPUTER'
  },
  imgURL: {
    type: String,
    maxLength: 512
  },
  status: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Product', productSchema);

exports["default"] = _default;