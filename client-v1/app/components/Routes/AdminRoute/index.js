import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsAuthenticated, makeSelectLocation } from '../../../containers/App/selectors';

const AdminRoute = ({ isAuthenticated, ...rest }) => {
  if (isAuthenticated) return <Route {...rest} />; // todo verify is admin
  delete rest.component; // eslint-disable-line no-param-reassign
  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: '/auth/admin-login',
            state: { from: props.location },
          }}
        />
      )}
    />
  );
};

AdminRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(AdminRoute);
