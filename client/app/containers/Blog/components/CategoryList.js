import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeSelectCategory, makeSelectCategoryLoading } from '../selectors';
import * as mapDispatchToProps from '../actions';
import ArchiveSkeleton from '../Skeleton/Archive';

/* eslint-disable react/prefer-stateless-function */
class CategoryListingPage extends React.Component {
  componentDidMount() {
    this.props.category.length === 0 && this.props.loadCategoryRequest();
  }

  render() {
    const { category, loading } = this.props;
    return loading ? (
      <ArchiveSkeleton />
    ) : (
        <>
          <h3 className="font-medium text-xl uppercase">Categories</h3>
          {category ? (
            <div className="pt-4">
              {category.map(each => (
                <div key={each._id} className="border-b border-dotted border-gray-600">
                  <Link className="block py-3 no-underline text-gray-700 hover:text-black" to={`/blog/category/${each.slug_url}`}>
                    {each.title}
                  </Link>
                </div>
              ))}
            </div>
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
