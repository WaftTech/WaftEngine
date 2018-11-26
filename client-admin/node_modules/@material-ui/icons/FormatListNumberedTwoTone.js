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
  d: "M5 13H3.2L5 10.9V10H2v1h1.8L2 13.1v.9h3zM7 5h14v2H7zM5 16H2v1h2v.5H3v1h1v.5H2v1h3zM7 17h14v2H7zM3 8h1V4H2v1h1zM7 11h14v2H7z"
}))), 'FormatListNumberedTwoTone');

exports.default = _default;