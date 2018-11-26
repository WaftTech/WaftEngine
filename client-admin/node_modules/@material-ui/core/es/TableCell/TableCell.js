import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { darken, fade, lighten } from '../styles/colorManipulator';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'table-cell',
    verticalAlign: 'inherit',
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: `1px solid
    ${theme.palette.type === 'light' ? lighten(fade(theme.palette.divider, 1), 0.88) : darken(fade(theme.palette.divider, 1), 0.8)}`,
    textAlign: 'left',
    padding: '4px 56px 4px 24px',
    '&:last-child': {
      paddingRight: 24
    }
  },

  /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
  head: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium
  },

  /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
  body: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular
  },

  /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
  footer: {
    borderBottom: 0,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12)
  },

  /* Styles applied to the root element if `numeric={true}`. */
  numeric: {
    textAlign: 'right',
    flexDirection: 'row-reverse' // can be dynamically inherited at runtime by contents

  },

  /* Styles applied to the root element if `padding="dense"`. */
  paddingDense: {
    paddingRight: 24
  },

  /* Styles applied to the root element if `padding="checkbox"`. */
  paddingCheckbox: {
    padding: '0 12px',
    '&:last-child': {
      paddingRight: 12
    }
  },

  /* Styles applied to the root element if `padding="none"`. */
  paddingNone: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  }
});

function TableCell(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    component,
    sortDirection,
    numeric,
    padding: paddingProp,
    scope: scopeProp,
    variant
  } = props,
        other = _objectWithoutProperties(props, ["children", "classes", "className", "component", "sortDirection", "numeric", "padding", "scope", "variant"]);

  const {
    table,
    tablelvl2
  } = context;
  let Component;

  if (component) {
    Component = component;
  } else {
    Component = tablelvl2 && tablelvl2.variant === 'head' ? 'th' : 'td';
  }

  let scope = scopeProp;

  if (!scope && tablelvl2 && tablelvl2.variant === 'head') {
    scope = 'col';
  }

  const padding = paddingProp || (table && table.padding ? table.padding : 'default');
  const className = classNames(classes.root, {
    [classes.head]: variant ? variant === 'head' : tablelvl2 && tablelvl2.variant === 'head',
    [classes.body]: variant ? variant === 'body' : tablelvl2 && tablelvl2.variant === 'body',
    [classes.footer]: variant ? variant === 'footer' : tablelvl2 && tablelvl2.variant === 'footer',
    [classes.numeric]: numeric,
    [classes[`padding${capitalize(padding)}`]]: padding !== 'default'
  }, classNameProp);
  let ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return React.createElement(Component, _extends({
    className: className,
    "aria-sort": ariaSort,
    scope: scope
  }, other), children);
}

TableCell.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The table cell contents.
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
   * If `true`, content will align to the right.
   */
  numeric: PropTypes.bool,

  /**
   * Sets the padding applied to the cell.
   * By default, the Table parent component set the value.
   */
  padding: PropTypes.oneOf(['default', 'checkbox', 'dense', 'none']),

  /**
   * Set scope attribute.
   */
  scope: PropTypes.string,

  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),

  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant: PropTypes.oneOf(['head', 'body', 'footer'])
} : {};
TableCell.defaultProps = {
  numeric: false
};
TableCell.contextTypes = {
  table: PropTypes.object,
  tablelvl2: PropTypes.object
};
export default withStyles(styles, {
  name: 'MuiTableCell'
})(TableCell);