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
  d: "M6.5 10h-2v7h2v-7zM12.5 10h-2v7h2v-7zM21 19H2v2h19v-2zM18.5 10h-2v7h2v-7zM11.5 3.26L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"
}))), 'AccountBalanceOutlined');

exports.default = _default;