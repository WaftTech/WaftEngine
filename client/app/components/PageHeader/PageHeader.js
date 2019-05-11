import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => {
  const { classes, children } = props;
  return <h1 className="mt-2 ml-5 font-light">{children}</h1>;
};

export default PageHeader;
