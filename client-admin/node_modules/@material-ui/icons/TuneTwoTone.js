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
  d: "M3 5h10v2H3zM7 11H3v2h4v2h2V9H7zM13 15h-2v6h2v-2h8v-2h-8zM3 17h6v2H3zM11 11h10v2H11zM17 3h-2v6h2V7h4V5h-4z"
}))), 'TuneTwoTone');

exports.default = _default;