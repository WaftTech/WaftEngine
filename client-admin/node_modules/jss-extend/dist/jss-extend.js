(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jssExtend"] = factory();
	else
		root["jssExtend"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports['default'] = jssExtend;
	
	var _warning = __webpack_require__(1);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var isObject = function isObject(obj) {
	  return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !Array.isArray(obj);
	};
	var valueNs = 'extendCurrValue' + Date.now();
	
	function mergeExtend(style, rule, sheet, newStyle) {
	  var extendType = _typeof(style.extend);
	  // Extend using a rule name.
	  if (extendType === 'string') {
	    if (!sheet) return;
	    var refRule = sheet.getRule(style.extend);
	    if (!refRule) return;
	    if (refRule === rule) {
	      (0, _warning2['default'])(false, '[JSS] A rule tries to extend itself \r\n%s', rule);
	      return;
	    }
	    var parent = refRule.options.parent;
	
	    if (parent) {
	      var originalStyle = parent.rules.raw[style.extend];
	      extend(originalStyle, rule, sheet, newStyle);
	    }
	    return;
	  }
	
	  // Extend using an array of objects.
	  if (Array.isArray(style.extend)) {
	    for (var index = 0; index < style.extend.length; index++) {
	      extend(style.extend[index], rule, sheet, newStyle);
	    }
	    return;
	  }
	
	  // Extend is a style object.
	  for (var prop in style.extend) {
	    if (prop === 'extend') {
	      extend(style.extend.extend, rule, sheet, newStyle);
	      continue;
	    }
	    if (isObject(style.extend[prop])) {
	      if (!(prop in newStyle)) newStyle[prop] = {};
	      extend(style.extend[prop], rule, sheet, newStyle[prop]);
	      continue;
	    }
	    newStyle[prop] = style.extend[prop];
	  }
	}
	
	function mergeRest(style, rule, sheet, newStyle) {
	  // Copy base style.
	  for (var prop in style) {
	    if (prop === 'extend') continue;
	    if (isObject(newStyle[prop]) && isObject(style[prop])) {
	      extend(style[prop], rule, sheet, newStyle[prop]);
	      continue;
	    }
	
	    if (isObject(style[prop])) {
	      newStyle[prop] = extend(style[prop], rule, sheet);
	      continue;
	    }
	
	    newStyle[prop] = style[prop];
	  }
	}
	
	/**
	 * Recursively extend styles.
	 */
	function extend(style, rule, sheet) {
	  var newStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	  mergeExtend(style, rule, sheet, newStyle);
	  mergeRest(style, rule, sheet, newStyle);
	  return newStyle;
	}
	
	/**
	 * Handle `extend` property.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssExtend() {
	  function onProcessStyle(style, rule, sheet) {
	    if ('extend' in style) return extend(style, rule, sheet);
	    return style;
	  }
	
	  function onChangeValue(value, prop, rule) {
	    if (prop !== 'extend') return value;
	
	    // Value is empty, remove properties set previously.
	    if (value == null || value === false) {
	      for (var key in rule[valueNs]) {
	        rule.prop(key, null);
	      }
	      rule[valueNs] = null;
	      return null;
	    }
	
	    for (var _key in value) {
	      rule.prop(_key, value[_key]);
	    }
	    rule[valueNs] = value;
	
	    // Make sure we don't set the value in the core.
	    return null;
	  }
	
	  return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (true) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ })
/******/ ])
});
;
//# sourceMappingURL=jss-extend.js.map