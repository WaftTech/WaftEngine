import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => {
  const { classes, children } = props;
  return <h1 className="mt-4 ml-6 font-light text-2xl">{children}</h1>;
};

export default PageHeader;
