import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageContent = props => {
  const { classes, children } = props;
  return (
    <div
      style={{
        margin: 24,
        marginBottom: 100,
      }}
    >
      {children}
    </div>
  );
};

export default PageContent;
