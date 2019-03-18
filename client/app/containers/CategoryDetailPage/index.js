import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { IMAGE_BASE } from 'containers/App/constants';
import defaultImage from 'assets/img/logo.svg';
import { loadCategoryRequest, loadBlogRequest } from './actions';
import { makeSelectCategory, makeSelectBlog } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { slug },
    } = this.props.match;

    // this.props.loadCategory(slug);
    this.props.loadBlog(slug);
  }
  render() {
    const { blog } = this.props;
    const blogObj = blog.toJS();
    // console.log(blogObj);

    return (
      <div className="container">
        <Helmet>
          <title>{blogObj.category ? blogObj.category.title : ''}</title>
        </Helmet>
        <Grid container spacing={8}>
          <Grid item lg={12}>
            <div className="companyHeader">
              <h1 className="pageTitle">
                <span>Blogs related to {blogObj.category ? blogObj.category.title : ''}</span>
              </h1>
            </div>

            <Grid container spacing={8}>
              {blogObj.blog.map(each => {
                const { image, title, description, added_at, Category } = each;
                const blogimage =
                  (image && image.length && image[0].path && `${IMAGE_BASE}${image[0].path}`) ||
                  defaultImage;
                ``;

                return (
                  <Grid key={each._id} item xs={6} md={3}>
                    <Link className="blockLink" to={`/blog/${each._id}`}>
                      <div className="companyItem">
                        <div>{title}</div>
                      </div>
                    </Link>
                    <div>{moment(added_at).format('MMM Do YY')}</div>
                    <Link to={`/blog-category/${each.slug_url}`}>
                      <div className="companyItem">
                        <div>{Category ? Category.title : 'NO'}</div>
                      </div>
                    </Link>
                    <Link to={`/blog/${each._id}`}>
                      <div className="companyItem">
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                      </div>
                    </Link>
                    <Link to={`/blog/${each._id}`}>
                      <div className="img">
                        <img src={blogImage} width="200px" />
                      </div>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>

        {/* {showModal && <OfferDetailPage />} */}
      </div>
    );
  }
}

CategoryDetailPage.propTypes = {
  loadCategory: PropTypes.func.isRequired,
  loadBlog: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'categoryDetailPage', reducer });
const withSaga = injectSaga({ key: 'categoryDetailPage', saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  blog: makeSelectBlog(),
});

const mapDispatchToProps = dispatch => ({
  loadCategory: payload => dispatch(loadCategoryRequest(payload)),
  loadBlog: payload => dispatch(loadBlogRequest(payload)),
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
