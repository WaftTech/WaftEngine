import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
// @inheritedComponent FormGroup
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import FormGroup from '../FormGroup';
import { createChainedFunction, find } from '../utils/helpers';

class RadioGroup extends React.Component {
  constructor(...args) {
    super(...args);
    this.radios = [];

    this.focus = () => {
      if (!this.radios || !this.radios.length) {
        return;
      }

      const focusRadios = this.radios.filter(n => !n.disabled);

      if (!focusRadios.length) {
        return;
      }

      const selectedRadio = find(focusRadios, n => n.checked);

      if (selectedRadio) {
        selectedRadio.focus();
        return;
      }

      focusRadios[0].focus();
    };

    this.handleRadioChange = (event, checked) => {
      if (checked && this.props.onChange) {
        this.props.onChange(event, event.target.value);
      }
    };
  }

  render() {
    const _this$props = this.props,
          {
      children,
      name,
      value,
      onChange
    } = _this$props,
          other = _objectWithoutProperties(_this$props, ["children", "name", "value", "onChange"]);

    this.radios = [];
    return React.createElement(FormGroup, _extends({
      role: "radiogroup"
    }, other), React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      process.env.NODE_ENV !== "production" ? warning(child.type !== React.Fragment, ["Material-UI: the RadioGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
      return React.cloneElement(child, {
        name,
        inputRef: node => {
          if (node) {
            this.radios.push(node);
          }
        },
        checked: value === child.props.value,
        onChange: createChainedFunction(child.props.onChange, this.handleRadioChange)
      });
    }));
  }

}

RadioGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * The name used to reference the value of the control.
   */
  name: PropTypes.string,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {string} value The `value` of the selected radio button
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * Value of the selected radio button.
   */
  value: PropTypes.string
} : {};
export default RadioGroup;