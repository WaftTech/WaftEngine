import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    width: 36,
    height: 36,
    fontSize: theme.typography.pxToRem(18),
    marginRight: 4
  },

  /* Styles applied to the children – typically the `Avatar` component. */
  icon: {
    width: 20,
    height: 20,
    fontSize: theme.typography.pxToRem(20)
  }
});
/**
 * This is a simple wrapper to apply the `dense` mode styles to `Avatar`.
 */

function ListItemAvatar(props, context) {
  const {
    children,
    classes,
    className: classNameProp
  } = props,
        other = _objectWithoutProperties(props, ["children", "classes", "className"]);

  if (context.dense === undefined) {
    process.env.NODE_ENV !== "production" ? warning(false, `Material-UI: <ListItemAvatar> is a simple wrapper to apply the dense styles
      to <Avatar>. You do not need it unless you are controlling the <List> dense property.`) : void 0;
    return props.children;
  }

  return React.cloneElement(children, _objectSpread({
    className: classNames({
      [classes.root]: context.dense
    }, classNameProp, children.props.className),
    childrenClassName: classNames({
      [classes.icon]: context.dense
    }, children.props.childrenClassName)
  }, other));
}

ListItemAvatar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component – normally `Avatar`.
   */
  children: PropTypes.element.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string
} : {};
ListItemAvatar.contextTypes = {
  dense: PropTypes.bool
};
ListItemAvatar.muiName = 'ListItemAvatar';
export default withStyles(styles, {
  name: 'MuiListItemAvatar'
})(ListItemAvatar);