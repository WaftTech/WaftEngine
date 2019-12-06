/**
 *
 * ResetPasswordPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectDefaultData } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'resetPasswordPage';

export const ResetPasswordPage = props => {
  const {
    loadResetRequest,
    setData,
    match: { params: email },
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleChange = e => {
    e.persist();
    setData({ key: e.target.name, value: e.target.value });
  };

  const handleSubmit = () => {
    e.preventDefault();
    loadResetRequest(email);
  };

  return (
    <div className="max-w-lg mx-auto p-16">
      <h1 className="text-2xl font-bold">
        Reset your password with the help of code sent to your email...
      </h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          className="inputbox w-full"
          id="code"
          name="code"
          type="text"
          value={email}
          placeholder="Enter code"
          onChange={handleChange}
        />
        <input
          className="inputbox w-full"
          id="code"
          name="code"
          type="text"
          value={email}
          placeholder="Enter code"
          onChange={handleChange}
        />

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

ResetPasswordPage.propTypes = {
  defaultActionRequest: PropTypes.func.isRequired,
  defaultData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  defaultData: makeSelectDefaultData(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(ResetPasswordPage);
