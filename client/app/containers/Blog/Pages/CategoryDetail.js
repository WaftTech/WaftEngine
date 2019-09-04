import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { IMAGE_BASE } from 'containers/App/constants';
import * as mapDispatchToProps from '../actions';
import {
  makeSelectBlogOfCat,
  makeSelectLoadingBlogOfCat,
  makeSelectCategoryTitle,
} from '../selectors';
import Loading from '../../../components/Loading';
import CategoryList from '../components/CategoryList';
import RenderBlogs from '../components/BlogList';
import Archives from '../components/Archives';

class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { slug_url },
    } = this.props.match;
    this.props.loadBlogOfCatRequest(slug_url);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug_url !== nextProps.match.params.slug_url) {
      this.props.loadBlogOfCatRequest(nextProps.match.params.slug_url);
    }
  }

  componentWillUnmount() {
    this.props.clearBlog();
  }

  render() {
    const {
      blog,
      loading,
      title,
      match: {
        params: { slug_url },
      },
    } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="banner relative">
          <img src="https://www.waftengine.org/public/media/C97CE0A29A7E4B4-banner.jpg" />
          <h1 className="container mx-auto my-auto absolute inset-x-0 bottom-0 text-waftprimary waft-title">
            {!loading && `Blogs related to ${title}`}
          </h1>
        </div>

        <div className="container mx-auto flex">
          <div className="w-3/4">
            <RenderBlogs loading={loading} currentBlogs={blog} />
          </div>
          <div className="w-1/4 pt-10">
            <CategoryList />
            <br />
            <Archives />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CategoryDetailPage.propTypes = {
  loadBlogRequest: PropTypes.func.isRequired,
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
