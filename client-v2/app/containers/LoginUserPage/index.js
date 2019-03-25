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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import Button from '../../components/CustomButtons/Button';

const LoginUserPage = ({ classes, loginRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };

  const handleRedirect = () => {
    // this.props.history.push('/reset-password');
  };

  return (
    <div className={classes.pageHeader}>
      <div className={classes.container}>
        <form className={classes.form}>
          <UsernameInput />
          <br />
          <PasswordInput />
          <div
            className={classes.redirect}
            onClick={handleRedirect}
            onKeyDown={handleRedirect}
            role="link"
            aria-hidden
          >
            <h4>Forgot Password?</h4>
          </div>
          <Button onClick={handleSubmit} type="submit">
            Get started
          </Button>
        </form>
      </div>
    </div>
  );
};

LoginUserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginUserPage', reducer });
const withSaga = injectSaga({ key: 'loginUserPage', saga });

const styles = {
  container: {
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    color: '#FFFFFF',
  },
  pageHeader: {
    minHeight: '100vh',
    height: 'auto',
    display: 'inherit',
    position: 'relative',
    margin: '0',
    padding: '0',
    border: '0',
    alignItems: 'center',
    '&:before': {
      background: 'rgba(0, 0, 0, 0.5)',
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""',
    },
    '& footer li a,& footer li a:hover,& footer li a:active': {
      color: '#FFFFFF',
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%',
    },
  },
  form: {
    margin: '0',
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
};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginUserPage);
