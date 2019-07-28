import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import Helmet from 'react-helmet';

import { IMAGE_BASE } from 'containers/App/constants';
import defaultImage from 'assets/img/placeholder.jpg';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectBlogList, makeSelectLoading } from './selectors';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import Loading from '../../components/Loading';

/* eslint-disable react/prefer-stateless-function */
export class BlogListPage extends React.Component {
  static propTypes = {
    loadBlogListRequest: PropTypes.func.isRequired,
    blogList: PropTypes.array,
  };

  componentDidMount() {
    this.props.loadBlogListRequest();
  }

  render() {
    const { blogList, loading } = this.props;

    return loading && loading == true ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>Blog List</title>
        </Helmet>
        <div>
          <div className="banner relative">
            <img src="https://www.waftengine.org/public/media/C97CE0A29A7E4B4-banner.jpg" />
            <h1 className="container mx-auto my-auto absolute inset-x-0 bottom-0 text-waftprimary waft-title">
              Blogs
            </h1>
          </div>
          <div className="container mx-auto my-10 px-5">
            <div className="flex flex-wrap w-full md:w-3/4 md:-mx-5">
              {blogList.map(each => {
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
                    className="blog_sec w-full md:w-1/2 md:px-5 mb-5"
                    key={slug_url}
                  >
                    <div className="w-full h-48 md:h-64 object-cover overflow-hidden">
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
                          <div> {tags.join(', ') || ''} </div>
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'blogList', reducer });
const withSaga = injectSaga({ key: 'blogList', saga });

const mapStateToProps = createStructuredSelector({
  blogList: makeSelectBlogList(),
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
)(BlogListPage);
