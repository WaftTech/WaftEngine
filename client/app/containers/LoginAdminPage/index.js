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
    <div className="flex">
      <div className="w-1/2 min-h-screen bg-grey-light  h-screen overflow-hidden">
        <img
          className="w-full"
          src="https://source.unsplash.com/collection/175083/500x900/daily/"
        />
      </div>

      <div className="w-1/2">
        <div className="max-w-5xl m-32">
          <img src={logo} alt="WaftEngine" />
          <form className="mt-4" onSubmit={handleSubmit}>
            <UsernameInput />
            <PasswordInput />
            <button
              className="bg-grey-darker hover:bg-grey-dark text-white font-bold py-2 px-4 rounded mt-4 w-full"
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
