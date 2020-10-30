/**
 *
 * ResetPasswordPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectDefaultData,
  makeSelectErrors,
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'resetPasswordPage';

export const ResetPasswordPage = props => {
  const {
    loadResetRequest,
    setData,
    clearErrors,
    match: {
      params: { email, code },
    },
    defaultData,
    loading,
    errors,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (email !== '') {
      setData({ key: 'email', value: email });
    }
    if (code !== undefined && code !== '') {
      setData({ key: 'code', value: code });
    } else {
      setData({ key: 'code', value: '' });
    }
  }, []);

  const handleChange = e => {
    e.persist();
    setData({ key: e.target.name, value: e.target.value });
  };

  const handleSubmit = () => {
    loadResetRequest();
  };

  return (
    <div className="max-w-lg mx-auto p-16">
      <h1 className="text-2xl font-bold">
        Reset your password with the help of code sent to your email...
      </h1>
      <input
        className="inputbox w-full"
        id="code"
        name="email"
        type="text"
        value={defaultData.email}
        placeholder="Enter email"
        onChange={handleChange}
        disabled
      />
      <div id="component-error-text">{errors && errors.email}</div>

      <input
        className="inputbox w-full"
        id="code"
        name="code"
        type="text"
        value={defaultData.code}
        placeholder="Enter code"
        onChange={handleChange}
      />
      <div id="component-error-text">{errors && errors.code}</div>
      <input
        className="inputbox w-full mt-4"
        id="password"
        name="password"
        type="text"
        value={defaultData.password}
        placeholder="Enter password"
        onChange={handleChange}
      />
      <div id="component-error-text">{errors && errors.password}</div>
      <input
        className="inputbox w-full mt-4"
        id="confirm-password"
        name="confirm_password"
        type="text"
        value={defaultData.confirm_password}
        placeholder="Confirm password"
        onChange={handleChange}
      />
      <div id="component-error-text">{errors && errors.confirm_password}</div>
      <button
        className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
        onClick={handleSubmit}
      >
        {loading ? '...' : 'SUBMIT'}
      </button>
    </div>
  );
};

ResetPasswordPage.propTypes = {
  defaultActionRequest: PropTypes.func.isRequired,
  defaultData: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  defaultData: makeSelectDefaultData(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(ResetPasswordPage);
