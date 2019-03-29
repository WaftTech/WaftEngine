/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import messages from './messages';
import StaticContentDiv from '../../components/StaticContentDiv';
import mainImage from './home.png';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { classes, category } = this.props;

    const settings = {
      slidesToShow: 4,
      slidesToScroll: 3,
      dots: true,
      centerMode: true,
      centerPadding: '40px',
      autoplay: true,
      autoplaySpeed: 2000,
      focusOnSelect: true,
    };

    return (
      <React.Fragment>
        <Slider {...settings}>
          <div key={each._id}>
            <img
              className={classes.category}
              src={`${IMAGE_BASE}${each.image.path}`}
              style={{ height: 100, width: 100 }}
              alt={each.name}
            />
            {/* <h3 className={classes.categoryTitle}>{each.name}</h3> */}
          </div>
        </Slider>

        <img
          style={{ width: '100%', maxWidth: '1440px' }}
          src={mainImage}
          alt="template"
        />
        {/* <StaticContentDiv contentKey="aboutusheader" /> */}
      </React.Fragment>
    );
  }
}
