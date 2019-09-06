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
  const { currentBlogs, loading } = props;
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
          <div className="border-b border-dashed py-5 flex flex-col md:flex-row" key={slug_url}>
            <div className="w-full md:w-1/4 order-2 md:order-none">
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
                  className="text-red-600 font-bold no-underline"
                >
                  {author.name}
                </Link>
              </span>
            </div>

            {/* <div className="text-gray-800 text-base no-underline">
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
            <div className="w-full md:w-1/2 py-4 order-3 md:order-none pl-5">
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
                className="text-gray-800 text-base no-underline"
                to={`/blog/${slug_url}`}
              >
                <div
                  className="leading-normal text-sm text-gray-600 font-light"
                  style={{ height: '130px', overflow: 'hidden' }}
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

            <div className="w-full md:w-1/4 h-48 object-cover overflow-hidden p-8 pt-4 order-1 md:order-none">
              <Link to={`/blog/${slug_url}`}>
                <img
                  src={image && `${IMAGE_BASE}${image.path}`}
                  className="rounded "
                  alt={`${title}`}
                />
              </Link>
            </div>
          </div>
        );
      })}
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
