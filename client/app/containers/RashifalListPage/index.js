/**
 *
 * RashifalListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRashifalListPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class RashifalListPage extends React.Component {
  render() {
    return <div />;
  }
}

RashifalListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rashifallistpage: makeSelectRashifalListPage(),
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

const withReducer = injectReducer({ key: 'rashifalListPage', reducer });
const withSaga = injectSaga({ key: 'rashifalListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RashifalListPage);
