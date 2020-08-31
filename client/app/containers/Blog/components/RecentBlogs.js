import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRecentBlogsIsLoading,
  makeSelectRecentBlogs,
} from '../selectors';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import RecentBlogsSkeleton from '../Skeleton/RecentBlogs';
import clock from '../../../assets/img/clock.svg';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';

function RecentBlogs(props) {
  if (props.loading) {
    return <div />;
  }
  return (
    <div className="">
      <div className="bg-primary h-14 flex items-center pl-8 mb-4">
        <h2 className="font-bold text-3xl text-white my-0">
         Recent Posts
        </h2>
      </div>
      {props.blogs.map(blog => (
        <div key={`recents-${blog._id}`} className="flex py-4">
          {/* <div className="w-2">
          <span className="w-2 h-3 inline-block bg-primary" />
            <span className="w-2 h-3 inline-block bg-secondary" />
</div> */}
          <div className="flex-1 mr-7">
            <Link
              className="no-underline hover:text-secondary text-xl block text-gray-700"
              to={`/news/${moment(blog.added_at).format('YYYY/MM/DD')}/${
                blog._id
                }`}
            >
              {blog.title}
            </Link>
            <div className="inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date">
              <img className="mr-2 clock" src={clock} />
              {moment(blog.added_at).fromNow()}
            </div>
          </div>
          <Link
            className="block overflow-hidden w-24 h-24 article-img-container"
            to={`/news/${moment(blog.added_at).format('YYYY/MM/DD')}/${
              blog._id
              }`}
          >
            <img
              src={`${IMAGE_BASE}${blog && blog.image && blog.image.path}`}
              alt={blog.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

const withSaga = injectSaga({ key: 'blogPage', saga });
const withReducer = injectReducer({ key: 'blogPage', reducer });

RecentBlogs.propTypes = {
  loading: PropTypes.bool.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRecentBlogsIsLoading(),
  blogs: makeSelectRecentBlogs(),
});

const withConnect = connect(mapStateToProps);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RecentBlogs);
