import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Tick from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectUser } from '../../App/selectors';
import { makeSelectToken } from '../selectors';
import '../styles.css';

function App(props) {
  const { user, token } = props;
  return (
    <>
      <div className="p-4">
        {token || user.email_verified ? (
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
          to="/user/profile/information"
        >
          Information
        </NavLink>
        <NavLink
          className="block text-gray-800 hover:text-primary"
          to="/user/profile/change-password"
        >
          Change Password
        </NavLink>
        <NavLink
          className="block text-gray-800 hover:text-primary"
          to="/user/profile/two-factor"
        >
          Two Factor Authentication
        </NavLink>
      </div>
    </>
  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.bool.isRequired,
};

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  token: makeSelectToken(),
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
