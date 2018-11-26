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
  d: "M3 17h18V5H3v12zm5-9h11v2H8V8zm0 4h11v2H8v-2zM5 8h2v2H5V8zm0 4h2v2H5v-2z",
  opacity: ".3"
}), _react.default.createElement("path", {
  d: "M8 12h11v2H8zM8 8h11v2H8z"
}), _react.default.createElement("path", {
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), _react.default.createElement("path", {
  d: "M5 12h2v2H5zM5 8h2v2H5z"
}))), 'DvrTwoTone');

exports.default = _default;