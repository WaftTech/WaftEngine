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

const LoginUserPage = ({ classes, loginRequest, loginWithFbRequest, loginWithGoogleRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <img className={classes.logo} src={logo} alt="logo" />
        <h3>LOGIN</h3>
        <form className={classes.form} onSubmit={handleSubmit}>
          <UsernameInput />
          <PasswordInput />
          <br />
          <Button variant="contained" color="primary" type="submit">
            LOGIN
          </Button>
        </form>
        <br />
        <br />
        <Link className={classes.smallFont} to="/forgot-password-user">
          Forgot Password?
        </Link>
        <Link className={classes.smallFont} to="/signup-user">
          Not a user?
        </Link>
        <FacebookLogin
          appId={FB_APP_ID}
          autoLoad={false}
          fields={FB_APP_FIELDS}
          callback={loginWithFbRequest}
        />
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={loginWithGoogleRequest}
          onFailure={(err) => {
            console.log('something went wrong!', err)
          }}
          cookiePolicy={'single_host_origin'}
        />
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
