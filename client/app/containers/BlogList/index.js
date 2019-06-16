import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import moment from 'moment';

import { IMAGE_BASE } from 'containers/App/constants';
import defaultImage from 'assets/img/logo.svg';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectBlogList, makeSelectLoading } from './selectors';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import Loading from '../../components/loading';

/* eslint-disable react/prefer-stateless-function */
export class BlogListPage extends React.Component {
  static propTypes = {
    loadBlogListRequest: PropTypes.func.isRequired,
    blogList: PropTypes.array,
  };

  componentDidMount() {
    this.props.loadBlogListRequest();
  }

  render() {
    const { blogList, loading } = this.props;

    return loading && loading == true ? (
     <Loading/>
    ) : (
      <div>
        <div>
          <h1>Blogs</h1>
        </div>
        <React.Fragment>
          <div className="container">
            <Grid container spacing={24}>
              {blogList.map(each => {
                const {
                  image,
                  title,
                  description,
                  added_at,
                  category,
                  tags,
                } = each;
                const blogImage =
                  (image &&
                    image.length &&
                    image[0].path &&
                    `${IMAGE_BASE}${image[0].path}`) ||
                  defaultImage;

                return (
                  <Grid key={each._id} item xs={12} lg={4}>
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
                    <Link to={`/blog/${each._id}`}>
                      <div className="companyItem">
                        <div>tags: {tags || ''}</div>
                      </div>
                    </Link>
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
