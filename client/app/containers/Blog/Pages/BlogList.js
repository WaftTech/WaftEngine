import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  makeSelectBlogList,
  makeSelectLoading,
  makeSelectBlogByAuthor,
  makeSelectBlogByTag,
  makeSelectQuery,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
// import Loading from '../../components/Loading';
import RenderBlogs from '../components/BlogList';
import CategoryList from '../components/CategoryList';
import Archives from '../components/Archives';

/* eslint-disable react/prefer-stateless-function */
export class BlogListPage extends React.Component {
  static propTypes = {
    loadBlogListRequest: PropTypes.func.isRequired,
    loadBlogByAuthorRequest: PropTypes.func.isRequired,
    loadBlogByTagRequest: PropTypes.func.isRequired,
    blogList: PropTypes.object,
    blogByTag: PropTypes.object,
    blogByAuthor: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.match.params.author) {
      this.props.loadBlogByAuthorRequest(this.props.match.params.author);
    }
    if (this.props.match.params.tag) {
      this.props.loadBlogByTagRequest(this.props.match.params.tag);
    }
    this.props.loadBlogListRequest();
  }

  handlePagination = paging => {
    this.props.loadBlogListRequest(paging);
  };

  render() {
    const {
      blogList: { data, page, size, totaldata },
      loading,
      blogByTag,
      blogByAuthor,
    } = this.props;
    // const require = this.props.match.params;
    const pagination = { page, size, totaldata };
    // const pagination1 = {};
    // pagination1.page = blogByTag.length > 0 && blogByTag.page;
    // pagination1.size = blogByTag.length > 0 && blogByTag.size;
    // pagination1.totaldata = blogByTag.length > 0 && blogByTag.totaldata;
    // const pagination2 = {};
    // pagination2.page = blogByTag.length > 0 && blogByTag.page;
    // pagination2.size = blogByTag.length > 0 && blogByTag.size;
    // pagination2.totaldata = blogByTag.length > 0 && blogByTag.totaldata;

    return (
      <React.Fragment>
        <Helmet>
          <title>Blog List</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-grey-darkest">Blog</h1>
        </div>
        <div className="container mx-auto block md:block p-4">
          <div className="w-full md:w-3/4">
            <RenderBlogs
              loading={loading}
              currentBlogs={
                // require && require.author
                //   ? blogByAuthor.data
                //   : require && require.tag
                //   ? blogByTag.data
                //   :
                data
              }
              pagination={
                // require && require.author
                //   ? pagination1
                //   : require && require.tag
                //   ? pagination2
                //   :
                pagination
              }
              handlePagination={this.handlePagination}
            />
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

const mapStateToProps = createStructuredSelector({
  blogList: makeSelectBlogList(),
  blogByAuthor: makeSelectBlogByAuthor(),
  blogByTag: makeSelectBlogByTag(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(BlogListPage);
