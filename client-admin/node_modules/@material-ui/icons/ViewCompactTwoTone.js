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
  d: "M11 13h9v4h-9zM5 13h4v4H5zM5 7h15v4H5z",
  opacity: ".3"
}), _react.default.createElement("path", {
  d: "M3 5v14h19V5H3zm6 12H5v-4h4v4zm11 0h-9v-4h9v4zm0-6H5V7h15v4z"
}))), 'ViewCompactTwoTone');

exports.default = _default;