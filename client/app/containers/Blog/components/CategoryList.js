import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeSelectCategory, makeSelectCategoryLoading } from '../selectors';
import * as mapDispatchToProps from '../actions';

import CategoryListingSkeleton from '../Skeleton/CategoryListing';

/* eslint-disable react/prefer-stateless-function */
class CategoryListingPage extends React.Component {
  componentDidMount() {
    this.props.category.length === 0 && this.props.loadCategoryRequest();
  }

  render() {
    const { category, loading } = this.props;
    return loading ? (
      <CategoryListingSkeleton />
    ) : (
      <>
        <h3 className="uppercase">Categories</h3>
        {category ? (
          <ul className="list-none pl-0">
            {category.map(each => (
              <li key={each._id} className="info ">
                <Link to={`/blog/category/${each.slug_url}`}>
                  <h3> {`${each.title}`}</h3>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>No Categories</div>
        )}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  loading: makeSelectCategoryLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(CategoryListingPage);
