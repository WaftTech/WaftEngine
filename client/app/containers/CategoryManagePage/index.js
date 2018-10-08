/**
 *
 * CategoryManagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCategoryManagePage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class CategoryManagePage extends React.Component {
  render() {
    return <div />;
  }
}

CategoryManagePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  categorymanagepage: makeSelectCategoryManagePage(),
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

const withReducer = injectReducer({ key: 'categoryManagePage', reducer });
const withSaga = injectSaga({ key: 'categoryManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CategoryManagePage);
