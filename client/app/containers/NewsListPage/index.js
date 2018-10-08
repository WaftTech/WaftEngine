/**
 *
 * NewsListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNewsListPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class NewsListPage extends React.Component {
  render() {
    return <div />;
  }
}

NewsListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newslistpage: makeSelectNewsListPage(),
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

const withReducer = injectReducer({ key: 'newsListPage', reducer });
const withSaga = injectSaga({ key: 'newsListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsListPage);
