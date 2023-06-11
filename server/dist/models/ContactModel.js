"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ContactSchema = new _mongoose["default"].Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  title: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  fax: {
    type: String
  },
  company: {
    type: String
  },
  address: {
    type: String
  },
  birthday: {
    type: String
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "accounts",
    required: true
  }
});
var ContactModel = _mongoose["default"].model("contacts", ContactSchema);
exports.ContactModel = ContactModel;