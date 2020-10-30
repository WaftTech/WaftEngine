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
import RelatedBlogs from '../components/RelatedBlogsMobile';
import BlogDetailMobile from '../components/BlogDetailMobile';

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
    window.scrollTo(0, 0);
    this.props.clearOne();
    this.props.loadRecentBlogsRequest();
    this.props.loadRelatedBlogsRequest(this.props.match.params.slug_url);
    this.props.loadBlogRequest(this.props.match.params.slug_url);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0);
    if (nextProps.match.params.slug_url !== this.props.match.params.slug_url) {
      this.props.loadRelatedBlogsRequest(nextProps.match.params.slug_url);
      this.props.loadBlogRequest(nextProps.match.params.slug_url);
    }
  }

  render() {
    const {
      blog,
      loading,
      match: { url },
    } = this.props;
    return (
      <>
        <Helmet>
          <title>{blog && blog.title}</title>
        </Helmet>
        <div className="w-full flex-1 px-5">
          <BlogDetailMobile blog={blog} loading={loading} />
          <RelatedBlogs />
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
