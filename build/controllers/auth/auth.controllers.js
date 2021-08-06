"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _config = _interopRequireDefault(require("../../config/config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../../models/User"));

var _Role = _interopRequireDefault(require("../../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, matchPassword, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: 'User not found!'
            }));

          case 5:
            _context.next = 7;
            return _User["default"].comparePassword(req.body.password, user.password);

          case 7:
            matchPassword = _context.sent;

            if (matchPassword) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              token: null,
              msg: 'Password is invalid!'
            }));

          case 10:
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, _config["default"].secret_key, {
              expiresIn: 60 * 60
            });
            return _context.abrupt("return", res.status(200).json({
              msg: "User is loggedin!",
              token: token
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;

var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, displayName, username, email, password, avatar, roles, status, newUser, arrayRoles, role, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, displayName = _req$body.displayName, username = _req$body.username, email = _req$body.email, password = _req$body.password, avatar = _req$body.avatar, roles = _req$body.roles, status = _req$body.status;
            _context2.t0 = _User["default"];
            _context2.t1 = displayName;
            _context2.t2 = username;
            _context2.t3 = email;
            _context2.next = 8;
            return _User["default"].encryptPassword(password);

          case 8:
            _context2.t4 = _context2.sent;
            _context2.t5 = avatar;
            _context2.t6 = status;
            _context2.t7 = {
              displayName: _context2.t1,
              username: _context2.t2,
              email: _context2.t3,
              password: _context2.t4,
              avatar: _context2.t5,
              status: _context2.t6
            };
            newUser = new _context2.t0(_context2.t7);

            if (!req.body.roles) {
              _context2.next = 20;
              break;
            }

            _context2.next = 16;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 16:
            arrayRoles = _context2.sent;
            newUser.roles = arrayRoles.map(function (role) {
              return role._id;
            });
            _context2.next = 24;
            break;

          case 20:
            _context2.next = 22;
            return _Role["default"].findOne({
              name: "USER"
            });

          case 22:
            role = _context2.sent;
            newUser.roles = [role._id];

          case 24:
            console.log(newUser);
            _context2.next = 27;
            return newUser.save();

          case 27:
            user = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, _config["default"].secret_key, {
              expiresIn: 60 * 60
            });
            return _context2.abrupt("return", res.status(200).json({
              msg: "User is registered!",
              token: token,
              user: user
            }));

          case 32:
            _context2.prev = 32;
            _context2.t8 = _context2["catch"](0);
            console.log(_context2.t8);
            return _context2.abrupt("return", res.status(500).json(_context2.t8));

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 32]]);
  }));

  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.register = register;