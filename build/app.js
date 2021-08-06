"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _initSetup = require("./libs/initSetup");

var _product = _interopRequireDefault(require("./routes/product.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _initSetup.createRoles)();
app.set('pkg', _package["default"]);
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _morgan["default"])("dev"));
app.get('/', function (req, res) {
  return res.json({
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    author: app.get('pkg').author,
    version: app.get('pkg').version,
    github: app.get('pkg').repository.url,
    msg: 'WELCOME TO MY REST API'
  });
});
app.use('/api/products', _product["default"]);
app.use('/api/users', _user["default"]);
app.use('/auth', _auth["default"]);
var _default = app;
exports["default"] = _default;