import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  makeSelectLoading,
  makeSelectBlogByTag,
  makeSelectQuery,
  makeSelectLoadingMoreBlogOfCat,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import RenderBlogs from '../components/BlogList';
import RecentBlogs from '../components/RecentBlogs';
/* eslint-disable react/prefer-stateless-function */
export class BlogsByTag extends React.Component {
  static propTypes = {
    loadBlogByTagRequest: PropTypes.func.isRequired,
    blogByTag: PropTypes.object,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadRecentBlogsRequest();

    if (this.props.match.params.tag) {
      this.props.loadBlogByTagRequest({
        key: this.props.match.params.tag,
        value: '',
      });
    }
  }

  handlePagination = paging => {
    this.props.loadBlogListRequest({
      key: this.props.match.params.tag,
      value: paging,
    });
  };

  handleLoadMore = paging => {
    this.props.loadMoreBlogByTagRequest({
      key: this.props.match.params.tag,
      value: paging,
    });
  };

  render() {
    const {
      blogByTag: { data, page, size, totaldata },
      loading,
      match: {
        params: { tag },
      },
      loading_more,
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>Blogs By Tag</title>
        </Helmet>
        <div className="container mx-auto pt-10">
          <h1 className="pb-5 mb-0 border-b border-gray-300 text-black text-4xl font-light font-mukta">
            {tag}
          </h1>
        </div>
        <div className="container mx-auto py-10">
          <div className="lg:flex flex-wrap">
            <div className="lg:w-3/4 lg:pr-10">
              <RenderBlogs
                loading={loading}
                currentBlogs={data}
                pagination={pagination}
                handlePagination={this.handlePagination}
                loading_more={loading_more}
                handleLoadMore={this.handleLoadMore}
              />
            </div>
            <div className="lg:w-1/4">
              <RecentBlogs />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  blogByTag: makeSelectBlogByTag(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  loading_more: makeSelectLoadingMoreBlogOfCat(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(BlogsByTag);
