import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageContent = props => {
  const { classes, children } = props;
  return (
    <div
      style={{
        margin: 24,
        marginTop: -30,
      }}
    >
      {children}
    </div>
  );
};

export default PageContent;
