/**
 *
 * UserManagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserManagePage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class UserManagePage extends React.Component {
  render() {
    return <div />;
  }
}

UserManagePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  usermanagepage: makeSelectUserManagePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userManagePage', reducer });
const withSaga = injectSaga({ key: 'userManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserManagePage);
