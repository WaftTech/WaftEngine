/**
 *
 * LoginUserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import Link from 'react-router-dom/Link';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import logo from '../../images/logo.png';
import { FB_APP_ID, FB_APP_FIELDS, GOOGLE_CLIENT_ID } from '../App/constants';

const LoginUserPage = ({
  classes,
  loginRequest,
  loginWithFbRequest,
  loginWithGoogleRequest,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <div className="flex h-screen">
    <div className="hidden md:block md:w-3/5 login-l">
      <div className="waftltext px-5 text-white lg:px-32">
      <h1>Waft Engine</h1>
      <p>A Powerful Mern Engine</p>
      <ul className="fealogin mt-10">
        <li>Quick Scaffolding</li>
        <li>Instant feedback</li>
        <li>Predictable state management</li>
        <li>Next generation javascript</li>
        <li>Next generation CSS</li>
        <li>Industry-stand routing</li>
        <li>Industry-standard internationalization support</li>
        <li>Offline first</li>
        <li>Static code analysis</li>
      </ul>
      </div>
    </div>

    <div className="login-R w-full md:w-2/5 relative block">
      <div className="walfRlogin px-10 md:px-12 lg:px-16 xl:px-24 w-full"> 
        <h1 className="font-light">LOGIN</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <UsernameInput />
          <PasswordInput />
          <button
            className="text-white py-2 px-4 rounded mt-4 w-full btn-waft"
            type="submit"
          >
            LOGIN
          </button>
        </form>

        <Link
          className="inline-block align-baseline text-xs text-blue hover:text-blue-darker"
          to="/signup-user"
        >
          Don't Have Account? Register
        </Link>

        <p className="text-muted text-center mt-10 mb-4 text-xs">
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
            className="flex jusitify-center flex-1 shadow-none"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Google"
            onSuccess={loginWithGoogleRequest}
            onFailure={err => {
              console.log('something went wrong!', err);
            }}
            cookiePolicy="single_host_origin"
            containerStyle={{ boxShadow: 'none', border: 'none' }}
            buttonStyle={{ boxShadow: 'none', border: 'none' }}
          />
        </div>
        </div>
      </div>
    </div>
     
  );
};

LoginUserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginRequest: PropTypes.func.isRequired,
  loginWithFbRequest: PropTypes.func.isRequired,
  loginWithGoogleRequest: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginUserPage', reducer });
const withSaga = injectSaga({ key: 'loginUserPage', saga });

const styles = {};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginUserPage);
