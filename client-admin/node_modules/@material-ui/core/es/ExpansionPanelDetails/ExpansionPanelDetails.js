import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    padding: '8px 24px 24px'
  }
};

function ExpansionPanelDetails(props) {
  const {
    classes,
    children,
    className
  } = props,
        other = _objectWithoutProperties(props, ["classes", "children", "className"]);

  return React.createElement("div", _extends({
    className: classNames(classes.root, className)
  }, other), children);
}

ExpansionPanelDetails.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the expansion panel details.
   */
  children: PropTypes.node.isRequired,

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
export default withStyles(styles, {
  name: 'MuiExpansionPanelDetails'
})(ExpansionPanelDetails);