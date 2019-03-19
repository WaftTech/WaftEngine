import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import moment from 'moment';

import { IMAGE_BASE } from 'containers/App/constants';
import defaultImage from 'assets/img/logo.svg';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectBlogList } from './selectors';
import saga from './saga';
import { loadBlogListRequest } from './actions';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class BlogListPage extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.loadBlogList();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { blogList, category } = this.props;
    const blogListObj = blogList.toJS();

    return (
      <div>
        <Helmet>
          <title>Blogs</title>
        </Helmet>
        <h1>Blogs</h1>
        <React.Fragment>
          <div className="container">
            <Grid container spacing={24}>
              {blogListObj.map(each => {
                const { image, title, description, added_at, category, tags } = each;
                const blogImage = (image && image.length && image[0].path && `${IMAGE_BASE}${image[0].path}`) || defaultImage;

                return (
                  <Grid item xs={12} lg={4} key={`blog-${each._id}`}>
                    <Link to={`/blog/${each._id}`}>
                      <div className="companyItem">
                        <div>{title}</div>
                      </div>
                    </Link>
                    <div>{moment(added_at).format('MMM Do YY')}</div>
                    <Link to={`/blog-category/${category ? category._id : ''}`}>
                      <div className="companyItem">
                        <div>{category ? category.title : 'NO'}</div>
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
                    <div>
                      Tags:
                      <Link to={`/blog/${each._id}`}>
                        <div className="companyItem">
                          <div>{tags || ''}</div>
                        </div>
                      </Link>{' '}
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </React.Fragment>
        <Link to="/blog-category">
          <div>
            <h1>Blog Categories</h1>
          </div>
        </Link>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'blogList', reducer });
const withSaga = injectSaga({ key: 'blogList', saga });

const mapStateToProps = createStructuredSelector({
  blogList: makeSelectBlogList(),
});

const mapDispatchToProps = dispatch => ({
  loadBlogList: () => dispatch(loadBlogListRequest()),
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
)(BlogListPage);
