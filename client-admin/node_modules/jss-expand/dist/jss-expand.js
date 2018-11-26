(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jssExpand"] = factory();
	else
		root["jssExpand"] = factory();
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
	
	exports.default = jssExpand;
	
	var _props = __webpack_require__(1);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/**
	 * Map values by given prop.
	 *
	 * @param {Array} array of values
	 * @param {String} original property
	 * @param {String} original rule
	 * @return {String} mapped values
	 */
	function mapValuesByProp(value, prop, rule) {
	  return value.map(function (item) {
	    return objectToArray(item, prop, rule, false, true);
	  });
	}
	
	/**
	 * Convert array to nested array, if needed
	 *
	 * @param {Array} array of values
	 * @param {String} original property
	 * @param {Object} sheme, for converting arrays in strings
	 * @param {Object} original rule
	 * @return {String} converted string
	 */
	function processArray(value, prop, scheme, rule) {
	  if (scheme[prop] == null) return value;
	  if (value.length === 0) return [];
	  if (Array.isArray(value[0])) return processArray(value[0], prop, scheme);
	  if (_typeof(value[0]) === 'object') {
	    return mapValuesByProp(value, prop, rule);
	  }
	
	  return [value];
	}
	
	/**
	 * Convert object to array.
	 *
	 * @param {Object} object of values
	 * @param {String} original property
	 * @param {Object} original rule
	 * @param {Boolean} is fallback prop
	 * @param {Boolean} object is inside array
	 * @return {String} converted string
	 */
	function objectToArray(value, prop, rule, isFallback, isInArray) {
	  if (!(_props.propObj[prop] || _props.customPropObj[prop])) return [];
	
	  var result = [];
	
	  // Check if exists any non-standart property
	  if (_props.customPropObj[prop]) {
	    value = customPropsToStyle(value, rule, _props.customPropObj[prop], isFallback);
	  }
	
	  // Pass throught all standart props
	  if (Object.keys(value).length) {
	    for (var baseProp in _props.propObj[prop]) {
	      if (value[baseProp]) {
	        if (Array.isArray(value[baseProp])) {
	          result.push(_props.propArrayInObj[baseProp] === null ? value[baseProp] : value[baseProp].join(' '));
	        } else result.push(value[baseProp]);
	        continue;
	      }
	
	      // Add default value from props config.
	      if (_props.propObj[prop][baseProp] != null) {
	        result.push(_props.propObj[prop][baseProp]);
	      }
	    }
	  }
	
	  if (!result.length || isInArray) return result;
	  return [result];
	}
	
	/**
	 * Convert custom properties values to styles adding them to rule directly
	 *
	 * @param {Object} object of values
	 * @param {Object} original rule
	 * @param {String} property, that contain partial custom properties
	 * @param {Boolean} is fallback prop
	 * @return {Object} value without custom properties, that was already added to rule
	 */
	function customPropsToStyle(value, rule, customProps, isFallback) {
	  for (var prop in customProps) {
	    var propName = customProps[prop];
	
	    // If current property doesn't exist already in rule - add new one
	    if (typeof value[prop] !== 'undefined' && (isFallback || !rule.prop(propName))) {
	      var appendedValue = styleDetector(_defineProperty({}, propName, value[prop]), rule)[propName];
	
	      // Add style directly in rule
	      if (isFallback) rule.style.fallbacks[propName] = appendedValue;else rule.style[propName] = appendedValue;
	    }
	    // Delete converted property to avoid double converting
	    delete value[prop];
	  }
	
	  return value;
	}
	
	/**
	 * Detect if a style needs to be converted.
	 *
	 * @param {Object} style
	 * @param {Object} rule
	 * @param {Boolean} is fallback prop
	 * @return {Object} convertedStyle
	 */
	function styleDetector(style, rule, isFallback) {
	  for (var prop in style) {
	    var value = style[prop];
	
	    if (Array.isArray(value)) {
	      // Check double arrays to avoid recursion.
	      if (!Array.isArray(value[0])) {
	        if (prop === 'fallbacks') {
	          for (var index = 0; index < style.fallbacks.length; index++) {
	            style.fallbacks[index] = styleDetector(style.fallbacks[index], rule, true);
	          }
	          continue;
	        }
	
	        style[prop] = processArray(value, prop, _props.propArray);
	        // Avoid creating properties with empty values
	        if (!style[prop].length) delete style[prop];
	      }
	    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	      if (prop === 'fallbacks') {
	        style.fallbacks = styleDetector(style.fallbacks, rule, true);
	        continue;
	      }
	
	      style[prop] = objectToArray(value, prop, rule, isFallback);
	      // Avoid creating properties with empty values
	      if (!style[prop].length) delete style[prop];
	    }
	
	    // Maybe a computed value resulting in an empty string
	    else if (style[prop] === '') delete style[prop];
	  }
	
	  return style;
	}
	
	/**
	 * Adds possibility to write expanded styles.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssExpand() {
	  function onProcessStyle(style, rule) {
	    if (!style || rule.type !== 'style') return style;
	
	    if (Array.isArray(style)) {
	      // Pass rules one by one and reformat them
	      for (var index = 0; index < style.length; index++) {
	        style[index] = styleDetector(style[index], rule);
	      }
	      return style;
	    }
	
	    return styleDetector(style, rule);
	  }
	
	  return { onProcessStyle: onProcessStyle };
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * A scheme for converting properties from array to regular style.
	 * All properties listed below will be transformed to a string separated by space.
	 */
	var propArray = exports.propArray = {
	  'background-size': true,
	  'background-position': true,
	  border: true,
	  'border-bottom': true,
	  'border-left': true,
	  'border-top': true,
	  'border-right': true,
	  'border-radius': true,
	  'border-image': true,
	  'border-width': true,
	  'border-style': true,
	  'border-color': true,
	  'box-shadow': true,
	  flex: true,
	  margin: true,
	  padding: true,
	  outline: true,
	  'transform-origin': true,
	  transform: true,
	  transition: true
	
	  /**
	   * A scheme for converting arrays to regular styles inside of objects.
	   * For e.g.: "{position: [0, 0]}" => "background-position: 0 0;".
	   */
	};var propArrayInObj = exports.propArrayInObj = {
	  position: true, // background-position
	  size: true // background-size
	
	
	  /**
	   * A scheme for parsing and building correct styles from passed objects.
	   */
	};var propObj = exports.propObj = {
	  padding: {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  },
	  margin: {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  },
	  background: {
	    attachment: null,
	    color: null,
	    image: null,
	    position: null,
	    repeat: null
	  },
	  border: {
	    width: null,
	    style: null,
	    color: null
	  },
	  'border-top': {
	    width: null,
	    style: null,
	    color: null
	  },
	  'border-right': {
	    width: null,
	    style: null,
	    color: null
	  },
	  'border-bottom': {
	    width: null,
	    style: null,
	    color: null
	  },
	  'border-left': {
	    width: null,
	    style: null,
	    color: null
	  },
	  outline: {
	    width: null,
	    style: null,
	    color: null
	  },
	  'list-style': {
	    type: null,
	    position: null,
	    image: null
	  },
	  transition: {
	    property: null,
	    duration: null,
	    'timing-function': null,
	    timingFunction: null, // Needed for avoiding comilation issues with jss-camel-case
	    delay: null
	  },
	  animation: {
	    name: null,
	    duration: null,
	    'timing-function': null,
	    timingFunction: null, // Needed to avoid compilation issues with jss-camel-case
	    delay: null,
	    'iteration-count': null,
	    iterationCount: null, // Needed to avoid compilation issues with jss-camel-case
	    direction: null,
	    'fill-mode': null,
	    fillMode: null, // Needed to avoid compilation issues with jss-camel-case
	    'play-state': null,
	    playState: null // Needed to avoid compilation issues with jss-camel-case
	  },
	  'box-shadow': {
	    x: 0,
	    y: 0,
	    blur: 0,
	    spread: 0,
	    color: null,
	    inset: null
	  },
	  'text-shadow': {
	    x: 0,
	    y: 0,
	    blur: null,
	    color: null
	  }
	
	  /**
	   * A scheme for converting non-standart properties inside object.
	   * For e.g.: include 'border-radius' property inside 'border' object.
	   */
	};var customPropObj = exports.customPropObj = {
	  border: {
	    radius: 'border-radius',
	    image: 'border-image',
	    width: 'border-width',
	    style: 'border-style',
	    color: 'border-color'
	  },
	  background: {
	    size: 'background-size',
	    image: 'background-image'
	  },
	  font: {
	    style: 'font-style',
	    variant: 'font-variant',
	    weight: 'font-weight',
	    stretch: 'font-stretch',
	    size: 'font-size',
	    family: 'font-family',
	    lineHeight: 'line-height', // Needed to avoid compilation issues with jss-camel-case
	    'line-height': 'line-height'
	  },
	  flex: {
	    grow: 'flex-grow',
	    basis: 'flex-basis',
	    direction: 'flex-direction',
	    wrap: 'flex-wrap',
	    flow: 'flex-flow',
	    shrink: 'flex-shrink'
	  },
	  align: {
	    self: 'align-self',
	    items: 'align-items',
	    content: 'align-content'
	  },
	  grid: {
	    'template-columns': 'grid-template-columns',
	    templateColumns: 'grid-template-columns',
	
	    'template-rows': 'grid-template-rows',
	    templateRows: 'grid-template-rows',
	
	    'template-areas': 'grid-template-areas',
	    templateAreas: 'grid-template-areas',
	
	    template: 'grid-template',
	
	    'auto-columns': 'grid-auto-columns',
	    autoColumns: 'grid-auto-columns',
	
	    'auto-rows': 'grid-auto-rows',
	    autoRows: 'grid-auto-rows',
	
	    'auto-flow': 'grid-auto-flow',
	    autoFlow: 'grid-auto-flow',
	
	    row: 'grid-row',
	    column: 'grid-column',
	
	    'row-start': 'grid-row-start',
	    rowStart: 'grid-row-start',
	    'row-end': 'grid-row-end',
	    rowEnd: 'grid-row-end',
	
	    'column-start': 'grid-column-start',
	    columnStart: 'grid-column-start',
	    'column-end': 'grid-column-end',
	    columnEnd: 'grid-column-end',
	
	    area: 'grid-area',
	    gap: 'grid-gap',
	
	    'row-gap': 'grid-row-gap',
	    rowGap: 'grid-row-gap',
	
	    'column-gap': 'grid-column-gap',
	    columnGap: 'grid-column-gap'
	  }
	};

/***/ })
/******/ ])
});
;
//# sourceMappingURL=jss-expand.js.map