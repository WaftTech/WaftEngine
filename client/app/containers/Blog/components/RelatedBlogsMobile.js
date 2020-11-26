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
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import RecentBlogsSkeleton from '../Skeleton/RecentBlogs';

function RelatedBlogs(props) {
  if (props.loading) {
    return null;
  }
  return (
    <div className="mt-5">
      {props.blogs.length > 0 && (
        <>
          <h2 className="font-bold text-2xl font-mukta">Related</h2>
          <div className="flex flex-wrap -mx-2">
            {props.blogs.map(blog => (
              <div key={`relateds-${blog._id}`} className="px-2 mt-4">
                <div className="bg-white shadow rounded overflow-hidden">
                  <Link
                    className="block h-40"
                    to={`/news/mobile/${blog.slug_url}`}
                  >
                    <img
                      src={`${IMAGE_BASE}${blog.image.path}`}
                      alt={blog.title}
                      className="object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-xl leading-normal font-bold font-mukta">
                      <Link
                        className="text-black no-underline hover:text-blue-500"
                        to={`/news/mobile/${blog.slug_url}`}
                      >
                        {blog.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
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
