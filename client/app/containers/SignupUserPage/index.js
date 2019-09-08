/**
 *
 * SignupUserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import withStyles from '@material-ui/core/styles/withStyles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import NameInput from './components/NameInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import { FB_APP_ID, FB_APP_FIELDS, GOOGLE_CLIENT_ID } from '../App/constants';

const SignupUserPage = ({
  classes,
  signupRequest,
  signupWithFbRequest,
  signupWithGoogleRequest,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    signupRequest();
  };

  return (
    <div className="container mx-auto mb-10">
      <div className="mx-auto max-w-md p-5 md:p-16">
        <h1 className="font-light text-4xl">SIGN UP</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <button
            className="text-white py-2 px-4 rounded mt-4 w-full bg-red-600 hover:bg-red-800 font-bold"
            type="submit"
          >
            SIGN UP
            </button>
          <Link
            className="inline-block align-baseline text-xs text-indigo-600 hover:text-indigo-600-darker"
            to="/login-user"
          >
            Already Have Account? Login
            </Link>

          <p className="text-muted text-center mt-10 mb-4 text-xs">
            OR REGISTER WITH
            </p>

          <div className="mt-5 mb-5 flex space-around">
            <FacebookLogin
              appId={FB_APP_ID}
              textButton="Facebook"
              autoLoad={false}
              fields={FB_APP_FIELDS}
              callback={signupWithFbRequest}
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
              onSuccess={signupWithGoogleRequest}
              onFailure={err => {
                console.log('something went wrong!', err);
              }}
              cookiePolicy="single_host_origin"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

SignupUserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  signupRequest: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signupUserPage', reducer });
const withSaga = injectSaga({ key: 'signupUserPage', saga });

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
)(SignupUserPage);
