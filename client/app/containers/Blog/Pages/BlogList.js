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

  handleClick = name => e => {
    e.persist();
    // this.props.setQueryValue({ key: name, value: Number(e.target.id) });
    // this.props.loadBlogListRequest(this.props.query);
    this.props.setPagesValue({ key: name, value: Number(e.target.id) });
  };

  handleBlogsPerPage = name => e => {
    e.persist();
    // this.props.setQueryValue({ key: name, value: Number(e.target.value) });
    this.props.setSizeValue(e.target.value);
    // this.props.loadBlogListRequest(this.props.query);
  };

  handleBackPage = e => {
    e.persist();
    const nextPage = this.props.blogList.page;
    const prevPage = nextPage - 1;
    this.props.setPagesValue({ key: 'page', value: prevPage });
  };

  handleNextPage = e => {
    e.persist();
    const prevPage = this.props.blogList.page;
    const nextPage = prevPage + 1;
    this.props.setPagesValue({ key: 'page', value: nextPage });
  };

  render() {
    const {
      blogList: { data, page, size, totaldata },
      loading,
      blogByTag,
      blogByAuthor,
    } = this.props;
    const require = this.props && this.props.match && this.props.match.params;

    const BlogsPerPage = ['1', '5', '10', '20', '50', '100'];
    const indexOfLastBlog = page * size;
    const indexOfFirstBlog = indexOfLastBlog - size;
    const indexOfLastBlogAuthor =
      (blogByAuthor && blogByAuthor.page) * (blogByAuthor && blogByAuthor.size);
    const indexOfFirstBlogAuthor =
      indexOfLastBlogAuthor - (blogByAuthor && blogByAuthor.size);
    const indexOfLastBlogTag =
      (blogByTag && blogByTag.page) * (blogByTag && blogByTag.size);
    const indexOfFirstBlogTag =
      indexOfLastBlogTag - (blogByTag && blogByTag.size);
    const currentBlogs = data.slice(indexOfFirstBlog, indexOfLastBlog);
    const currentBlogsByAuthor =
      blogByAuthor &&
      blogByAuthor.data.slice(indexOfFirstBlogAuthor, indexOfLastBlogAuthor);
    const currentBlogsByTag =
      blogByTag &&
      blogByTag.data.slice(indexOfFirstBlogTag, indexOfLastBlogTag);

    const maxPage = Math.ceil(totaldata / size);
    const pagenumber = [];
    for (let i = 1; i <= Math.ceil(totaldata / size); i++) {
      pagenumber.push(i);
    }
    const renderPageNumbers = pagenumber.map(each => (
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        key={each}
        id={each}
        onClick={this.handleClick('page')}
      >
        {each}
      </button>
    ));

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {require && this.props.match.params.tag
              ? 'Blog By Tag'
              : require && this.props.match.params.author
                ? 'Blog By Author'
                : 'Blog List'}
          </title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">
            Blog
          </h1>
        </div>
        <div className="container mx-auto block md:flex p-4 mb-10">
          <div className="w-full md:w-3/4">
            <RenderBlogs
              loading={loading}
              currentBlogs={
                require && this.props.match.params.author
                  ? currentBlogsByAuthor
                  : require && this.props.match.params.tag
                    ? currentBlogsByTag
                    : currentBlogs
              }
            />
            <div className="flex">
              <div className="w-full md:w-1/3">
                <label
                  className="uppercase tracking-wide text-gray-800 text-xs mb-2 pr-4"
                  htmlFor="select-blogs-per-page"
                >
                  Blogs Per Page
                </label>
                <select
                  // className="Waftinputbox"
                  native="true"
                  value={size || ''}
                  onChange={this.handleBlogsPerPage('size')}
                  style={{ width: 50, minWidth: 'auto' }}
                >
                  {BlogsPerPage.map(each => (
                    <option key={each} value={each}>
                      {each}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-2/3 flex justify-end">
                <button
                  className="font-bold"
                  disabled={page === 1}
                  onClick={this.handleBackPage}
                >
                  {'<<'}
                </button>
                {renderPageNumbers}
                <button
                  className="font-bold"
                  disabled={page === maxPage}
                  onClick={this.handleNextPage}
                >
                  {'>>'}
                </button>
              </div>
            </div>
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
