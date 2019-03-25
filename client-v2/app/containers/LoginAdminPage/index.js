/**
 *
 * LoginAdminPage
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

import styles from './styles';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import Button from '../../components/CustomButtons/Button';

const LoginAdminPage = ({ classes, loginRequest }) => {
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
          <UsernameInput classes={classes} />
          <br />
          <PasswordInput classes={classes} />
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

LoginAdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginAdminPage', reducer });
const withSaga = injectSaga({ key: 'loginAdminPage', saga });
const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginAdminPage);
