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
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { createStructuredSelector } from 'reselect';

import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import { FB_APP_ID, FB_APP_FIELDS, GOOGLE_CLIENT_ID } from '../App/constants';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import {
  makeSelectLoading,
  makeSelectEmailError,
  makeSelectPasswordError,
} from './selectors';
import '../../assets/styles/loading.css';

const LoginUserPage = ({
  classes,
  loginRequest,
  loginWithFbRequest,
  loginWithGoogleRequest,
  loading,
  emailErr,
  passwordErr,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };
  return (
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
           {loading ?  <div className="btn_loading"><div></div><div></div><div></div><div></div><span className="ml-2">Login</span></div> : 'Login'}
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
  emailErr: makeSelectEmailError(),
  passwordErr: makeSelectPasswordError(),
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
