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
  d: "M20 3H4c-1.1 0-1.99.9-1.99 2L2 15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H4V5h16v10z"
}), _react.default.createElement("path", {
  d: "M11 6h2v2h-2zM11 9h2v2h-2zM8 6h2v2H8zM8 9h2v2H8zM5 9h2v2H5zM5 6h2v2H5zM8 12h8v2H8zM14 9h2v2h-2zM14 6h2v2h-2zM17 9h2v2h-2zM17 6h2v2h-2zM12 23l4-4H8z"
}))), 'KeyboardHideOutlined');

exports.default = _default;