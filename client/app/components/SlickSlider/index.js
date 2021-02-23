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
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import './slick.css';

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
    const { slideObj, show_link, show_caption } = this.props;
    const slide = slideObj[this.props.slideKey];
    let settings = {
      dots: true,
      infinite: true,
      adaptiveHeight: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      nextArrow: <FaChevronCircleRight />,
      prevArrow: <FaChevronCircleLeft />,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            dots: false,
            adaptiveHeight: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    try {
      if (slide.settings && typeof slide.settings === 'string') {
        settings = JSON.parse(`${slide.settings}`);
      }
    } catch (err) {
      console.log('something went wrong!', err);
    }

    if (!slide) return null; // maybe add a loader here
    return (
      <div>
        <Slider {...settings}>
          {slide.images.map(image => (
            <LinkBoth to={show_link ? `${image.link}` : ''} key={image._id}>
              <>
                <img
                  src={`${IMAGE_BASE}${image.image.path}`}
                  alt={image.caption}
                />
                {show_caption && <h6>{image.caption}</h6>}
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
