/**
 *
 * LinkBoth
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isExternal from 'is-url-external';
import { Link } from 'react-router-dom';

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
