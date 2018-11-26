"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./utils/createSvgIcon"));

var _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement("path", {
  d: "M11 20h2v-3.83l3-3V11H8v2.17l3 3z",
  opacity: ".3"
}), _react.default.createElement("path", {
  d: "M6 14l3 3v5h6v-5l3-3V9H6v5zm2-3h8v2.17l-3 3V20h-2v-3.83l-3-3V11zM11 2h2v3h-2zM4.9156 4.4638L7.036 6.586 5.6212 7.9996 3.5008 5.8774zM18.3722 8.0004L16.958 6.5862l2.1213-2.1213 1.4142 1.4142z"
})), 'HighlightTwoTone');

exports.default = _default;