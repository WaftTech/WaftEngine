/**
 *
 * CategoryElement
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { IMAGE_BASE, DATE_FORMAT } from '../../containers/App/constants';
import * as mapDispatchToProps from '../../containers/App/actions';
import {
  makeSelectLatestBlogs,
  makeSelecBlogLoading,
} from '../../containers/App/selectors';
import Skeleton from './skeleton';
import style from './category.css';

const CategoryElement = props => {
  const { cat_id, latestBlogs, loading, size } = props;

  useEffect(() => {
    props.loadLatestBlogsRequest({ key: cat_id, value: size });
  }, [cat_id]);

  return loading ? (
    <Skeleton size={size} />
  ) : (
      <>
        <h2 className="pt-5 pb-4 text-2xl">
          {latestBlogs[cat_id] &&
            latestBlogs[cat_id].category &&
            latestBlogs[cat_id].category.title}
        </h2>
        <div className="article-group -mx-4">
          {latestBlogs[cat_id] &&
            latestBlogs[cat_id].blogs &&
            latestBlogs[cat_id].blogs.map((each, index) => (
              <div
                onClick={() => push(`/news/${each.slug_url}`)}
                key={each._id}
                className={`px-4 mb-6 cursor-pointer h-full item-${index + 1}`}
              >
                <div className="article-container">
                  <div className="article-img-container">
                    <img
                      src={`${IMAGE_BASE}${each &&
                        each.image &&
                        each.image.path}`}
                      className="object-cover article-img"
                      alt={`${each.title}`}
                    />
                  </div>
                  <div
                    className="text-xl leading-normal py-5 hover:text-secondary pointer no-underline article-title font-mukta"
                    to={`/news/${each.slug_url}`}
                  >
                    {each.title}
                  </div>
                  {/* <span className="text-gray-700 text-sm sans-serif article-date">
                      {moment(each.added_at).format(DATE_FORMAT)}
                    </span> */}
                  {/* <span className="text-gray-700 text-sm sans-serif author-name">
                      {each.author && each.author.name}
                    </span> */}

                  <p className="hidden font-mukta-regular text-lg md:text-xl short-description">
                    {each.short_description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
};

CategoryElement.propTypes = {
  loadLatestBlogsRequest: PropTypes.func.isRequired,
  latestBlogs: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  cat_id: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  latestBlogs: makeSelectLatestBlogs(),
  loading: makeSelecBlogLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(CategoryElement);
