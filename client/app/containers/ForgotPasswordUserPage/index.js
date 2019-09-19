/**
 *
 * ForgotPasswordUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import UsernameInput from './components/UsernameInput';
import logo from '../../images/logo.png';

const ForgotPasswordUser = ({ classes, forgotPasswordRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    forgotPasswordRequest();
  };
  return (
    <div className="max-w-lg mx-auto py-16">
      <h1 className="text-2xl font-bold">Forgot your password?</h1>
      <p >Don’t worry! Just fill in your email and we’ll help you reset your password.</p>
      <form className="my-4" onSubmit={handleSubmit}>
        <UsernameInput />

        <button className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme" type="submit">
          SUBMIT
          </button>

      </form>

      {/* <Link className={classes.smallFont} to="/login-user">
        LOGIN?
        </Link>
      <Link className={classes.smallFont} to="/signup-user">
        Not a user?
        </Link> */}
    </div>
  );
};

ForgotPasswordUser.propTypes = {
  forgotPasswordRequest: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgotPasswordUserPage', reducer });
const withSaga = injectSaga({ key: 'forgotPasswordUserPage', saga });


export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgotPasswordUser);
