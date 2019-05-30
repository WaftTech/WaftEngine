import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectToken,
  makeSelectUserIsAdmin,
  makeSelectLocation,
} from '../../../containers/App/selectors';
import NotFoundPage from '../../../containers/NotFoundPage';

const AdminRoute = ({ token, isAdmin, ...rest }) => {
  if (token && isAdmin) return <Route {...rest} />;
  delete rest.component; // eslint-disable-line no-param-reassign
  if (token && isAdmin == false) return <Route component={NotFoundPage} />;
  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: '/login-admin',
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

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  location: makeSelectLocation(),
  isAdmin: makeSelectUserIsAdmin(),
});

export default connect(mapStateToProps)(AdminRoute);
