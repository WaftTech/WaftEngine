import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import moment from 'moment';

import { makeSelectBlogList } from './selectors';
import { IMAGE_BASE } from 'containers/App/constants';
import defaultImage from 'assets/img/logo.svg';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
        <div>
          <h1>Blogs</h1>
        </div>
        <React.Fragment>
          <div className="container">
            <Grid container spacing={24}>
              {blogListObj.map(each => {
                const { Image, Title, Description, Added_at, Category, Tags } = each;
                const blogImage =
                  (Image && Image.length && Image[0].path && `${IMAGE_BASE}${Image[0].path}`) ||
                  defaultImage;

                return (
                  <Grid item xs={12} lg={4}>
                    <Link to={`/blog/${each._id}`}>
                      <div className="companyItem">
                        <div>{Title}</div>
                      </div>
                    </Link>
                    <div>{moment(Added_at).format('MMM Do YY')}</div>
                    <Link to={`/blog-category/${Category ? Category.slug_url : ''}`}>
                      <div className="companyItem">
                        <div>{Category ? Category.title : 'NO'}</div>
                      </div>
                    </Link>
                    <Link to={`/blog/${each._id}`}>
                      <div className="companyItem">
                        <div dangerouslySetInnerHTML={{ __html: Description }} />
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
                          <div>{Tags ? Tags : ''}</div>
                        </div>
                      </Link>{' '}
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </React.Fragment>
        <Link to={`/blog-category`}>
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
