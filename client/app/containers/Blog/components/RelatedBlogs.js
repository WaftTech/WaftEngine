import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRelatedBlogsIsLoading,
  makeSelectRelatedBlogs,
} from '../selectors';
import { IMAGE_BASE } from '../../App/constants';
import RecentBlogsSkeleton from '../Skeleton/RecentBlogs';


function RelatedBlogs(props) {
  if (props.loading) {
    return <RecentBlogsSkeleton />;
  }
  if (props.blogs.length === 0) {
    return null;
  }
  return (
    <div className="mb-4">
      <h3 className="uppercase">Related Blogs</h3>
      {props.blogs.map(blog => (
        <div
          key={`relateds-${blog._id}`}
          className="blog-det flex py-3 border-b border-dashed"
        >
          <div style={{ width: '80px', height: '80px' }}>
            <Link to={`/blog/${blog.slug_url}`}>
              <img
                src={`${IMAGE_BASE}${blog.image.path}`}
                alt="blog image"
                className="mr-4"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
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
            <time>{moment(blog.added_at).format('ll')}</time>
          </div>
        </div>
      ))}
    </div>
  );
}

RelatedBlogs.propTypes = {
  loading: PropTypes.bool.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRelatedBlogsIsLoading(),
  blogs: makeSelectRelatedBlogs(),
});

export default connect(mapStateToProps)(RelatedBlogs);
