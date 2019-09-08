import React, { useState } from 'react';
import PropTypes, { number } from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { IMAGE_BASE } from 'containers/App/constants';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import BlogListSkeleton from '../Skeleton/BlogList';

const RenderBlogs = props => {
  const { currentBlogs, loading, pagination, handlePagination } = props;
  const BlogsPerPage = ['1', '5', '10', '20', '50', '100'];
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
          description,
          added_at,
          category,
          tags,
        } = each;

        return (
          <div key={each._id}>
            <div className="border-b border-dotted py-5 flex" key={slug_url}>
              <div className="w-1/4">
                <Link
                  className="text-black no-underline capitalize mb-2 bold block mt-4"
                  to={`/blog/${slug_url}`}
                >
                  <h2 className="text-2xl font-medium leading-tight">{title}</h2>
                </Link>
                <span className="mt-2">
                  by{' '}
                  <Link
                    to={`/blog/author/${author._id}`}
                    className="text-red-600 font-bold no-underline hover:underline"
                  >
                    {author.name}
                  </Link>
                </span>
              </div>

              {/* <div className="text-grey-darker text-base no-underline">
                      <div className="mr-2">
                        <span className="text-gray-700">Category: </span>
                        {category && category.length > 0 && category.map((each, index) => (
                          <Link
                            key={index}
                            className="text-black hover:text-waftprimary leading-normal text-base no-underline"
                            to={`/blog/category/${each._id}`}
                          >
                            {`${index === 0 ? '' : ', '}${each.title}`}
                          </Link>
                        ))}
                      </div>
                    </div> */}
              <div className="w-1/2 p-4">
                <span className="text-gray-700 mr-2">
                  {moment(added_at).format('MMM Do YY')}
                </span>
                <Link
                  className="text-indigo-600 no-underline"
                  to={`/blog/${each.slug_url}`}
                >
                  <span> {tags.join(', ') || ''} </span>
                </Link>{' '}
                <Link
                  className="text-grey-darker text-base no-underline"
                  to={`/blog/${slug_url}`}
                >
                  <div
                    className="leading-normal text-sm text-gray-600 font-light overflow-hidden"
                    style={{ height: '130px' }}

                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </Link>
                {/* <div className="flex justify-end readmore mt-2">
                        {' '}
                        <Link
                          className="no-underline hover:text-waftprimary"
                          to={`/blog/${slug_url}`}
                        >
                          Continue Reading <span className="rdanim">>>></span>
                        </Link>
                      </div> */}
              </div>

              <div className="w-1/4 h-48 object-cover overflow-hidden p-8">
                <Link to={`/blog/${slug_url}`}>
                  <img
                    src={image && `${IMAGE_BASE}${image.path}`}
                    className="rounded "
                    alt={`${title}`}
                  />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex">
        <div className="w-full md:w-1/4">
          <label
            className="uppercase tracking-wide text-grey-darker text-xs mb-2 pr-4"
            htmlFor="select-blogs-per-page"
          >
            Blogs Per Page
          </label>
          <select
            native="true"
            value={pagination.size}
            onChange={e =>
              handlePagination({ ...pagination, size: e.target.value })
            }
            style={{ width: 50, minWidth: 'auto' }}
          >
            {BlogsPerPage.map(each => (
              <option key={each} value={each}>
                {each}
              </option>
            ))}
          </select>
        </div>
        <div className="w-3/4 flex justify-end">
          <button
            className="font-bold"
            disabled={pagination.page === 1}
            onClick={() =>
              handlePagination({
                ...pagination,
                page: pagination.page - 1,
              })
            }
          >
            {'<<'}
          </button>
          {pagenumber.length > 0 &&
            pagenumber.map(each => (
              <button
                key={each}
                id={each}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={e => {
                  handlePagination({
                    ...pagination,
                    page: e.target.id,
                  });
                }}
              >
                {each}
              </button>
            ))}
          <button
            className="font-bold"
            disabled={pagination.page === maxPage}
            onClick={() =>
              handlePagination({ ...pagination, page: pagination.page + 1 })
            }
          >
            {'>>'}
          </button>
        </div>
      </div>
    </>
  ) : (
        <div>Blog Not Found</div>
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
