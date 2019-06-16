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
    <div className="container mx-auto mb-10">
   
<h1 className="text-center my-5 p-3 mb-10 bg-grey-lighter px-5">Welcome, Please Sign In</h1>
<div className="flex flex-wrap justify-between">
  <div className="w-full md:w-1/2 px-5 md:px-16">
    <h1 className="font-light">New User</h1>
    <div className="block mt-4 bg-grey-lighter px-3 py-5 rounded" style={{height:'153px'}}>
      <p>By creating an account on our waftengine, you will be able to use our different modules presented hereby.</p>
    </div>
    <Link
          className="inline-block text-white py-2 px-4 rounded mt-8 w-full btn-waft text-center no-underline"
          to="/signup-user"
        >
         REGISTER
        </Link>
  </div>
  <div className="w-full md:w-1/2 px-5 md:px-16 mt-10 md:mt-0">
   
        <h1 className="font-light">LOGIN</h1>        <form className="mt-4" onSubmit={handleSubmit}>
          <UsernameInput />
          <PasswordInput />
          <button
            className="text-white py-2 px-4 rounded mt-4 w-full btn-waft"
            type="submit"
          >
            LOGIN
          </button>
        </form>

        {/* <Link
          className="inline-block align-baseline text-xs text-blue hover:text-blue-darker"
          to="/signup-user"
        >
          Don't Have Account? Register
        </Link> */}

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
              boxShadow : 'none',
            }}
            
           
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

const styles = {
  googbtn:{
    boxShadow : 'none!important',
    border:'1px solid gainsboro!important',
    borderLeft:'none!important',
  }
};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginUserPage);
