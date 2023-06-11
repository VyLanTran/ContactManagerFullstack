"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _AccountRoute = require("./routes/AccountRoute.js");
var _ContactRoute = require("./routes/ContactRoute.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use('/', _AccountRoute.accountRouter);
app.use('/contacts', _ContactRoute.contactRouter);
_mongoose["default"].connect("mongodb+srv://tranlanvy1203:contactPassword@contactsdb.yv6dsiw.mongodb.net/contactsDB?retryWrites=true&w=majority");
app.listen(3001, function () {
  return console.log('Server runs successfully');
});