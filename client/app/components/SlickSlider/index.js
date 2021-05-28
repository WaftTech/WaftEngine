/**
 *
 * SlickSlider
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadSlideRequest } from '../../containers/App/actions';
import { IMAGE_BASE } from '../../containers/App/constants';
import { makeSelectSlide } from '../../containers/App/selectors';
import LinkBoth from '../LinkBoth';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* eslint-disable react/prefer-stateless-function */
class SlickSlider extends React.PureComponent {
  static propTypes = {
    slideKey: PropTypes.string.isRequired,
    loadSlide: PropTypes.func.isRequired,
    slideObj: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.slideObj[this.props.slideKey]) {
      return;
    }
    this.props.loadSlide(this.props.slideKey);
  }

  render() {
    const { slideObj } = this.props;
    const slide = slideObj[this.props.slideKey];
    let settings;
    try {
      if (slide.settings && typeof slide.settings === 'string') {
        settings = JSON.parse(`${slide.settings}`);
      }
    } catch (err) {
      console.log('something went wrong!', err);
    }
    let combined;
    if (!slide) return null; // maybe add a loader here
    if (slide && slide.settings !== undefined) {
      combined = { ...slide.slider_setting, ...settings };
    } else {
      combined = {
        ...slide.slider_setting
      };
    }
    console.log("slider", combined);

    if (!slide) return null; // maybe add a loader here
    if (slide && slide.settings !== undefined) {
      combined = { ...slide.slider_setting, ...settings };
    } else {
      combined = { ...slide.slider_setting };
    }
    if (!slide) return null; // maybe add a loader here
    return (
      <div>
        <Slider {...combined}>
          {slide.images.map(image => (
            <LinkBoth to={`${image.link ? image.link : ''}`} key={image._id}>
              <>
                <img
                  src={
                    image.image && image.image.path && image.image.path !== null
                      ? `${IMAGE_BASE}${image.image.path}`
                      : ''
                  }
                  alt="slider image"
                />
                <div
                  className="ckEditor"
                  dangerouslySetInnerHTML={{
                    __html: image.caption,
                  }}
                />
              </>
            </LinkBoth>
          ))}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  slideObj: makeSelectSlide(),
});

const mapDispatchToProps = dispatch => ({
  loadSlide: payload => dispatch(loadSlideRequest(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SlickSlider);
