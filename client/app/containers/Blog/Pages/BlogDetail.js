/**
 *
 * BlogPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import * as mapDispatchToProps from '../actions';
import { makeSelectBlog, makeSelectLoading } from '../selectors';
import { makeSelectUser } from '../../App/selectors';
import RecentBlogs from '../components/RecentBlogs';
import RelatedBlogs from '../components/RelatedBlogs';
import Archives from '../components/Archives';
import BlogDetail from '../components/BlogDetail';

export class BlogPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadBlogRequest: PropTypes.func.isRequired,
    loadRecentBlogsRequest: PropTypes.func.isRequired,
    blog: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug_url: PropTypes.string,
      }),
    }).isRequired,
  };

  componentDidMount() {
    this.props.clearOne();
    this.props.loadRecentBlogsRequest();
    this.props.loadRelatedBlogsRequest(this.props.match.params.slug_url);
    this.props.loadBlogRequest(this.props.match.params.slug_url);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.slug_url !== this.props.match.params.slug_url) {
      this.props.loadRelatedBlogsRequest(nextProps.match.params.slug_url);
      this.props.loadBlogRequest(nextProps.match.params.slug_url);
    }
  }

  render() {
    const { blog, loading } = this.props;
    return (
      <>
        <Helmet>
          <title>{blog.title}</title>
        </Helmet>
        <div className="container mx-auto my-10 px-5">
          <div className="flex flex-wrap w-full lg:-mx-5">
            <BlogDetail blog={blog} loading={loading} />
            <div className="w-full mt-4 lg:mt-0 lg:w-1/4 p-3">
              <RecentBlogs />
              <RelatedBlogs />
              <Archives />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
  loading: makeSelectLoading(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(BlogPage);
