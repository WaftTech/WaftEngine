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
  d: "M11 11h2v2h-2zM11 7h2v2h-2z"
}), _react.default.createElement("path", {
  d: "M21 3H3v18h18V3zm-2 16H5V5h14v14z"
}), _react.default.createElement("path", {
  d: "M15 11h2v2h-2zM7 11h2v2H7zM11 15h2v2h-2z"
}))), 'BorderOuterTwoTone');

exports.default = _default;