/**
 *
 * VerifyEmail
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Input from '../../components/customComponents/Input';

const key = 'verifyEmail';

export const VerifyEmail = props => {
  const {
    match: {
      params: { email, code },
    },
    loading,
  } = props;

  const [form_email, setEmail] = useState('');
  const [form_code, setCode] = useState('');

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (email !== '' && code !== undefined) {
      props.loadVerifyEmailRequest({ email: email, code: code });
    }
    if (email !== '') {
      setEmail(email);
    }
  }, []);
  const handleVerify = () => {
    if (form_code !== '' && form_email !== '') {
      props.loadVerifyEmailRequest({ email: form_email, code: form_code });
    }
  };

  const handleEmail = name => event => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleCode = name => event => {
    const value = event.target.value;
    setCode(value);
  };

  return (
    <div>
      {loading ? (
        <h2>Verifying...</h2>
      ) : (
        <div className="mt-4">
          <div className="m-auto w-1/2">
            <Input
              label="Email"
              inputclassName="inputbox"
              onChange={handleEmail('email')}
              value={form_email}
              inputid="email"
              inputType="text"
              name="Email"
            />
          </div>
          <div className="m-auto w-1/2">
            <Input
              label="Code"
              inputclassName="inputbox"
              onChange={handleCode('code')}
              value={form_code}
              inputid="code"
              inputType="text"
              name="Code"
            />
          </div>
          <div className="m-auto w-1/2">
            <button
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
              onClick={handleVerify}
              type="button"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

VerifyEmail.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
)(VerifyEmail);
