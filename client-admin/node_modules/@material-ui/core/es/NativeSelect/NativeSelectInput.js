import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/**
 * @ignore - internal component.
 */

function NativeSelectInput(props) {
  const {
    children,
    classes,
    className,
    disabled,
    IconComponent,
    inputRef,
    name,
    onChange,
    value,
    variant
  } = props,
        other = _objectWithoutProperties(props, ["children", "classes", "className", "disabled", "IconComponent", "inputRef", "name", "onChange", "value", "variant"]);

  return React.createElement("div", {
    className: classes.root
  }, React.createElement("select", _extends({
    className: classNames(classes.select, {
      [classes.filled]: variant === 'filled',
      [classes.outlined]: variant === 'outlined',
      [classes.disabled]: disabled
    }, className),
    name: name,
    disabled: disabled,
    onChange: onChange,
    value: value,
    ref: inputRef
  }, other), children), React.createElement(IconComponent, {
    className: classes.icon
  }));
}

NativeSelectInput.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,

  /**
   * If `true`, the select will be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),

  /**
   * Use that property to pass a ref callback to the native select element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,

  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,

  /**
   * The input value.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
} : {};
export default NativeSelectInput;