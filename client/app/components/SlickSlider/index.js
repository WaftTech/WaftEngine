/**
 *
 * SlickSlider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeSelectSlide } from '../../containers/App/selectors';
import { loadSlideRequest } from '../../containers/App/actions';
import MediaElement from '../MediaElement';
import { IMAGE_BASE } from '../../containers/App/constants';
import './index.css';

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
    let settings = {
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: true,
      centerMode: true,
      centerPadding: '40px',
      autoplay: true,
      autoplaySpeed: 2000,
      focusOnSelect: true,
    };
    try {
      if (slide.settings && typeof slide.settings === 'string') {
        settings = JSON.parse(slide.settings);
      }
    } catch (err) {
      console.log(err);
    }
    if (!slide) return null; // maybe add a loader here
    return (
      <div className="slider">
        <Slider {...settings}>
          {slide.images.map(image => (
            <img
              src={`${IMAGE_BASE}${image.image.path}`}
              style={{ maxWidth: 200, maxHeight: 200 }}
              alt="slider media"
              key={image._id}
            />
            // <MediaElement
            //   mediaKey={image.image}
            //   key={image._id}
            //   link={image.link}
            // />
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SlickSlider);
