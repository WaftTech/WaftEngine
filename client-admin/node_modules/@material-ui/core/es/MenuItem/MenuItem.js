import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
// @inheritedComponent ListItem
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ListItem from '../ListItem';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: _objectSpread({}, theme.typography.subheading, {
    height: 24,
    boxSizing: 'content-box',
    width: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingLeft: 16,
    paddingRight: 16,
    '&$selected': {}
  }),

  /* Styles applied to the root element if `selected={true}`. */
  selected: {}
});

function MenuItem(props) {
  const {
    classes,
    className,
    component,
    selected,
    role
  } = props,
        other = _objectWithoutProperties(props, ["classes", "className", "component", "selected", "role"]);

  return React.createElement(ListItem, _extends({
    button: true,
    role: role,
    tabIndex: -1,
    selected: selected,
    className: classNames(classes.root, {
      [classes.selected]: selected
    }, className),
    component: component
  }, other));
}

MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Menu item contents.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),

  /**
   * @ignore
   */
  role: PropTypes.string,

  /**
   * @ignore
   */
  selected: PropTypes.bool
} : {};
MenuItem.defaultProps = {
  component: 'li',
  role: 'menuitem'
};
export default withStyles(styles, {
  name: 'MuiMenuItem'
})(MenuItem);