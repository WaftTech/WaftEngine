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
  d: "M7 3h2v2H7zM7 11h2v2H7zM7 19h2v2H7zM3 19h2v2H3zM3 3h2v2H3zM3 11h2v2H3zM19 3h2v2h-2zM3 7h2v2H3zM11 3h2v18h-2zM3 15h2v2H3zM15 11h2v2h-2zM19 15h2v2h-2zM19 11h2v2h-2zM19 7h2v2h-2zM19 19h2v2h-2zM15 19h2v2h-2zM15 3h2v2h-2z"
}))), 'BorderVerticalTwoTone');

exports.default = _default;