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
import { IMAGE_BASE } from '../App/constants';

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
    console.log(blog);
    return (
      <div className="container">
        <div className="justify-center">
          <Helmet>
            <title>{blog.title}</title>
          </Helmet>

          <h1 className="pageTitle">
            <span>{blog.title}</span>
          </h1>
          <br />
          <div className="img">
            <img
              src={
                blog.image &&
                blog.image.filename &&
                `${IMAGE_BASE}${blog.image.path}`
              }
              className=""
              alt="image"
              height="534"
              width="493"
            />
          </div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />
          <br />
          <div>
            tags:{' '}
            {(blog.tags && blog.tags.length && blog.tags.join(',')) ||
              `no tags`}
          </div>
          <br />
          <div>
            {' '}
            <div id="disqus_thread" />{' '}
          </div>
        </div>
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
