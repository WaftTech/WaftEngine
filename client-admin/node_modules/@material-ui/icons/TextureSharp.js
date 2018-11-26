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
  d: "M19.66 3L3.07 19.59V21h1.41L21.07 4.42V3zM11.95 3l-8.88 8.88v2.83L14.78 3zM3.07 3v4l4-4zM21.07 21v-4l-4 4zM12.19 21l8.88-8.88V9.29L9.36 21z"
}))), 'TextureSharp');

exports.default = _default;