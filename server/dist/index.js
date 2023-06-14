"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = require("dotenv");
var _AccountRoute = require("./routes/AccountRoute.js");
var _ContactRoute = require("./routes/ContactRoute.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _dotenv.config)();
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use('/', _AccountRoute.accountRouter);
app.use('/contacts', _ContactRoute.contactRouter);
_mongoose["default"].connect(process.env.MONGO_URL);
var port = process.env.PORT || 3001;
app.listen(port, function () {
  return console.log("Server is running on ".concat(port));
});