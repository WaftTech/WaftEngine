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
import Loading from '../../components/loading';

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
          <div className="container mx-auto">
            <div className="mt-10">
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
                    className="blog_sec flex flex-wrap border-b py-5"
                    key={slug_url}
                  >
                    <div className="md:w-2/5 w-full">
                      <Link to={`/blog/${slug_url}`}>
                        <div className="img blog-img">
                          <img
                            src={image && `${IMAGE_BASE}${image.path}`}
                            className="rounded"
                            alt={`${title}`}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="md:w-3/5 w-full md:pl-10">
                      <div className="border-t-1 flex flex-wrap font-bold">
                        <Link
                          className="ml-1 text-black leading-normal text-base no-underline"
                          to={`/blog-category/${category ? category._id : ''}`}
                        >
                          <div className="mr-1">
                            By : {category ? category.title : ''}
                            <span> / </span>{' '}
                          </div>
                        </Link>
                        <p className="text-black leading-normal text-base mr-1">
                          {moment(added_at).format('MMM Do YY')}
                          <span> / </span>
                        </p>
                        <Link
                          className="text-black leading-normal text-base no-underline"
                          to={`/blog/${each.slug_url}`}
                        >
                          <div> {tags.join(', ') || ''} </div>
                        </Link>{' '}
                      </div>
                      <Link
                        className="text-black no-underline capitalize mb-2 bold block"
                        to={`/blog/${slug_url}`}
                      >
                        <h2>{title}</h2>
                      </Link>

                      <Link
                        className="text-grey-darker text-base no-underline"
                        to={`/blog/${slug_url}`}
                      >
                        <div
                          className="leading-normal text-base text-left"
                          style={{ height: '148px', overflow: 'hidden' }}
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </Link>

                      <div className="block readmore mt-5">
                        {' '}
                        <Link
                          className="no-underline px-6 py-2 border rounded text-black hover:text-primary leading-normal text-base"
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
