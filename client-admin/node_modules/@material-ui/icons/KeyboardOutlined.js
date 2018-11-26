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
  d: "M0 0h24v24H0V0zm0 0h24v24H0V0z"
}), _react.default.createElement("g", null, _react.default.createElement("path", {
  d: "M20 7v10H4V7h16m0-2H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"
}), _react.default.createElement("path", {
  d: "M11 8h2v2h-2zM11 11h2v2h-2zM8 8h2v2H8zM8 11h2v2H8zM5 11h2v2H5zM5 8h2v2H5zM8 14h8v2H8zM14 11h2v2h-2zM14 8h2v2h-2zM17 11h2v2h-2zM17 8h2v2h-2z"
}))), 'KeyboardOutlined');

exports.default = _default;