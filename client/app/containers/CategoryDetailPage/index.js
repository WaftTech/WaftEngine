import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { IMAGE_BASE } from 'containers/App/constants';
import * as mapDispatchToProps from './actions';
import { makeSelectCategory, makeSelectBlog } from './selectors';
import reducer from './reducer';
import saga from './saga';

class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { id },
    } = this.props.match;
    this.props.loadBlogRequest(id);
  }

  render() {
    const { blog } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{blog && blog[0] ? (blog[0].category ? blog[0].category.title : '') : 'Blog Not Found'}</title>
        </Helmet>
        <div className="container mx-auto my-10">
        <h2 className="mb-5">
                <span>
                  Blogs related to{' '}
                  {blog && blog[0]  && blog[0].category ? blog[0].category.title : ''}
                </span>
              </h2>
     
  <div className="flex flex-wrap w-full md:w-3/4 -mx-5">

          
              {blog && blog.map(each => {
                const {
                  image,
                  title,
                  slug_url,
                  description,
                  added_at,
                  category,
                  tags,
                } = each;

                return (
                  <div
                    className="blog_sec w-1/2 px-5 mb-5"
                    key={slug_url}
                  >
                    <div className="w-full h-64 object-cover overflow-hidden">
                      <Link to={`/blog/${slug_url}`}>
                        <div className="img blog-img h-full">
                          <img
                            src={image && `${IMAGE_BASE}${image.path}`}
                            className="rounded"
                            alt={`${title}`}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="">

                    <Link
                        className="text-black no-underline capitalize mb-2 bold block mt-4"
                        to={`/blog/${slug_url}`}
                      >
                        <h2>{title}</h2>
                      </Link>
                      <div className="border-t-1 flex flex-wrap font-bold">
                        <Link
                          className="mr-2 text-black hover:text-waftprimary leading-normal text-base no-underline"
                          to={`/blog-category/${category ? category._id : ''}`}
                        >
                          <div className="mr-2">
                            <span className="text-grey-dark">By</span>  {category ? category.title : ''}
                            {' '}
                          </div>
                        </Link>
                        <p className="text-grey-dark leading-normal text-base mr-2">
                          {moment(added_at).format('MMM Do YY')}
                          
                        </p>
                        <Link
                          className="text-grey-darkleading-normal text-base no-underline"
                          to={`/blog/${each.slug_url}`}
                        >
                          <div> {tags && tags.join(', ') || ''} </div>
                        </Link>{' '}
                      </div>
                   

                      <Link
                        className="text-grey-darker text-base no-underline"
                        to={`/blog/${slug_url}`}
                      >
                        <div
                          className="leading-normal text-base text-left"
                          style={{ height: '95px', overflow: 'hidden' }}
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </Link>

                      <div className="flex justify-end readmore mt-2">
                        {' '}
                        <Link
                          className="no-underline hover:text-waftprimary"
                          to={`/blog/${slug_url}`}
                        >
                          Continue Reading <span className="rdanim">>>></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            
          
        

        {/* {showModal && <OfferDetailPage />} */}
      </div>
      </div>
      </React.Fragment>
    );
    
  }
}


CategoryDetailPage.propTypes = {
  loadCategoryRequest: PropTypes.func.isRequired,
  loadBlogRequest: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'categoryDetailPage', reducer });
const withSaga = injectSaga({ key: 'categoryDetailPage', saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  blog: makeSelectBlog(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CategoryDetailPage);
