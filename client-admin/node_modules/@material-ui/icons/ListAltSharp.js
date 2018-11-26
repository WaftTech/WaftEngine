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
}), _react.default.createElement("g", null, _react.default.createElement("path", {
  d: "M11 7h6v2h-6zM11 11h6v2h-6zM11 15h6v2h-6zM7 7h2v2H7zM7 11h2v2H7zM7 15h2v2H7z"
}), _react.default.createElement("path", {
  d: "M3 3v18h18V3H3zm16 16H5V5h14v14z"
}))), 'ListAltSharp');

exports.default = _default;