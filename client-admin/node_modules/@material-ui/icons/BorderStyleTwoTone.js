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
  d: "M19 19h2v2h-2zM19 11h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM3 21h2V5h16V3H3z"
}), _react.default.createElement("path", {
  d: "M19 7h2v2h-2zM11 19h2v2h-2zM7 19h2v2H7z"
}))), 'BorderStyleTwoTone');

exports.default = _default;