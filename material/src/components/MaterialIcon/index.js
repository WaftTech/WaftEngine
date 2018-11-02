
// Style: <link rel="stylesheet" href="vendors/material-icons/material-icons.css">
// https://github.com/material-components/material-components-web-react/blob/master/packages/material-icon/index.js

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class MaterialIcon extends React.Component {
  render() {
    const {
      icon,
      ...otherProps
    } = this.props;

    return (
      <MaterialIconDefault
        icon={icon}
        {...otherProps}
      />
    );
  }
}

const MaterialIconDefault = (props) => {
  const {
    className,
    icon,
    ...otherProps
  } = props;
  const classes = classnames('material-icons', className);

  return (
    <i
      className={classes}
      {...otherProps}
    >
      {icon}
    </i>
  );
};


MaterialIcon.propTypes = {
  icon: PropTypes.string,
};

MaterialIcon.defaultProps = {
  icon: '',
};

MaterialIconDefault.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
};

MaterialIconDefault.defaultProps = {
  icon: '',
  className: '',
};
