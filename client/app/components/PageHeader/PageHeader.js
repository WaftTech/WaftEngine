import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';

const PageHeader = props => {
  const { classes, children } = props;
  return <div className="flex justify-between items-center mt-2 ml-6 mr-6 mb-2">{children}</div>;
};

export default PageHeader;
