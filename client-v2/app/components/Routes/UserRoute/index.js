import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectToken,
  makeSelectLocation,
} from '../../../containers/App/selectors';

const UserRoute = ({ token, ...rest }) => {
  if (token) return <Route {...rest} />;
  delete rest.component; // eslint-disable-line no-param-reassign
  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: '/login-user',
            state: { from: props.location },
          }}
        />
      )}
    />
  );
};

UserRoute.propTypes = {
  token: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(UserRoute);
