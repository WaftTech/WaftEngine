/**
 *
 * Testimonials
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectTestimonial,
  makeSelectLoading,
  makeSelectTestimonialSetting,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { IMAGE_BASE } from '../App/constants';
import './style.css';

import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
const key = 'testimonials';
const Testimonials = props => {
  const { testimonials, testimonial_setting, loading, loadAllRequest } = props;
  useEffect(() => {
    loadAllRequest();
  }, []);
  let settings;
  try {
    if (
      testimonial_setting &&
      testimonial_setting.extra_setting &&
      typeof testimonial_setting.extra_setting === 'string'
    ) {
      settings = JSON.parse(testimonial_setting.extra_setting);
    }
  } catch (err) {
    console.log(err);
  }
  let combined;

  if (testimonial_setting && testimonial_setting.extra_setting !== undefined) {
    combined = { ...testimonial_setting, ...settings };
  } else {
    combined = { ...testimonial_setting };
  }
  console.log('testimonial combined', combined);
  return (
    <div className="section product_feature_comparision">
      <div className="container mx-auto">
        <div className="title-block py-1 md:py-2 lg:py-4 border-b my-2 md:my-4">
          <h2 className="text-base md:text-lg lg:text-2xl font-bold m-0">
            What Our Client Says
          </h2>
        </div>

        {/* <div className="flex justify-between px-4 mt-24"> */}
        <Slider
          // {...setting}>
          {...combined}
        >
          {testimonials &&
            testimonials.map(each => (
              <div
                className="mb-12 md:mb-0 w-full md:w-1/3 bg-white px-0 py-10 md:p-10 relative client rounded text-center"
                key={each._id}
              >
                <div className="absolute clientimg">
                  <img
                    src={
                      each.image && each.image.path
                        ? `${IMAGE_BASE}${each.image.path}`
                        : ``
                    }
                    className="h-28 w-28 rounded-full"
                  />
                </div>
                <h2 className="text-primary text-lg mt-6">{each.name}</h2>
                <h5 className="text-sm">
                  {each.designation} of {each.company}
                </h5>
                <p className="italic">
                  <FaQuoteLeft />
                  {each.description}
                </p>
              </div>
            ))}
        </Slider>
      </div>
    </div>
    // </div>
  );
};

Testimonials.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  testimonials: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  testimonials: makeSelectTestimonial(),
  loading: makeSelectLoading(),
  testimonial_setting: makeSelectTestimonialSetting(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key, saga });
const withReducer = injectReducer({ key, reducer });
export default compose(withConnect, withReducer, withSaga, memo)(Testimonials);
