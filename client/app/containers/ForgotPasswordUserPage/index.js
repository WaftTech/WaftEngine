/**
 *
 * ForgotPasswordUser
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as mapDispatchToProps from './actions';
import UsernameInput from './components/UsernameInput';
import reducer from './reducer';
import saga from './saga';
import { makeSelectErrors } from './selectors';



const ForgotPasswordUser = ({
  classes,
  forgotPasswordRequest,
  error,
  clearError,
}) => {
  useEffect(() => {
    clearError();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    forgotPasswordRequest();
  };
  return (
    <div className="max-w-lg mx-auto p-16">
      <h1 className="text-2xl font-bold">Forgot your password?</h1>
      <p>
        Don’t worry! Just fill in your email and we’ll help you reset your
        password.
      </p>
      <form className="my-4" onSubmit={handleSubmit}>
        <UsernameInput error={error.email} />

        <button
          className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

ForgotPasswordUser.propTypes = {
  forgotPasswordRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectErrors(),
});

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
