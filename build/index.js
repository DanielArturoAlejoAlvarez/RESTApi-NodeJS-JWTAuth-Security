"use strict";

require("./database");

var _config = _interopRequireDefault(require("./config/config"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].listen(_config["default"].port);

console.log('Server running in port: ', _config["default"].port);