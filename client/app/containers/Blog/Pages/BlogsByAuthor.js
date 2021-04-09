import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  makeSelectLoading,
  makeSelectBlogByAuthor,
  makeSelectQuery,
  makeSelectLoadingMoreBlogOfCat,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import RenderBlogs from '../components/BlogList';
import RecentBlogs from '../components/RecentBlogs';

/* eslint-disable react/prefer-stateless-function */
export class BlogByAuthor extends React.Component {
  static propTypes = {
    loadBlogByAuthorRequest: PropTypes.func.isRequired,
    blogByAuthor: PropTypes.object.isRequired,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadRecentBlogsRequest();

    if (this.props.match.params.author) {
      this.props.loadBlogByAuthorRequest({
        key: this.props.match.params.author,
        value: '',
      });
    }
  }

  handlePagination = paging => {
    this.props.loadBlogByAuthorRequest({
      key: this.props.match.params.author,
      value: paging,
    });
  };

  handleLoadMore = paging => {
    this.props.loadMoreBlogByAuthorRequest({
      key: this.props.match.params.author,
      value: paging,
    });
  };

  render() {
    const {
      blogByAuthor: { data, page, size, totaldata },
      loading,
      loading_more,
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>Blogs By Author</title>
        </Helmet>
        <div className="container mx-auto pt-10">
          <h1 className="pb-5 mb-0 border-b border-gray-300 text-black text-4xl font-light font-mukta">
            {data &&
              data.length > 0 &&
              data[0].author &&
              `Blogs By ${data[0].author[0].name}`}
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
  blogByAuthor: makeSelectBlogByAuthor(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  loading_more: makeSelectLoadingMoreBlogOfCat(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(BlogByAuthor);
