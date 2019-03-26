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
import Link from 'react-router-dom/Link';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Divider } from '@material-ui/core';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import styles from './styles';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import Button from '../../components/CustomButtons/Button';
import logo from '../../images/logo.png';

class LoginAdminPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loginRequest: PropTypes.func.isRequired,
    // history: PropTypes.object.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginRequest();
  };

  handleRedirect = () => {
    // this.props.history.push('/reset-password');
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.card}>
          <img className={classes.logo} src={logo} />

          <h3>LOGIN</h3>
          <form className={classes.form}>
            <UsernameInput classes={classes} />
            <PasswordInput classes={classes} />
            <br />
            <br />
            <Link className={classes.smallFont} to="/forgot-password">
              Forgot Password?
            </Link>
            <br />
            <Button color="primary" onClick={this.handleSubmit} type="submit">
              LOGIN
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

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
