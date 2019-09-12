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
} from '../selectors';
import * as mapDispatchToProps from '../actions';
// import Loading from '../../components/Loading';
import RenderBlogs from '../components/BlogList';
import CategoryList from '../components/CategoryList';
import Archives from '../components/Archives';

/* eslint-disable react/prefer-stateless-function */
export class BlogsByTag extends React.Component {
  static propTypes = {
    loadBlogByTagRequest: PropTypes.func.isRequired,
    blogByTag: PropTypes.object,
  };

  componentDidMount() {
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

  render() {
    const {
      blogByTag: { data, page, size, totaldata },
      loading,
      match: {
        params: { tag },
      },
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>Blog By Tag</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">
            Blogs Of {tag}
          </h1>
        </div>
        <div className="container mx-auto block md:flex p-4 mb-10">
          <div className="w-full md:w-3/4">
            <RenderBlogs
              loading={loading}
              currentBlogs={data}
              pagination={pagination}
              handlePagination={this.handlePagination}
            />
          </div>
          <div className="w-full md:w-1/4 pt-10 pl-10">
            <CategoryList />
            <Archives />
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(BlogsByTag);
