import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageContent = props => {
  const { loading, children } = props;
  return (
    <div
      className={`${loading ? 'opacity-25' : ''}`}
    >
      {children}
    </div>
  );
};

export default PageContent;
