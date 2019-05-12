/**
 *
 * SignupUserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Link from 'react-router-dom/Link';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import NameInput from './components/NameInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import GenderInput from './components/GenderInput';
import logo from '../../images/logo.png';
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
    <div className="container mx-auto pl-2 pr-2 mt-24 mb-24">
      <div className=" max-w-xs">
        <h1 className="font-light">SIGN UP</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <NameInput />
          <EmailInput />
          <PasswordInput />
          {/* <GenderInput /> */}
          <button
            className="bg-grey-darker hover:bg-grey-dark text-white font-bold py-2 px-4 rounded mt-4 mb-2 w-full"
            type="submit"
          >
            SIGN UP
          </button>
          <Link
            className="inline-block align-baseline text-xs text-blue hover:text-blue-darker"
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
              className="flex jusitify-center flex-1 shadow-none"
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Google"
              onSuccess={signupWithGoogleRequest}
              onFailure={err => {
                console.log('something went wrong!', err);
              }}
              cookiePolicy="single_host_origin"
              containerStyle={{ boxShadow: 'none', border: '1px solid #ccc' }}
              buttonStyle={{ boxShadow: 'none', border: '1px solid #ccc' }}
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
  container: {
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    background: '#EFEFF4',
    minHeight: '100vh',
  },
  card: {
    background: '#fff',
    padding: 40,
    width: 350,
    margin: '0 auto',
  },
  smallFont: {
    fontSize: 12,
    textDecoration: 'none',
  },
  cardHeader: {
    width: 'auto',
    textAlign: 'center',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '-40px',
    padding: '20px 0',
    marginBottom: '15px',
  },
  socialIcons: {
    maxWidth: '24px',
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
  },
  divider: {
    marginTop: '30px',
    marginBottom: '0px',
    textAlign: 'center',
  },
  cardFooter: {
    paddingTop: '0rem',
    border: '0',
    borderRadius: '6px',
    justifyContent: 'center !important',
  },
  socialLine: {
    marginTop: '1rem',
    textAlign: 'center',
    padding: '0',
  },
  inputIconsColor: {
    color: '#495057',
  },
  logo: { maxWidth: '100%' },
};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(SignupUserPage);
