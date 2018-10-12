/**
 *
 * CategoryDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadCategoryRequest } from './actions';
import { makeSelectCategory } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { id },
    } = this.props.match;
    this.props.loadCategory(id);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>CategoryDetailPage</title>
          <meta
            name="description"
            content="Description of CategoryDetailPage"
          />
        </Helmet>
        Search bar appears
      </div>
    );
  }
}

CategoryDetailPage.propTypes = {
  loadCategory: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'categoryDetailPage', reducer });
const withSaga = injectSaga({ key: 'categoryDetailPage', saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
});

const mapDispatchToProps = dispatch => ({
  loadCategory: id => dispatch(loadCategoryRequest(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(CategoryDetailPage);
