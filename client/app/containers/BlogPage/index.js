/**
 *
 * BlogPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as mapDispatchToProps from './actions';
import { makeSelectBlog } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class BlogPage extends React.Component {
  componentDidMount() {
    this.props.loadBlogRequest(this.props.match.params.id);
    (function() {
      // DON'T EDIT BELOW THIS LINE
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://nepaloffers.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.loadBlogRequest(this.props.match.params.id);
      (function() {
        // DON'T EDIT BELOW THIS LINE
        const d = document;
        const s = d.createElement('script');
        s.src = 'https://nepaloffers.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();
    }
  }

  render() {
    const { blog } = this.props;
    // const blogImage =
    //   (blog.Image && blog.Image.path && `${IMAGE_BASE}${blog.Image.path}`) || defaultImage;

    return (
      <div className="container">
        <Helmet>
          <title>{blog.title}</title>
        </Helmet>

        {/* <Grid container spacing={8}> */}
        <h1 className="pageTitle">
          <span>{blog.title}</span>
        </h1>
        <div className="img">
          <img src={blog.image} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: blog.description }} />

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
  loadBlogRequest: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'blogPage', reducer });
const withSaga = injectSaga({ key: 'blogPage', saga });

const mapStateToProps = createStructuredSelector({
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
)(BlogPage);
