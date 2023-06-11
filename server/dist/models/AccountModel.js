"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var AccountSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'ContactModel'
  }]
});
var AccountModel = _mongoose["default"].model("accounts", AccountSchema);
exports.AccountModel = AccountModel;