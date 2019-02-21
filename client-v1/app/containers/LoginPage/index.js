/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as actions from './actions';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';

const LoginPage = () => {
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <form>
        <UsernameInput />
        <PasswordInput />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  defaultAction: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  defaultAction: () => dispatch(actions.defaultAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
