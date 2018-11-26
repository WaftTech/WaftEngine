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
  d: "M19 7h2v2h-2zM19 21c1.1 0 2-.9 2-2h-2v2zM19 15h2v2h-2zM19 11h2v2h-2zM9 5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4v-2H5V5h4zM19 3v2h2c0-1.1-.9-2-2-2zM11 1h2v22h-2zM15 3h2v2h-2zM15 19h2v2h-2z"
}))), 'FlipTwoTone');

exports.default = _default;