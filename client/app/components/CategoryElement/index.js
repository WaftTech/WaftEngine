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
import Slider from 'react-slick';
import { IMAGE_BASE, DATE_FORMAT } from '../../containers/App/constants';
import * as mapDispatchToProps from '../../containers/App/actions';
import {
  makeSelectLatestBlogs,
  makeSelectBlogLoading,
} from '../../containers/App/selectors';
import Skeleton from './skeleton';
// import style from './category.css';
import clock from '../../assets/img/clock.svg';
import logo from '../../assets/img/logo.svg';
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-next`} onClick={onClick}>
      <i className="material-icons"> keyboard_arrow_right </i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-prev`} onClick={onClick}>
      <i className="material-icons"> keyboard_arrow_left </i>
    </div>
  );
}

const CategoryElement = props => {
  const { cat_id, latestBlogs, loading, size, push, slider } = props;

  useEffect(() => {
    props.loadLatestBlogsRequest({ key: cat_id, value: size });
  }, [cat_id]);

  const hasCategory =
    (latestBlogs[cat_id] &&
      latestBlogs[cat_id].category &&
      latestBlogs[cat_id].category.title) ||
    false;

  let settings = hasCategory
    ? {
      equalizeHeight: true,
      dots: false,
      adaptiveHeight: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
            centerMode: true,
            centerPadding: '0 20px',
          },
        },
      ],
    }
    : {
      dots: false,
      // dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 3,
    };
  try {
    if (settings && typeof settings === 'string') {
      settings = JSON.parse(settings);
    }
  } catch (err) {
    console.log('something went wrong!', err);
  }

  return !hasCategory && loading ? (
    <div />
  ) : (
      <>
        <div className="flex items-center pb-9 pt-12 headline">
          <h2 className="font-mukta text-primary text-3xl lg:text-4xl mb-0">
            {latestBlogs[cat_id] &&
              latestBlogs[cat_id].category &&
              latestBlogs[cat_id].category.title}
          </h2>
          <Link
            className="bg-secondary text-xl w-7 h-7 rounded-full text-white ml-10 relative chevron-right"
            to={`/news/category/${latestBlogs[cat_id] &&
              latestBlogs[cat_id].category &&
              latestBlogs[cat_id].category.slug_url}`}
          >
            <i className="material-icons" style={{ fontSize: 24 }}>
              chevron_right
          </i>
          </Link>
        </div>

        {slider && (
          <Slider {...settings} className="article-group -mx-2">
            {latestBlogs[cat_id] &&
              latestBlogs[cat_id].blogs &&
              latestBlogs[cat_id].blogs.map((each, index) => (
                <div
                  // onClick={() => push(`/news/${each.slug_url}`)}
                  key={each._id}
                  className={`px-2 pb-5 mb-5 border-b md:border-0 h-full item-${index +
                    1}`}
                >
                  <div className="article-container bg-gray-100 h-full">
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
                    <div className="p-4 textpart">
                      <Link
                        to={`/news/${moment(each.added_at).format(
                          'YYYY/MM/DD',
                        )}/${each._id}`}
                        className="text-xl leading-normal hover:text-secondary pointer no-underline article-title font-mukta font-bold md:font-normal"
                      >
                        {each.title}
                      </Link>

                      <p className="hidden font-mukta-regular text-lg md:text-xl short-description">
                        {each.short_description}
                      </p>
                      <div>
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
          </Slider>
        )}

        {!slider && (
          <div className="article-group -mx-2">
            {latestBlogs[cat_id] &&
              latestBlogs[cat_id].blogs &&
              latestBlogs[cat_id].blogs.map((each, index) => (
                <div
                  // onClick={() => push(`/news/${each.slug_url}`)}
                  key={each._id}
                  className={`px-2 pb-5 mb-5 border-b md:border-0 h-full item-${index +
                    1}`}
                >
                  <div className="article-container bg-gray-100 h-full">
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
                    <div className="p-4 textpart">
                      <Link
                        to={`/news/${moment(each.added_at).format(
                          'YYYY/MM/DD',
                        )}/${each._id}`}
                        className="text-xl leading-normal hover:text-secondary pointer no-underline article-title font-mukta font-bold md:font-normal"
                      >
                        {each.title}
                      </Link>

                      <p className="hidden font-mukta-regular text-lg md:text-xl short-description">
                        {each.short_description}
                      </p>
                      <div>
                        <div className="inline-flex items-center hidden mt-3 mr-8 author">
                          <span className="bg-secondary w-8 h-8 rounded-full inline-flex items-center justify-center">
                            <img className="h-4" src={logo} />
                          </span>
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
        )}
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
  loading: makeSelectBlogLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(CategoryElement);
