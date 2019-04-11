import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => {
  const { classes, children } = props;
  return (
    <div
      style={{
        background: '#02B7DD',
        height: 50,
        padding: 24,
        fontSize: 24,
        color: '#fff',
        paddingTop: 100,
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        fontWeight: 300,
      }}
    >
      {children}
    </div>
  );
};

export default PageHeader;
