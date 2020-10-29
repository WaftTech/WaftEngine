/**
 *
 * ShowCase
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
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from '../actions';

import Skeleton from '../../../components/CategoryElement/skeleton';
// import style from '../../../components/CategoryElement/category.css';
import clock from '../../../assets/img/clock.svg';

const ShowCase = props => {
  const { showcase, loading, push } = props;

  useEffect(() => { }, [showcase]);

  return loading ? (
    <div />
  ) : (
      <>
        {showcase && showcase.length > 0 && (
          <div className="container layout-7">
            <div className="article-group -mx-2">
              {showcase.map((each, index) => (
                <div
                  key={each._id}
                  className={`px-2 mb-4 h-full item-${index + 1}`}
                >
                  <div className="article-container clearfix">
                    <div className="article-img-container">
                      <Link
                        to={`/news/${moment(each.added_at).format(
                          'YYYY/MM/DD',
                        )}/${each._id}`}
                      >
                        <img
                          src={`${IMAGE_BASE}${each &&
                            each.image &&
                            each.image.path}`}
                          className="object-cover article-img"
                          alt={`${each.title}`}
                        />
                      </Link>
                    </div>
                    <div className="textpart">
                      <Link
                        to={`/news/${moment(each.added_at).format(
                          'YYYY/MM/DD',
                        )}/${each._id}`}
                        className="text-xl leading-normal py-5 hover:text-secondary pointer no-underline article-title font-bold md:font-normal"
                      >
                        {each.title}
                      </Link>

                      <p className="hidden font-mukta-regular text-lg md:text-xl short-description">
                        {each.short_description}
                      </p>
                      <div className="flex">
                        <div className="inline-flex items-center hidden mt-3 mr-8 author">
                          <span className="text-gray-800 text-sm sans-serif author-name ml-3">
                            {each.author &&
                              each.author.map(author => author.name)}
                          </span>
                        </div>
                        <div className="inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date">
                          <img className="hidden mr-2 clock" src={clock} />
                          {moment(each.added_at).fromNow()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
};

ShowCase.propTypes = {
  showcase: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(ShowCase);
