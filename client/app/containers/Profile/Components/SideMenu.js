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
import Tick from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

function App(props) {
  const { verified } = props;

  return (
    <>
      <div className="p-4">
        {verified ? (
          <NavLink
            className="mb-2 block text-green-500 hover:text-primary"
            to="/user/profile"
          >
            Email verified <Tick />
          </NavLink>
        ) : (
          <NavLink
            className="mb-2 block text-red-500 text-primary"
            to="/user/profile/verify"
          >
            Email not verified <Clear />
          </NavLink>
        )}
        <h2 className="text-2xl mb-2 font-bold">Profile</h2>

        <NavLink
          className="block text-gray-800 hover:text-primary"
          to="/user/profile"
        >
          Information
        </NavLink>
        <NavLink
          className="block text-gray-800 hover:text-primary"
          to="/user/profile/change-password"
        >
          Change Password
        </NavLink>
      </div>
    </>
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
