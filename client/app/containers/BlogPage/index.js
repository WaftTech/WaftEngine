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
import { makeSelectBlog, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { IMAGE_BASE } from '../App/constants';
import Loading from '../../components/loading';
import RecentBlogs from './components/RecentBlogs';
import RelatedBlogs from './components/RelatedBlogs';

export class BlogPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadBlogRequest: PropTypes.func.isRequired,
    loadRecentBlogsRequest: PropTypes.func.isRequired,
    blog: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug_url: PropTypes.string,
      }),
    }).isRequired,
  };

  componentDidMount() {
    this.props.loadRecentBlogsRequest();
    this.props.loadBlogRequest(this.props.match.params.slug_url);
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
    if (nextProps.match.params.slug_url !== this.props.match.params.slug_url) {
      this.props.loadBlogRequest(this.props.match.params.slug_url);
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
    const { blog, loading } = this.props;
    if (loading) {
      return <Loading />;
    }

    return (
      <>
        <Helmet>
          <title>{blog.title}</title>
        </Helmet>
        <div className="flex mb-4">
          <div className="w-3/4">
            <div className="container mx-auto ">
              <h1 className="mt-5 mb-2 font-light uppercase">
                <span>{blog.title}</span>
              </h1>
              <br />
              <div>
                {blog.image && blog.image.fieldname ? (
                  <img
                    src={`${IMAGE_BASE}${blog.image.path}`}
                    className=""
                    alt={`${blog.title}`}
                    width="auto"
                    height="628"
                  />
                ) : null}
              </div>
              <br />
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
              <br />
              <div>
                {blog.tags &&
                  blog.tags.length > 0 &&
                  `Tags: ${blog.tags.join(', ')}`}
              </div>
              <div>
                <div id="disqus_thread" />
              </div>
            </div>
          </div>
          <div className="w-1/4 bg-gray-400">
            <RecentBlogs />
            {/* <RelatedBlogs /> */}
          </div>
        </div>
      </>
    );
  }
}

const withReducer = injectReducer({ key: 'blogPage', reducer });
const withSaga = injectSaga({ key: 'blogPage', saga });

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
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
)(BlogPage);
