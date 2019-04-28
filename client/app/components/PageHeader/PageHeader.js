import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => {
  const { classes, children } = props;
  return (
    <div
      style={{
        background: '#02B7DD',
        height: 50,
        padding: '72px 24px 0',
        fontSize: 24,
        color: '#fff',
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
