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
    <div className="container mx-auto pl-2 pr-2 mt-24 mb-24">
      <div className="max-w-xs">
        <h1 className="font-light">LOGIN</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <UsernameInput />
          <PasswordInput />
          <button
            className="bg-grey-darker hover:bg-grey-dark text-white font-bold py-2 px-4 rounded mt-4 block"
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
            containerStyle={{ boxShadow: 'none', border: '1px solid #ccc' }}
            buttonStyle={{ boxShadow: 'none', border: '1px solid #ccc' }}
          />
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
