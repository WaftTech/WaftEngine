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
  d: "M3 15h2v2H3zM3 3h2v2H3zM3 19h2v2H3z"
}), _react.default.createElement("path", {
  d: "M11 21h2v-8h8v-2h-8V3h-2v8H3v2h8z"
}), _react.default.createElement("path", {
  d: "M7 19h2v2H7zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2zM3 7h2v2H3zM19 7h2v2h-2zM7 3h2v2H7zM15 3h2v2h-2zM19 3h2v2h-2z"
}))), 'BorderInnerTwoTone');

exports.default = _default;