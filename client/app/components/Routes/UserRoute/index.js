import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLocation, makeSelectToken
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
