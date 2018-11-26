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
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm0 16H5V5h14v14z"
}), _react.default.createElement("path", {
  d: "M9.5 15H11v-1.49h1V12h-1V9H9.5v3H8V9H6.5v4.5h3zM18.2 15l-2-3 2-3h-1.7l-2 3 2 3zM14.5 12V9H13v6h1.5z"
})), 'FourKOutlined');

exports.default = _default;