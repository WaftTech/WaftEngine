/**
 *
 * BlogPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';

import moment from 'moment';
// import CompanyList from '../../components/CompanyList';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { IMAGE_BASE } from 'containers/App/constants';
import { loadBlogRequest } from './actions';
import { makeSelectBlog } from './selectors';
import reducer from './reducer';
import saga from './saga';
import defaultImage from 'assets/img/logo.svg';

// import BlogList from '../BlogList';

export class BlogPage extends React.Component {
  componentDidMount() {
    this.props.loadBlog(this.props.match.params.slug);
    (function() {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement('script');
      s.src = 'https://nepaloffers.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.props.loadBlog(this.props.match.params.slug);
      (function() {
        // DON'T EDIT BELOW THIS LINE
        var d = document,
          s = d.createElement('script');
        s.src = 'https://nepaloffers.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();
    }
  }
  render() {
    const { classes, blog } = this.props;
    const blogObj = blog.toJS();
    // const blogImage =
    //   (blogObj.Image && blogObj.Image.path && `${IMAGE_BASE}${blogObj.Image.path}`) || defaultImage;

    return (
      <div className="container">
        <Helmet>
          <title>{blogObj.Title}</title>
        </Helmet>

        {/* <Grid container spacing={8}> */}
        <h1 className="pageTitle">
          <span>{blogObj.Title}</span>
        </h1>
        <div className="img">
          <img src={blogObj.Image} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: blogObj.Description }} />

        <div>
          {' '}
          <div id="disqus_thread" />{' '}
        </div>
        {/* </Grid> */}
      </div>
    );
  }
}

BlogPage.propTypes = {
  loadBlog: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'blogPage', reducer });
const withSaga = injectSaga({ key: 'blogPage', saga });

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
});

const mapDispatchToProps = dispatch => ({
  loadBlog: payload => dispatch(loadBlogRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogPage);
