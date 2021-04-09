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
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="py-20 container mx-auto">
        <h1 className="text-5xl">
          <FormattedMessage {...messages.header} />
        </h1>
        <p className="text-gray-500">You can <Link className="text-link" to="/">return to our front page</Link>, or <Link className="text-link" to="contact">drop us a line</Link> if you can't find what you're looking for.
</p>
      </div>
    );
  }
}
