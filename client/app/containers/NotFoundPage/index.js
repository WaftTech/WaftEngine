/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import logo from '../../assets/img/logo-icon.svg';
import './404.css';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="py-10 mx-auto text-center overflow-hidden h-full">
        <h1 className="font-light text-4xl">
          <FormattedMessage {...messages.header} />
        </h1>
        <div className="logo-swing">
          <img src={logo} className="logo opacity-25" />
          <img id="hinge" src={logo} className="logo hinge" />
        </div>
      </div>
    );
  }
}
