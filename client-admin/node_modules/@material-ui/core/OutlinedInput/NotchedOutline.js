"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("../styles");

var _helpers = require("../utils/helpers");

var styles = function styles(theme) {
  var light = theme.palette.type === 'light';
  var align = theme.direction === 'rtl' ? 'right' : 'left';
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
      pointerEvents: 'none',
      borderRadius: theme.shape.borderRadius,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: light ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
      // Match the Input Label
      transition: theme.transitions.create(["padding-".concat(align), 'border-color', 'border-width'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    },

    /* Styles applied to the legend element. */
    legend: {
      textAlign: 'left',
      padding: 0,
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }),
      // Firefox workaround. Firefox will only obscure the
      // rendered height of the legend and, unlike other browsers,
      // will not push fieldset contents.
      '@supports (-moz-appearance:none)': {
        height: 2
      }
    },

    /* Styles applied to the root element if the control is focused. */
    focused: {
      borderColor: theme.palette.primary.main,
      borderWidth: 2
    },

    /* Styles applied to the root element if `error={true}`. */
    error: {
      borderColor: theme.palette.error.main
    },

    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {
      borderColor: theme.palette.action.disabled
    }
  };
};
/**
 * @ignore - internal component.
 */


exports.styles = styles;

function NotchedOutline(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      className = props.className,
      disabled = props.disabled,
      error = props.error,
      focused = props.focused,
      labelWidthProp = props.labelWidth,
      notched = props.notched,
      style = props.style,
      theme = props.theme,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "disabled", "error", "focused", "labelWidth", "notched", "style", "theme"]);
  var align = theme.direction === 'rtl' ? 'right' : 'left';
  var labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0;
  return _react.default.createElement("fieldset", (0, _extends3.default)({
    "aria-hidden": true,
    style: (0, _extends3.default)((0, _defineProperty2.default)({}, "padding".concat((0, _helpers.capitalize)(align)), 8 + (notched ? 0 : labelWidth / 2)), style),
    className: (0, _classnames.default)(classes.root, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes.focused, focused), (0, _defineProperty2.default)(_classNames, classes.error, error), (0, _defineProperty2.default)(_classNames, classes.disabled, disabled), _classNames), className)
  }, other), _react.default.createElement("legend", {
    className: classes.legend,
    style: {
      // IE 11: fieldset with legend does not render
      // a border radius. This maintains consistency
      // by always having a legend rendered
      width: notched ? labelWidth : 0.01
    }
  }));
}

NotchedOutline.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the outline should be displayed in a disabled state.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the outline should be displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the outline should be displayed in a focused state.
   */
  focused: _propTypes.default.bool,

  /**
   * The width of the legend.
   */
  labelWidth: _propTypes.default.number.isRequired,

  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: _propTypes.default.bool.isRequired,

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * @ignore
   */
  theme: _propTypes.default.object
} : {};

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiNotchedOutline',
  withTheme: true
})(NotchedOutline);

exports.default = _default;