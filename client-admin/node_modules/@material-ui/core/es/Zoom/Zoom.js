import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
// @inheritedComponent Transition
import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';
import { reflow, getTransitionProps } from '../transitions/utils';
const styles = {
  entering: {
    transform: 'scale(1)'
  },
  entered: {
    transform: 'scale(1)'
  }
};
/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](https://material-ui.com/demos/buttons/#floating-action-buttons) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

class Zoom extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleEnter = node => {
      const {
        theme
      } = this.props;
      reflow(node); // So the animation always start from the start.

      const transitionProps = getTransitionProps(this.props, {
        mode: 'enter'
      });
      node.style.webkitTransition = theme.transitions.create('transform', transitionProps);
      node.style.transition = theme.transitions.create('transform', transitionProps);

      if (this.props.onEnter) {
        this.props.onEnter(node);
      }
    };

    this.handleExit = node => {
      const {
        theme
      } = this.props;
      const transitionProps = getTransitionProps(this.props, {
        mode: 'exit'
      });
      node.style.webkitTransition = theme.transitions.create('transform', transitionProps);
      node.style.transition = theme.transitions.create('transform', transitionProps);

      if (this.props.onExit) {
        this.props.onExit(node);
      }
    };
  }

  render() {
    const _this$props = this.props,
          {
      children,
      onEnter,
      onExit,
      style: styleProp,
      theme
    } = _this$props,
          other = _objectWithoutProperties(_this$props, ["children", "onEnter", "onExit", "style", "theme"]);

    const style = _objectSpread({}, styleProp, React.isValidElement(children) ? children.props.style : {});

    return React.createElement(Transition, _extends({
      appear: true,
      onEnter: this.handleEnter,
      onExit: this.handleExit
    }, other), (state, childProps) => {
      return React.cloneElement(children, _objectSpread({
        style: _objectSpread({
          transform: 'scale(0)',
          willChange: 'transform'
        }, styles[state], style)
      }, childProps));
    });
  }

}

Zoom.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A single child content element.
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,

  /**
   * @ignore
   */
  onEnter: PropTypes.func,

  /**
   * @ignore
   */
  onExit: PropTypes.func,

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : {};
Zoom.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};
export default withTheme()(Zoom);