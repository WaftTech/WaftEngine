/**
 *
 * RoleManagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRoleManagePage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class RoleManagePage extends React.Component {
  render() {
    return <div />;
  }
}

RoleManagePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rolemanagepage: makeSelectRoleManagePage(),
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

const withReducer = injectReducer({ key: 'roleManagePage', reducer });
const withSaga = injectSaga({ key: 'roleManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RoleManagePage);
