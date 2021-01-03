/**
 *
 * LinkBoth
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const isExternal = function (url) {
  const host = window.location.hostname;

  const linkHost = (function (url) {
    if (/^https?:\/\//.test(url)) {
      const parser = document.createElement('a');
      parser.href = url;

      return parser.hostname;
    }
    return window.location.hostname;
  })(url);

  return host !== linkHost;
};
/* eslint-disable react/prefer-stateless-function */
class LinkBoth extends React.PureComponent {
  render() {
    return isExternal(this.props.to) ? (
      <a target="_blank" href={this.props.to} {...this.props} />
    ) : (
        <Link {...this.props} />
      );
  }
}

LinkBoth.propTypes = {
  to: PropTypes.string.isRequired,
};

export default LinkBoth;
