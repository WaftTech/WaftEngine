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
import RecentBlogsSkeleton from '../Skeleton/RecentBlogs';


function RecentBlogs(props) {
  if (props.loading) {
    return <RecentBlogsSkeleton />;
  }
  return (
    <div className="mb-4">
      <h3 className="font-medium text-xl uppercase">Recent Blogs</h3>
      {props.blogs.map(blog => (
        <div
          key={`recents-${blog._id}`}
          className="blog-det flex py-3 border-b border-dotted"
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
            <time className="text-xs text-gray-700">
              {moment(blog.added_at).format('ll')}
            </time>
            <h4 className="font-normal sans-serif text-sm">
              <Link
                className="text-black no-underline hover:text-waftprimary"
                to={`/blog/${blog.slug_url}`}
              >
                {blog.title}
              </Link>
            </h4>
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
