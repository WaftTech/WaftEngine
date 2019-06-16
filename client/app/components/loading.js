import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';

const Loading = props => {
  const { classes, children } = props;
  return  <div class="waft-gradient"></div>
};

export default Loading;