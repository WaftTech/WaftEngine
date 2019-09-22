import React, { useState } from 'react';
import PropTypes, { number } from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { IMAGE_BASE } from 'containers/App/constants';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import * as mapDispatchToProps from '../actions';
import BlogListSkeleton from '../Skeleton/BlogList';

const RenderBlogs = props => {
  const { currentBlogs, loading, pagination, handlePagination } = props;
  const maxPage = Math.ceil(pagination.totaldata / pagination.size);
  const pagenumber = [];
  for (let i = 1; i <= Math.ceil(pagination.totaldata / pagination.size); i++) {
    pagenumber.push(i);
  }
  return loading ? (
    <>
      <BlogListSkeleton />
    </>
  ) : currentBlogs.length > 0 ? (
    <>
      {currentBlogs.map(each => {
        const {
          image,
          title,
          author,
          slug_url,
          short_description,
          added_at,
          tags,
        } = each;

        return (
          <div key={slug_url} className="border-b border-dotted py-5 md:flex article-container">
            <div className="md:w-1/4 article-heading">
              <Link
                className="text-black no-underline capitalize mb-2 bold block mt-4"
                to={`/blog/${slug_url}`}
              >
                <h2 className="text-2xl font-medium leading-tight hover:text-primary">{title}</h2>
              </Link>
              <span className="my-2 text-sm">
                by{' '}
                <Link
                  to={`/blog/author/${author._id}`}
                  className="text-primary font-bold no-underline hover:underline"
                >
                  {author.name}
                </Link>
              </span>
            </div>
            <div className="md:w-1/2 py-4 md:p-4 article-details">
              <span className="text-gray-700 mr-2 article-date">
                {moment(added_at).format('MMM Do YYYY')}
              </span>
              <Link
                className="text-blue-700 no-underline article-tag"
                to={`/blog/${each.slug_url}`}
              >
                <span> {tags.join(', ') || ''} </span>
              </Link>{' '}
              {short_description &&
                <Link
                  className="text-grey-darker text-base no-underline"
                  to={`/blog/${slug_url}`}
                >
                  <div
                    className="leading-normal text-sm text-gray-600 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: short_description }}
                  />
                </Link>
              }
            </div>

            <div className="md:w-1/4 h-48 overflow-hidden p-8 article-image">
              <Link to={`/blog/${slug_url}`}>
                <img
                  src={image && `${IMAGE_BASE}${image.path}`}
                  alt={`${title}`}
                />
              </Link>
            </div>
          </div>
        );
      })}
      <div className="flex clearfix w-full pagination">
        <div className="w-full md:w-1/4" />
        <div className="w-3/4 flex justify-end mt-3 ">
          {pagination.page !== 1 && (
            <span className="inline-block pr-2">
              <button
                className="border border-gray-500 hover:bg-gray-600 hover:border-gray-600 hover:text-white text-gray-800 font-bold w-10 h-10 rounded flex items-center justify-center"
                onClick={() =>
                  handlePagination({
                    ...pagination,
                    page: pagination.page - 1,
                  })
                }
              >
                <i className="material-icons">keyboard_arrow_left</i>
              </button>
            </span>
          )}
          {pagenumber.length > 0 &&
            pagenumber.map(each => (
              <span className="inline-block pr-2" key={each}>
                <button
                  id={each}
                  className="border border-gray-500 hover:bg-gray-600 hover:border-gray-600 hover:text-white text-gray-800 font-bold w-10 h-10 rounded"
                  onClick={e => {
                    handlePagination({
                      ...pagination,
                      page: e.target.id,
                    });
                  }}
                >
                  {each}
                </button>
              </span>
            ))}
          <span className="inline-block pr-2">
            <button
              className="border border-gray-500 hover:bg-gray-600 hover:border-gray-600 hover:text-white text-gray-800 font-bold w-10 h-10 rounded flex items-center justify-center"
              disabled={pagination.page === maxPage}
              onClick={() =>
                handlePagination({ ...pagination, page: pagination.page + 1 })
              }
            >
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
          </span>
        </div>
      </div>
    </>
  ) : (
        <div>Blogs Not Found</div>
      );
};

RenderBlogs.propTypes = {
  currentBlogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(RenderBlogs);
