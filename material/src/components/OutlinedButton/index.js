import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// Customized outlined button based on material-ui Button
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js

const styles = theme => ({
  root: {
    borderWidth: '2px',
    borderColor: theme.palette.text.primary,
    padding: '6px 16px', // 6 = 8-2 (border)
    '&$disabled': {
      borderColor: theme.palette.action.disabled,
    },
  },
  primary: {
    borderColor: theme.palette.primary.main
  },
  secondary: {
    borderColor: theme.palette.secondary.main,
  },
  disabled: {},
})

class OutlinedButton extends React.Component {
  render() {
    const {
      children,
      classes,
      className: classNameProp,
      color,
      disabled,
      ...otherProps
    } = this.props;

    const className = classnames(
      classes.root,
      {
        [classes.primary]: color === 'primary',
        [classes.secondary]: color === 'secondary',
        [classes.disabled]: disabled,
      },
      classNameProp
    );

    return (
      <Button
        variant="outlined"
        className={className}
        color={color}
        disabled={disabled}
        {...otherProps}
      >{children}
      </Button>
    );
  }
}

OutlinedButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  disabled: PropTypes.bool,
};

OutlinedButton.defaultProps = {};

export default withStyles(styles, { name: 'MuiOutlinedButton' })(OutlinedButton);