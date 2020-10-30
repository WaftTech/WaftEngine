import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import * as mapDispatchToProps from '../actions';
import {
  makeSelectBlogOfCat,
  makeSelectLoadingBlogOfCat,
  makeSelectCategoryTitle,
  makeSelectLoadingMoreBlogOfCat,
} from '../selectors';
import RenderBlogs from '../components/BlogList';
import RecentBlogs from '../components/RecentBlogs';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';

class CategoryDetailPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const {
      params: { slug_url },
    } = this.props.match;
    this.props.loadBlogOfCatRequest({ key: slug_url, value: '' });
    this.props.loadRecentBlogsRequest();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug_url !== nextProps.match.params.slug_url) {
      this.props.loadBlogOfCatRequest({
        key: nextProps.match.params.slug_url,
        value: '',
      });
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    // window.scrollTo(0, 0);
    this.props.clearBlog();
  }

  handlePagination = paging => {
    this.props.loadBlogOfCatRequest({
      key: this.props.match.params.slug_url,
      value: paging,
    });
  };

  handleLoadMore = paging => {
    this.props.loadMoreBlogOfCatRequest({
      key: this.props.match.params.slug_url,
      value: paging,
    });
  };

  render() {
    const {
      blog: { data, page, size, totaldata },
      loading,
      title,
      match: {
        params: { slug_url },
      },
      loading_more,
    } = this.props;
    const pagination = { page, size, totaldata };
    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <div className="relative py-6 bg-white shadow">
          <div className="container mx-auto">
            <h1 className="text-primary text-4xl font-bold">
              {!loading && `${title}`}
            </h1>
          </div>
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

const withSaga = injectSaga({ key: 'blogPage', saga });
const withReducer = injectReducer({ key: 'blogPage', reducer });

CategoryDetailPage.propTypes = {
  loadBlogRequest: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlogOfCat(),
  loading: makeSelectLoadingBlogOfCat(),
  title: makeSelectCategoryTitle(),
  loading_more: makeSelectLoadingMoreBlogOfCat(),
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
