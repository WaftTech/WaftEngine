/**
 *
 * ArticleListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectArticleListPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ArticleListPage extends React.Component {
  render() {
    return <div />;
  }
}

ArticleListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  articlelistpage: makeSelectArticleListPage(),
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

const withReducer = injectReducer({ key: 'articleListPage', reducer });
const withSaga = injectSaga({ key: 'articleListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ArticleListPage);
