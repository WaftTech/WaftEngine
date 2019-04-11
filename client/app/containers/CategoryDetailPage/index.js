import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { IMAGE_BASE } from 'containers/App/constants';
import defaultImage from 'assets/img/logo.svg';
import * as mapDispatchToProps from './actions';
import { makeSelectCategory, makeSelectBlog } from './selectors';
import reducer from './reducer';
import saga from './saga';

class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { id },
    } = this.props.match;
    this.props.loadBlogRequest(id);
  }

  render() {
    const { blog } = this.props;
    return (
      <div className="container">
        <Helmet>
          <title>{blog[0].category ? blog[0].category.title : ''}</title>
        </Helmet>
        <Grid container spacing={8}>
          <Grid item lg={12}>
            <div className="companyHeader">
              <h1 className="pageTitle">
                <span>
                  Blogs related to{' '}
                  {blog[0].category ? blog[0].category.title : ''}
                </span>
              </h1>
            </div>

            <Grid container spacing={8}>
              {blog.map(each => {
                const { image, title, description, added_at, category } = each;
                const blogImage =
                  (image &&
                    image.length &&
                    image[0].path &&
                    `${IMAGE_BASE}${image[0].path}`) ||
                  defaultImage;
                ``;

                return (
                  <Grid key={`blogcat-${each._id}`} item xs={6} md={3}>
                    <Link className="blockLink" to={`/blog/${each._id}`}>
                      <div className="companyItem">
                        <div>{title}</div>
                      </div>
                    </Link>
                    <div>{moment(added_at).format('MMM Do YY')}</div>
                    <Link to={`/blog-category/${each.slug_url}`}>
                      <div className="companyItem">
                        <div>{category ? category.title : 'NO'}</div>
                      </div>
                    </Link>
                    <Link to={`/blog/${each._id}`}>
                      <div className="companyItem">
                        <div
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
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
  loadCategoryRequest: PropTypes.func.isRequired,
  loadBlogRequest: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'categoryDetailPage', reducer });
const withSaga = injectSaga({ key: 'categoryDetailPage', saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  blog: makeSelectBlog(),
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
