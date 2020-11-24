import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageContent = props => {
  const { loading, children } = props;
  return (
    <div
      className={`${
        loading
          ? 'opacity-25 bg-white border p-4 rounded'
          : 'bg-white border p-4 rounded'
      }`}
    >
      {children}
    </div>
  );
};

export default PageContent;
