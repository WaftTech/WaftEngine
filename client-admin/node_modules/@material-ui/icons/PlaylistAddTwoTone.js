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
  d: "M2 14h8v2H2zM2 10h12v2H2zM2 6h12v2H2z"
}), _react.default.createElement("path", {
  d: "M18 10h-2v4h-4v2h4v4h2v-4h4v-2h-4z"
})), 'PlaylistAddTwoTone');

exports.default = _default;