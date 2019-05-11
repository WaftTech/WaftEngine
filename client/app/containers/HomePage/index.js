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
import Link from 'react-router-dom/Link';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { classes, category } = this.props;

    return (
      <div className="container mx-auto pt-12 pb-12">
        <p className="">
          For Admin Login:
          <br />
          <Link className="text-blue" to="/login-admin">
            /login-admin
          </Link>
        </p>
        <br />
        <br />
        <p className="">
          For Documentation:
          <br />
          <a
            className="text-blue"
            target="_blank"
            href="http://www.waftengine.org"
          >
            http://www.waftengine.org/docs
          </a>
        </p>
      </div>
    );
  }
}
