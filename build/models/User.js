"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose.Schema({
  displayName: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    maxLength: 512
  },
  roles: [{
    ref: "Role",
    type: _mongoose.Schema.Types.ObjectId
  }],
  status: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = function (password) {
  return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
};

userSchema.statics.comparePassword = function (password, receivePassword) {
  return _bcryptjs["default"].compare(password, receivePassword);
};

var _default = (0, _mongoose.model)("User", userSchema);

exports["default"] = _default;