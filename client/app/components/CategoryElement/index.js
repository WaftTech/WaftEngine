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

import LinkBoth from '../LinkBoth';
import { IMAGE_BASE } from '../../containers/App/constants';
import * as mapDispatchToProps from '../../containers/App/actions';
import { makeSelectLatestBlogs } from '../../containers/App/selectors';
import './style.css';

const CategoryElement = props => {
  const { cat_id, latestBlogs } = props;

  useEffect(() => {
    props.loadLatestBlogsRequest(cat_id);
  }, []);

  return (
    <>
      <h2>{latestBlogs.category && latestBlogs.category.title}</h2>
      <br />
      <div className="flex">
        {latestBlogs.blogs &&
          latestBlogs.blogs.map((each, index) => (
            <div
              key={each._id}
              className={`mr-4 ${index === 0 ? 'first_item' : ''}`}
            >
              <div className="font-bold text-blue hover:text-waftprimary heading">
                {each.title}
              </div>
              <LinkBoth to={`/blog/${each.slug_url}`}>
                <img
                  src={`${IMAGE_BASE}${each && each.image && each.image.path}`}
                  style={{ maxWidth: 200 }}
                  alt={`${each.title}-image`}
                />
              </LinkBoth>
            </div>
          ))}
      </div>
    </>
  );
};

CategoryElement.propTypes = {
  loadLatestBlogsRequest: PropTypes.func.isRequired,
  latestBlogs: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  latestBlogs: makeSelectLatestBlogs(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(CategoryElement);
