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
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <form className={classes.form}>
            <input className="form-control" />
            <UsernameInput classes={classes} />
            <PasswordInput classes={classes} />
            <div className={classes.redirect}>
              <h4>Forgot Password?</h4>
            </div>
            <button onClick={this.handleSubmit} type="submit">
              Get started
            </button>
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
