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
  d: "M12.5 8H11v6l4.75 2.85.75-1.23-4-2.37zM17.3365 1.811l4.6074 3.8436-1.2812 1.5358-4.6074-3.8436zM6.6633 1.8104l1.2812 1.5358-4.6074 3.8436L2.056 5.654z"
}), _react.default.createElement("path", {
  d: "M12 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"
}))), 'AlarmOutlined');

exports.default = _default;