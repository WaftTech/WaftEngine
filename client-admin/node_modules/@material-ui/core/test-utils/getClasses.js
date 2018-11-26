"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClasses;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var ns = _interopRequireWildcard(require("react-jss/lib/ns"));

var _jss = require("jss");

var _createShallow = _interopRequireDefault(require("./createShallow"));

var _withStyles = require("../styles/withStyles");

var shallow = (0, _createShallow.default)(); // Helper function to extract the classes from a styleSheet.

function getClasses(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var sheetsRegistry = new _jss.SheetsRegistry();

  _withStyles.sheetsManager.clear();

  shallow(element, (0, _extends3.default)({}, options, {
    context: (0, _extends3.default)((0, _defineProperty2.default)({}, ns.sheetsRegistry, sheetsRegistry), options.context)
  }));
  return sheetsRegistry.registry[0].classes;
}