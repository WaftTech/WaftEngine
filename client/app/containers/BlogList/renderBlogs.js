import React, { useState } from 'react';
import PropTypes, { number } from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { IMAGE_BASE } from 'containers/App/constants';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from './actions';
import CategoryListing from '../../containers/CategoryListingPage/Loadable';
import Archives from '../BlogPage/components/Archives.js';


const RenderBlogs = props => {
  const { currentBlogs } = props;
  return (
    <>
      <div className="banner relative">
        <img src="https://www.waftengine.org/public/media/C97CE0A29A7E4B4-banner.jpg" />
        <h1 className="container mx-auto my-auto absolute inset-x-0 bottom-0 text-waftprimary waft-title">
          Blogs
        </h1>
      </div>
      <div className="container mx-auto flex">
        <div className="w-3/4">
          <div className="flex flex-wrap">
            {currentBlogs.map(each => {
              const {
                image,
                title,
                slug_url,
                description,
                added_at,
                category,
                tags,
              } = each;

              return (
                <div
                  className="border-b border-dotted py-5 flex"
                  key={slug_url}
                >

                  <div className="w-1/4">
                    <Link
                      className="text-black no-underline capitalize mb-2 bold block mt-4"
                      to={`/blog/${slug_url}`}
                    >
                      <h2>{title}</h2>
                    </Link>
                    <span className="mt-2">by <a className="text-red font-bold no-underline" href="#">Author Name</a></span>
                  </div>

                  {/* <div className="text-grey-darker text-base no-underline">
                      <div className="mr-2">
                        <span className="text-grey-dark">Category: </span>
                        {category && category.length > 0 && category.map((each, index) => (
                          <Link
                            key={index}
                            className="text-black hover:text-waftprimary leading-normal text-base no-underline"
                            to={`/blog-category/${each._id}`}
                          >
                            {`${index === 0 ? '' : ', '}${each.title}`}
                          </Link>
                        ))}
                      </div>
                    </div> */}
                  <div className="w-1/2 p-4">
                    <span className="text-grey-dark mr-2">
                      {moment(added_at).format('MMM Do YY')}
                    </span>
                    <Link
                      className="text-grey-dark text-blue no-underline"
                      to={`/blog/${each.slug_url}`}
                    >
                      <span> {tags.join(', ') || ''} </span>
                    </Link>{' '}

                    <Link
                      className="text-grey-darker text-base no-underline"
                      to={`/blog/${slug_url}`}
                    >
                      <div
                        className="leading-normal text-base text-left"
                        style={{ height: '95px', overflow: 'hidden' }}
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
              );
            })}
          </div>
        </div>
        <ul className="w-1/4 pt-10">
          <h3 className="uppercase">Categories</h3>
          <ul className="list-none pl-0">
            <CategoryListing />
          </ul>
          <Archives />
        </ul>
      </div>
    </>
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
export default compose(
  withConnect,
)(RenderBlogs);
