import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLocation,
  makeSelectToken,
  makeSelectUserIsAdmin,
} from '../../../containers/App/selectors';
import NotFoundPage from '../../../containers/NotFoundPage';

const AdminRoute = ({ token, isAdmin, ...rest }) => {
  if (token && isAdmin) return <Route {...rest} />;
  delete rest.component; // eslint-disable-line no-param-reassign
  if (token && isAdmin === false) return <Route component={NotFoundPage} />;
  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: '/', ///login-admin redirect from here
            state: { from: props.location },
          }}
        />
      )}
    />
  );
};

AdminRoute.propTypes = {
  token: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

AdminRoute.defaultProps = {
  isAdmin: false,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  location: makeSelectLocation(),
  isAdmin: makeSelectUserIsAdmin(),
});

export default connect(mapStateToProps)(AdminRoute);
