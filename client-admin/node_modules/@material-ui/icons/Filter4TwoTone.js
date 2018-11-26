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
  d: "M21 3H7v14h14V3zm-4 12h-2v-4h-4V5h2v4h2V5h2v10z",
  opacity: ".3"
}), _react.default.createElement("path", {
  d: "M3 23h16v-2H3V5H1v16c0 1.1.9 2 2 2z"
}), _react.default.createElement("path", {
  d: "M7 19h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2zM7 3h14v14H7V3z"
}), _react.default.createElement("path", {
  d: "M15 9h-2V5h-2v6h4v4h2V5h-2z"
}))), 'Filter4TwoTone');

exports.default = _default;