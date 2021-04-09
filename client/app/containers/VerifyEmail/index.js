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

const key = 'verifyEmail';

export const VerifyEmail = props => {
  const {
    match: {
      params: { email, code },
    },
    loading,
  } = props;

  const [formEmail, setEmail] = useState('');
  const [formCode, setCode] = useState('');

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (email !== '' && code !== undefined) {
      props.loadVerifyEmailRequest({ email, code });
    }
    if (email !== '') {
      setEmail(email);
    }
    if (code !== undefined && code !== '') {
      setCode(code);
    }
  }, []);
  const handleVerify = () => {
    if (formCode !== '' && formEmail !== '') {
      props.loadVerifyEmailRequest({ email: formEmail, code: formCode });
    }
  };

  const handleEmail = () => event => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleCode = () => event => {
    const { value } = event.target;
    setCode(value);
  };

  const handleResend = () => {
    if (formEmail !== '') {
      props.resendMailRequest({ email: formEmail });
    }
  };

  return (
    <div>
      {loading ? (
        <h2>Verifying...</h2>
      ) : (
        <div className="mt-4">
          <div className="m-auto w-1/2">
            <label htmlFor="email">Email</label>
            <input
              className="inputbox"
              onChange={handleEmail('email')}
              value={formEmail}
              id="email"
              type="text"
              name="Email"
            />
          </div>
          <div className="m-auto w-1/2 mt-2">
            <label htmlFor="code">Code</label>
            <input
              className="inputbox"
              onChange={handleCode('code')}
              value={formCode}
              id="code"
              type="text"
              name="Code"
            />
          </div>
          <div className="m-auto w-1/2 mt-4">
            <button
              className="inline-block align-baseline text-xs text-blue-700 hover:text-blue-700-darker"
              onClick={handleResend}
              type="button"
            >
              Resend code.
            </button>
          </div>
          <div className="m-auto w-1/2">
            <button
              className="py-2 px-6 rounded mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
      code: PropTypes.string,
    }),
  }),
  loadVerifyEmailRequest: PropTypes.func.isRequired,
  resendMailRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });
export default compose(withConnect, memo)(VerifyEmail);
