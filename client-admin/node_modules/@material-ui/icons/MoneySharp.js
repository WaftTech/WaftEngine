"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./utils/createSvgIcon"));

var _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}), _react.default.createElement("path", {
  d: "M14 16h5V8h-5v8zm2-6h1v4h-1v-4zM8 16h5V8H8v8zm2-6h1v4h-1v-4zM5 8h2v8H5z"
}), _react.default.createElement("path", {
  d: "M2 4v16h20V4H2zm18 14H4V6h16v12z"
})), 'MoneySharp');

exports.default = _default;