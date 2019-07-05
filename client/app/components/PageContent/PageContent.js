import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageContent = props => {
  const { loading, children } = props;
  return (
    <div
      className={`bg-white rounded py-5 px-5 ${loading ? 'opacity-50' : ''}`}
    >
      {children}
    </div>
  );
};

export default PageContent;
