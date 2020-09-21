/**
 *
 * LoginUserPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { createStructuredSelector } from 'reselect';

import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { Input } from '../../components/customComponents';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import { FB_APP_ID, FB_APP_FIELDS, GOOGLE_CLIENT_ID } from '../App/constants';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import {
  makeSelectLoading,
  makeSelectErrors,
  makeSelectEmailError,
  makeSelectPasswordError,
  makeSelectHelperObj,
  makeSelectLoadingObj,
  makeSelectTwoFactor,
} from './selectors';
import Modal from '../../components/Modal';
import '../../assets/styles/loading.css';

const LoginUserPage = props => {
  const {
    classes,
    loginRequest,
    loginWithFbRequest,
    loginWithGoogleRequest,
    loading,
    errors,
    emailErr,
    passwordErr,
    twoFactor,
    loadingObj: { loggingUser, sendingCode },
    helperObj: { showEmailTwoFactor, showGoogleTwoFactor },
  } = props;

  const handleClose = () => {
    props.setValue({
      name: 'helperObj',
      key: 'showEmailTwoFactor',
      value: false,
    });
    props.setValue({
      name: 'helperObj',
      key: 'showGoogleTwoFactor',
      value: false,
    });
  };

  useEffect(() => {
    handleClose();
    props.clearStore({ name: 'errors' });
  }, []);

  const handleChange = (e, name) => {
    props.setValue({
      name: 'twoFactor',
      key: 'multi_fa',
      value: {
        ...twoFactor.multi_fa,
        [name]: {
          ...twoFactor.multi_fa[name],
          [e.target.name]: e.target.value,
        },
      },
    });
    props.setValue({
      name: 'errors',
      key: 'multi_fa',
      value: {
        ...errors.multi_fa,
        [name]: { ...errors.multi_fa[name], [e.target.name]: '' },
      },
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };

  const handleSubmitCode = e => {
    e.preventDefault();
    props.addTwoFactorRequest();
  };

  return (
    <>
      <Modal
        open={showEmailTwoFactor || showGoogleTwoFactor}
        handleClose={handleClose}
        handleUpdate={handleSubmitCode}
        buttonLabel2={
          sendingCode ? (
            <>
              <div className="flex text-center justify-center">
                <div className="loading_wrapper">
                  <span className="font-bold mr-2 my-auto text-white">
                    Sending
                  </span>
                  <div className="dot-elastic" />{' '}
                </div>
              </div>
            </>
          ) : (
            'Continue'
          )
        }
        width="sm"
      >
        {showEmailTwoFactor && (
          <div className="border p-2 m-2">
            <Input
              id="code"
              name="code"
              subLabel="Check inbox for the code"
              label="Enter the code"
              error={errors && errors.multi_fa && errors.multi_fa.email.code}
              value={twoFactor && twoFactor.email && twoFactor.email.code}
              onChange={e => handleChange(e, 'email')}
              onKeyPress={e => e.key === 'Enter' && handleSubmitCode(e)}
            />
          </div>
        )}

        {showGoogleTwoFactor && (
          <div className="border p-2 m-2">
            <Input
              id="code"
              name="code"
              subLabel="Copy code from Google Authentication App"
              label="Enter the code"
              error={
                errors &&
                errors.multi_fa &&
                errors.multi_fa.google_authenticate.code
              }
              value={
                twoFactor &&
                twoFactor.google_authenticate &&
                twoFactor.google_authenticate.code
              }
              onChange={e => handleChange(e, 'google_authenticate')}
              onKeyPress={e => e.key === 'Enter' && handleSubmitCode(e)}
            />
          </div>
        )}
      </Modal>
      {/* <Modal
        open={showGoogleTwoFactor}
        handleClose={handleClose}
        handleUpdate={handleSubmitCode}
        width="sm"
      >
        <div className="">
          <Input
            id="code"
            name="code"
            subLabel="Check inbox for the code"
            label="Enter the code"
            error={errors.code}
            value={
              twoFactor &&
              twoFactor.google_authenticate &&
              twoFactor.google_authenticate.code
            }
            onChange={e => handleChange(e, 'google_authenticate')}
          />
        </div>
      </Modal> */}
      <div className="container mx-auto mb-10">
        <div className="mx-auto max-w-md p-5 md:p-16">
          <h1 className="font-bold text-2xl">LOGIN</h1>{' '}
          <form className="mt-4" onSubmit={handleSubmit}>
            <UsernameInput />
            <PasswordInput />
            <button
              className="btn mt-4 w-full bg-primary hover:bg-secondary"
              type="submit"
            >
              {loading ? (
                <div className="btn_loading">
                  <div />
                  <div />
                  <div />
                  <div />
                  <span className="ml-2">Login</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <Link
            className="inline-block align-baseline text-xs text-blue-700 hover:text-blue-700-darker"
            to="/signup-user"
          >
            Don't Have Account? Register
          </Link>
          <p className="text-muted text-center mt-4 mb-4 text-xs">
            OR LOGIN WITH
          </p>
          <div className="mt-5 mb-5 flex space-around">
            <FacebookLogin
              appId={FB_APP_ID}
              textButton="Facebook"
              autoLoad={false}
              fields={FB_APP_FIELDS}
              callback={loginWithFbRequest}
              onFailure={err => {
                console.log('something went wrong!', err);
              }}
              containerStyle={{
                textAlign: 'center',
                backgroundColor: '#3b5998',
                borderColor: '#3b5998',
                flex: 1,
                color: '#fff',
                cursor: 'pointer',
              }}
              buttonStyle={{
                flex: 1,
                textTransform: 'none',
                padding: '12px',
                background: 'none',
                border: 'none',
                fontSize: '13px',
              }}
              icon="fa-facebook"
            />
            <GoogleLogin
              className={`${classes.googbtn} flex jusitify-center flex-1`}
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Google"
              onSuccess={loginWithGoogleRequest}
              onFailure={err => {
                console.log('something went wrong!', err);
              }}
              cookiePolicy="single_host_origin"
              buttonStyle={{
                flex: 1,
                textTransform: 'none',
                padding: '12px',
                background: 'none',
                border: 'none',
                fontSize: '13px',
                boxShadow: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

LoginUserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginRequest: PropTypes.func.isRequired,
  loginWithFbRequest: PropTypes.func.isRequired,
  loginWithGoogleRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  emailErr: makeSelectEmailError(),
  passwordErr: makeSelectPasswordError(),
  twoFactor: makeSelectTwoFactor(),
  helperObj: makeSelectHelperObj(),
  loadingObj: makeSelectLoadingObj(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginUserPage', reducer });
const withSaga = injectSaga({ key: 'loginUserPage', saga });

const styles = {
  googbtn: {
    boxShadow: 'none!important',
    border: '1px solid gainsboro!important',
    borderLeft: 'none!important',
  },
};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginUserPage);
