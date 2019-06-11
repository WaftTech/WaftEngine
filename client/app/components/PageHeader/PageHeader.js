import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';

const PageHeader = props => {
  const { classes, children } = props;
  return <div className="pageheader text-2xl my-auto">{children}</div>;
};

export default PageHeader;
