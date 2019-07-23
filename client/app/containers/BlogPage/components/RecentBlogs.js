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

function RecentBlogs(props) {
  if (props.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h4>Recent Blogs</h4>
      {props.blogs.map(blog => (
        <div key={`recents-${blog._id}`}>
          <h6>
            <Link to={`/blog/${blog.slug_url}`}>{blog.title}</Link>
          </h6>
          <time>{moment(blog.added_at).format('ll')}</time>
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
