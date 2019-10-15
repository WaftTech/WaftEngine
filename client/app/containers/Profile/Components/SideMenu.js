import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from '../reducer';
import saga from '../saga';
// import { loadArchivesRequest } from '../actions';
import { makeSelectEmailVerified } from '../selectors';

function App(props) {
  const { verified } = props;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold">Profile</h2>
      {verified ? (
        <NavLink className="block text-blue-500" to="/user/profile/verify">
          Email verified
        </NavLink>
      ) : (
        <NavLink className="block text-primary" to="/user/profile/verify">
          Email not verified
        </NavLink>
      )}
      <NavLink className="block text-primary" to="/user/profile">
        Information
      </NavLink>
      <NavLink
        className="block text-primary"
        to="/user/profile/change-password"
      >
        Change Password
      </NavLink>
    </div>
  );
}

App.propTypes = {
  verified: PropTypes.bool.isRequired,
};

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

const mapStateToProps = createStructuredSelector({
  verified: makeSelectEmailVerified(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
