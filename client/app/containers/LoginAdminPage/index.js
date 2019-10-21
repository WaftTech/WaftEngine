/**
 *
 * LoginAdminPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectLoading,
  makeSelectEmailError,
  makeSelectPasswordError,
} from './selectors';
import * as mapDispatchToProps from './actions';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import logo from '../../assets/img/logo.svg';

const LoginAdminPage = ({
  classes,
  loginRequest,
  loading,
  emailError,
  passwordError,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-3/5 bg-red-100 items-center">
        <div className="px-5 text-black lg:px-32">
          <h1 className="font-bold text-4xl">WaftEngine</h1>
          <p>A Powerful Mern Engine</p>
          <ul className="mt-10">
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

      <div className="w-full md:w-2/5 relative block">
        <div
          className="absolute top-1/2 px-10 md:px-12 lg:px-16 xl:px-24 w-full"
          style={{ transform: 'translateY(-50%)' }}
        >
          <img src={logo} alt="WaftEngine" className="w-2/3" />
          <form className="mt-4" onSubmit={handleSubmit}>
            <UsernameInput />
            <PasswordInput />
            <button
              className="text-white py-2 px-4 rounded mt-4 w-full bg-primary font-bold"
              type="submit"
            >
              {loading ? '...' : 'LOGIN'}
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
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  emailError: makeSelectEmailError(),
  passwordError: makeSelectPasswordError(),
});

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
