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
import { makeSelectLatestBlogs } from '../../containers/App/selectors';
import './style.css';

const CategoryElement = props => {
  const { cat_id, latestBlogs } = props;

  useEffect(() => {
    props.loadLatestBlogsRequest(cat_id);
  }, []);

  console.log(latestBlogs);
  return (

    <>
      {/* <h2>{latestBlogs.category && latestBlogs.category.title}</h2> */}
      {latestBlogs.blogs &&
        latestBlogs.blogs.map((each, index) => (
          <div
            key={each._id}
            className={`mr-4 ${index === 0 ? 'first_item' : ''}`}
          >
            <div className="flex max-w-sm mb-5">
              <img
                src={`${IMAGE_BASE}${each && each.image && each.image.path}`}
                style={{ maxWidth: 100 }}
                alt={`${each.title}-image`}
              />

              <div className="pl-5">
                <span className="text-grey-dark">{moment(each.added_at).format('MMM DD, YYYY')}</span>
                <Link className="font-bold text-xl block text-black hover:text-waftprimary heading pointer no-underline" to={`/blog/${each.slug_url}`}> {each.title}  </Link>
                <span className="text-grey-dark">{each.author.name}</span>

              </div>
            </div>
          </div>
        ))}
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
