import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRecentBlogsIsLoading,
  makeSelectRecentBlogs,
} from '../selectors';
import { IMAGE_BASE } from '../../App/constants';

function RecentBlogs(props) {
  if (props.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mb-4">
      <h2 className="text-center pb-3 border-b">Recent Blogs</h2>
      {props.blogs.map(blog => (
        <div
          key={`recents-${blog._id}`}
          className="blog-det flex py-3 border-b border-dashed"
        >
          <div style={{ width: '80px', height: '80px' }}>
            <Link to={`/blog/${blog.slug_url}`}>
              <img
                src={`${IMAGE_BASE}${blog && blog.image && blog.image.path}`}
                alt="blog image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className="flex-1 ml-4">
            <h4 className="font-bold">
              <Link
                className="text-black no-underline hover:text-waftprimary"
                to={`/blog/${blog.slug_url}`}
              >
                {blog.title}
              </Link>
            </h4>
            <time className="text-sm">
              {moment(blog.added_at).format('ll')}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}

RecentBlogs.propTypes = {
  loading: PropTypes.bool.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRecentBlogsIsLoading(),
  blogs: makeSelectRecentBlogs(),
});

export default connect(mapStateToProps)(RecentBlogs);
