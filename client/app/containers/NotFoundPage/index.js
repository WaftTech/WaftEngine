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

import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageSwitcher from "components/LanguageSwitcher";

import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <div>
        <h1 className="loud404">
          <span> 404</span>
        </h1>
        <h2 className="text-center">SORRY! PAGE NOT FOUND</h2>

        {/* <FormattedMessage {...messages.header} />
        <LanguageSwitcher /> */}
      </div>
    );
  }
}
