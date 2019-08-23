import React from 'react';
import PropTypes, { number } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import moment from 'moment';
import { Helmet } from 'react-helmet';

// import { IMAGE_BASE } from 'containers/App/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectBlogList, makeSelectLoading } from './selectors';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import Loading from '../../components/Loading';
// import CategoryListing from '../../containers/CategoryListingPage/Loadable';
import RenderBlogs from './renderBlogs';

/* eslint-disable react/prefer-stateless-function */
export class BlogListPage extends React.Component {
  static propTypes = {
    loadBlogListRequest: PropTypes.func.isRequired,
    blogList: PropTypes.object,
  };

  componentDidMount() {
    this.props.loadBlogListRequest();
    if (this.props.match.params.author) {
      this.props.loadBlogByAuthorRequest(this.props.match.params.author);
    }
    if (this.props.match.params.tag) {
      this.props.loadBlogByTagRequest(this.props.match.params.tag);
    }
  }
  
  handleClick = name => e => {
    e.persist();
    this.props.setPagesValue({key: name, value: Number(e.target.id)});
  };

  handleBlogsPerPage = e => {
    e.persist();
    this.props.setSizeValue(e.target.value);
  };

  handleBackPage = e => {
    e.persist();
    const nextPage = this.props.blogList.page;
    const prevPage = nextPage - 1;
    this.props.setPagesValue({key: 'page', value: prevPage});
  };

  handleNextPage = e => {
    e.persist();
    const prevPage  = this.props.blogList.page;
    const nextPage = prevPage + 1;
    this.props.setPagesValue({key: 'page', value: nextPage});
  };

  render() {
    const {
      blogList: { data, page, size, totaldata },
      loading,
    } = this.props;

    const BlogsPerPage = ['1', '5', '10', '20', '50', '100'];
    const indexOfLastBlog = page * size;
    const indexOfFirstBlog = indexOfLastBlog - size;
    const currentBlogs = data.slice(indexOfFirstBlog, indexOfLastBlog);

    const maxPage = Math.ceil(totaldata/size);
    const pagenumber = [];
    for (let i = 1; i <= Math.ceil(totaldata/size); i++) {
      pagenumber.push(i);
    }
    const renderPageNumbers = pagenumber.map(each => {
      return (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          key={each}
          id={each}
          onClick={this.handleClick('page')}
        >
          {each}
        </button>
      )
    })

    return loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>Blog List</title>
        </Helmet>
        <div>
          <div>
            <RenderBlogs currentBlogs={currentBlogs}/>
          </div>
          <div className="flex">
            <div className="w-1/3  ml-8">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
                htmlFor="select-blogs-per-page"
              >
                Blogs Per Page
              </label>
              <select
                native="true"
                value={size || ''}
                onChange={this.handleBlogsPerPage}
              >
              {BlogsPerPage.map(each => (
                <option key={each} value={each}>{each}</option>
              ))}
              </select>
            </div>
            <div className="w-2/3 ml-4">
              <button
                className="font-bold"
                disabled={page===1}
                onClick={this.handleBackPage}
              >
                {"<<"}
              </button>
              {renderPageNumbers}
              <button
                className="font-bold"
                disabled={page===maxPage}
                onClick={this.handleNextPage}
              >
              {">>"}
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'blogList', reducer });
const withSaga = injectSaga({ key: 'blogList', saga });

const mapStateToProps = createStructuredSelector({
  blogList: makeSelectBlogList(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogListPage);
