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
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import RenderBlogs from '../components/BlogList';
import CategoryList from '../components/CategoryList';
import Archives from '../components/Archives';

/* eslint-disable react/prefer-stateless-function */
export class BlogByAuthor extends React.Component {
  static propTypes = {
    loadBlogByAuthorRequest: PropTypes.func.isRequired,
    blogByAuthor: PropTypes.object.isRequired,
  };

  componentDidMount() {
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

  render() {
    const {
      blogByAuthor: { data, page, size, totaldata },
      loading,
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>Blogs By Author</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">
            {data &&
              data.length > 0 &&
              data[0].author &&
              `Blogs By ${data[0].author.name}`}
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
  blogByAuthor: makeSelectBlogByAuthor(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(BlogByAuthor);
