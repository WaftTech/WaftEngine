/**
 *
 * SignupUserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

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

const SignupUserPage = ({ classes, signupRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    signupRequest();
  };

  const handleRedirect = () => {
    // this.props.history.push('/reset-password');
  };

  return (
    <div className={classes.pageHeader}>
      <div className={classes.container}>
        <form className={classes.form}>
          <NameInput />
          <br />
          <EmailInput />
          <br />
          <PasswordInput />
          <br />
          <GenderInput />
          <div
            className={classes.redirect}
            onClick={handleRedirect}
            onKeyDown={handleRedirect}
            role="link"
            aria-hidden
          >
            <h4>already a User?</h4>
          </div>
          <Button onClick={handleSubmit} type="submit">
            Get started
          </Button>
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

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  pageHeader: {},
  container: {},
  form: {},
  redirect: {},
});

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(SignupUserPage);
