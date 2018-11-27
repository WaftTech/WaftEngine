import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsAuthenticated, makeSelectLocation } from '../../../containers/App/selectors';

const GuestRoute = ({ isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    return <Route {...rest} />;
  }
  delete rest['component'];
  return <Route {...rest} render={props => <Redirect to="/wt/dashboard" />} />;
};

GuestRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(GuestRoute);
