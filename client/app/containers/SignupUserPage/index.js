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

const SignupUserPage = ({ classes, signupRequest, signupWithFbRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    signupRequest();
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <img className={classes.logo} src={logo} alt="logo" />
        <h3>SIGNUP</h3>
        <form className={classes.form} onSubmit={handleSubmit}>
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <GenderInput />
          <br />
          <Button variant="contained" color="primary" type="submit">
            SIGNUP
          </Button>
          <br />
          <Link className={classes.smallFont} to="/login-user">
            Already a user?
          </Link>
          <br />
          <FacebookLogin
            appId="308391736756480"
            autoLoad={true}
            fields="id,email,name"
            callback={signupWithFbRequest}
            render={renderProps => (
              <button onClick={renderProps.onClick}>Continue with FB</button>
            )}
          />
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
