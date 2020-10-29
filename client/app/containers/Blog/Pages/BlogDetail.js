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
import {
  makeSelectBlog,
  makeSelectLoading,
  makeSelectMessage,
} from '../selectors';
import { makeSelectComment } from '../../Comments/selectors';
import { makeSelectUser } from '../../App/selectors';
import RelatedBlogs from '../components/RelatedBlogs';
import Archives from '../components/Archives';
import BlogDetail from '../components/BlogDetail';
import StaticContentDiv from '../../../components/StaticContentDiv';
import CategoryElement from '../../../components/CategoryElement';
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
      message,
      comments,
    } = this.props;

    return (
      <>
        <Helmet>
          <title>{blog && blog.title}</title>
        </Helmet>
        <div className="container mx-auto py-10 md:pt-16">
          <BlogDetail
            blog={blog}
            loading={loading}
            message={message}
            comments={comments}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
  loading: makeSelectLoading(),
  user: makeSelectUser(),
  message: makeSelectMessage(),
  comments: makeSelectComment(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(BlogPage);
