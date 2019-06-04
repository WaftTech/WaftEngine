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
import Button from '@material-ui/core/Button';

import Link from 'react-router-dom/Link';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import logo from '../../assets/img/logo.svg';

const LoginAdminPage = ({ classes, loginRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-3/5 login-l">
        <div className="waftltext px-5 text-white lg:px-32">
        <h1>Waft Engine</h1>
        <p>A Powerful Mern Engine</p>
        <ul className="fealogin mt-10">
          <li>Quick Scaffolding</li>
          <li>Instant feedback</li>
          <li>Predictable state management</li>
          <li>Next generation javascript</li>
          <li>Next generation CSS</li>
          <li>Industry-stand routing</li>
          <li>Industry-standard internationalization support</li>
          <li>Offline first</li>
          <li>Static code analysis</li>
        </ul>
        </div>
      </div>

      <div className="login-R w-full md:w-2/5 relative block">
        <div className="walfRlogin px-10 md:px-12 lg:px-16 xl:px-24 w-full"> 
          <img src={logo} alt="WaftEngine"/>
          <form className="mt-4" onSubmit={handleSubmit}>
            <UsernameInput />
            <PasswordInput />
            <button
              className="text-white py-2 px-4 rounded mt-4 w-full btn-waft"
              type="submit"
            >
              LOGIN
            </button>
          </form>
        </div>
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

const styles = {};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginAdminPage);
