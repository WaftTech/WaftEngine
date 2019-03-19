import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadCategoryRequest, loadBlogRequest } from './actions';
import { makeSelectCategory, makeSelectBlog } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { id },
    } = this.props.match;
    this.props.loadCategory(id);
    this.props.loadBlog(id);
  }

  render() {
    const { blog, category } = this.props;
    const blogObj = blog.toJS();
    const catObj = category.toJS();

    return (
      <div className="container">
        <Helmet>
          <title>{catObj ? catObj.title : ''}</title>
        </Helmet>
        ;
        <Grid container spacing={8}>
          <Grid item lg={12}>
            <div className="companyHeader">
              <h1 className="pageTitle">
                <span>Blogs related to {catObj ? catObj.title : ''}</span>
              </h1>
            </div>
            <Grid container spacing={8}>
              <Grid item lg={8}>
                {blogObj.data.map(blog => {
                  const { title, description, added_at, category } = blog;
                  return (
                    <Grid key={`blogs-${blog._id}`} item xs={6} md={3}>
                      <Link className="blockLink" to={`/blog/${blog._id}`}>
                        <div>{title}</div>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CategoryDetailPage.propTypes = {
  loadBlog: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'categoryDetailPage', reducer });
const withSaga = injectSaga({ key: 'categoryDetailPage', saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  blog: makeSelectBlog(),
});

const mapDispatchToProps = dispatch => ({
  loadBlog: payload => dispatch(loadBlogRequest(payload)),
  loadCategory: payload => dispatch(loadCategoryRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(CategoryDetailPage);
