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
import { IMAGE_BASE } from '../../containers/App/constants';
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
    <Skeleton />
  ) : (
      <>
        <h2 className="pt-5 pb-4 text-2xl">
          {latestBlogs[cat_id] &&
            latestBlogs[cat_id].category &&
            latestBlogs[cat_id].category.title}
        </h2>
        <div>
          {latestBlogs[cat_id] &&
            latestBlogs[cat_id].blogs &&
            latestBlogs[cat_id].blogs.map((each, index) => (
              <div key={each._id} className={`pr-4 item-${index + 1}`}>
                <div className="md:flex mb-5 article-container">
                  <Link to={`/blog/${each.slug_url}`} className="w-32 h-32 article-img-container">
                    <img
                      src={`${IMAGE_BASE}${each &&
                        each.image &&
                        each.image.path}`}
                      className="max-w-none object-cover article-img"
                      // style={{ maxWidth: 100 }}
                      alt={`${each.title}`}
                    />
                  </Link>

                  <div className="md:pl-5 leading-tight article-text">
                    <span className="text-gray-700 text-sm sans-serif article-date">
                      {moment(each.added_at).format('MMM DD, YYYY')}
                    </span>
                    <Link
                      className="font-bold text-xl block text-black hover:text-waftprimary pointer no-underline article-title"
                      to={`/blog/${each.slug_url}`}
                    >
                      {each.title}{' '}
                    </Link>
                    <span className="text-gray-700 text-sm sans-serif author-name">
                      {each.author.name}
                    </span>

                    <p className="text-gray-600 leading-relaxed short-description">{each.short_description}</p>

                  </div>
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
