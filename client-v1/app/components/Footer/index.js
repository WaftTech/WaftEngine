/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Footer = () => {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
