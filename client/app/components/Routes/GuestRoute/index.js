import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsAuthenticated,
  makeSelectLocation,
} from '../../../containers/App/selectors';
import OauthConnect from '../../OauthConnect';

const GuestRoute = ({ isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    return (
      <OauthConnect>
        <Route {...rest} />
      </OauthConnect>
    );
  }
  delete rest['component'];
  return <Route {...rest} render={props => <Redirect to="/" />} />;
};

GuestRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(GuestRoute);
