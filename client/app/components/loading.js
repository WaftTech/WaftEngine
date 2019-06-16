import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';

const Loading = props => {
  const { classes, children } = props;
  return  <div className="load_wrap">
  <div className="loading">
    <div className="loading-line"></div>
    <div className="loading-line"></div>
    <div className="loading-line"></div>
  </div>
</div>
};

export default Loading;