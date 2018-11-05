import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsAuthenticated,
  makeSelectLocation,
} from '../../../containers/App/selectors';

const GuestRoute = ({ isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    return <Route {...rest} />;
  }
  delete rest.component; // eslint-disable-line
  return <Route {...rest} render={() => <Redirect to="/" />} />;
};

GuestRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(GuestRoute);
