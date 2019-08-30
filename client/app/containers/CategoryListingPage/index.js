import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCategory, makeSelectBlogs } from './selectors';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
class CategoryListingPage extends React.Component {
  componentDidMount() {
    this.props.loadCategoryRequest();
    this.props.loadBlogsRequest();
  }

  render() {
    const { category, blogs } = this.props;
    return (
      <React.Fragment>
        {category.map(each => {
          const { title } = each;
          let show = false;
          blogs.length > 0 &&
            blogs.map(blog => {
              blog.category.map(el => {
                if (el._id === each._id) show = true;
              });
            });
          return show ? (

            <div>
              <li key={each._id} className="border-b border-dotted border-grey">
                <Link className="block py-3 no-underline text-grey-dark hover:text-black" to={`/blog-category/${each._id}`}>
                  {`${title}`}
                </Link>
              </li>
            </div>
          ) : null;
        })}
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'categoryListingPage', reducer });
const withSaga = injectSaga({ key: 'categoryListingPage', saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  blogs: makeSelectBlogs(),
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
