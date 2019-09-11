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
} from '../selectors';
import CategoryList from '../components/CategoryList';
import RenderBlogs from '../components/BlogList';
import Archives from '../components/Archives';

class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { slug_url },
    } = this.props.match;
    this.props.loadBlogOfCatRequest({ key: slug_url, value: '' });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0)
    if (this.props.match.params.slug_url !== nextProps.match.params.slug_url) {
      this.props.loadBlogOfCatRequest({
        key: nextProps.match.params.slug_url,
        value: '',
      });
    }
  }

  componentWillUnmount() {
    this.props.clearBlog();

  }

  handlePagination = paging => {
    this.props.loadBlogOfCatRequest({
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
    } = this.props;
    const pagination = { page, size, totaldata };
    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">
            {!loading && `Blogs related to ${title}`}
          </h1>
        </div>

        <div className="container mx-auto flex">
          <div className="w-3/4">
            {data && data.length > 0 && (
              <RenderBlogs
                loading={loading}
                currentBlogs={data}
                pagination={pagination}
                handlePagination={this.handlePagination}
              />
            )}
          </div>
          <div className="w-1/4 pt-10">
            <CategoryList />
            <Archives />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CategoryDetailPage.propTypes = {
  loadBlogRequest: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlogOfCat(),
  loading: makeSelectLoadingBlogOfCat(),
  title: makeSelectCategoryTitle(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(CategoryDetailPage);
