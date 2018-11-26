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
  d: "M8 16h12V4H8v12zm2-10h8v2h-8V6zm0 3h8v2h-8V9zm0 3h4v2h-4v-2z",
  opacity: ".3"
}), _react.default.createElement("path", {
  d: "M4 22h14v-2H4V6H2v14c0 1.1.9 2 2 2z"
}), _react.default.createElement("path", {
  d: "M6 4v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zm14 12H8V4h12v12z"
}), _react.default.createElement("path", {
  d: "M10 9h8v2h-8zM10 12h4v2h-4zM10 6h8v2h-8z"
})), 'LibraryBooksTwoTone');

exports.default = _default;