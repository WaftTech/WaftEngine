import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsAuthenticated, makeSelectLocation } from '../../../containers/App/selectors';

const UserRoute = ({ isAuthenticated, ...rest }) => {
  if (isAuthenticated) return <Route {...rest} />;
  return null;
  // delete rest.component;
  // return (
  //   <Route
  //     {...rest}
  //     render={props => (
  //       <Redirect
  //         to={{
  //           pathname: '/login',
  //           state: { from: props.location },
  //         }}
  //       />
  //     )}
  //   />
  // );
};

UserRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(UserRoute);
