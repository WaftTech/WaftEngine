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
import messages from './messages';
import StaticContentDiv from '../../components/StaticContentDiv';
import SlickSlider from '../../components/SlickSlider';
import mainImage from './home.png';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { classes, category } = this.props;

    return (
      <React.Fragment>
        <img
          style={{ width: '100%', maxWidth: '1440px' }}
          src={mainImage}
          alt="template"
        />
        <SlickSlider slideKey="manoj-dai" />
      </React.Fragment>
    );
  }
}
