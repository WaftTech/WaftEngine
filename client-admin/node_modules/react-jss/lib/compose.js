"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Adds `composes` property to each top level rule
 * in order to have a composed class name for dynamic style sheets.
 *
 * It relies on jss-compose and jss-extend plugins.
 *
 * Example:
 * classes:  {left: 'a', button: 'b'}
 * styles:   {button: {height: () => { ... }}}
 * composed: {
 *   button: {
 *     composes: 'b',
 *     height: () => { ... }
 *   },
 *   left: {
 *     composes: 'a'
 *   }
 * }
 *
 * @param {Object} classes static classes map
 * @param {Object} styles dynamic styles object without static properties
 * @return {Object|null}
 */
exports["default"] = function (staticClasses, dynamicClasses) {
  var combinedClasses = _extends({}, staticClasses);

  for (var name in dynamicClasses) {
    combinedClasses[name] = staticClasses[name] ? staticClasses[name] + " " + dynamicClasses[name] : dynamicClasses[name];
  }

  return combinedClasses;
};