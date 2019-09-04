import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCategory, makeSelectLoading } from './selectors';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';

import CategoryListingSkeleton from '../../components/Skeleton/CategoryListing';

/* eslint-disable react/prefer-stateless-function */
class CategoryListingPage extends React.Component {
  componentDidMount() {
    this.props.loadCategoryRequest();
  }

  render() {
    const { category, loading } = this.props;
    return loading ? (
      <CategoryListingSkeleton />
    ) : (
      <>
        {category &&
          category.map(each => (
            <li key={each._id} className="info ">
              <Link to={`/blog-category/${each.slug_url}`}>
                <h3> {`${each.title}`}</h3>
              </Link>
            </li>
          ))}
      </>
    );
  }
}

const withReducer = injectReducer({ key: 'categoryListingPage', reducer });
const withSaga = injectSaga({ key: 'categoryListingPage', saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CategoryListingPage);
