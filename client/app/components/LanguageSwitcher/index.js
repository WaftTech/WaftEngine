/**
 *
 * LanguageSwitcher
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeLocale } from 'containers/LanguageProvider/actions';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function LanguageSwitcher(props) {
  const { changeLocale } = props;
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <div onClick={() => changeLocale('en')}>English</div>
      <div onClick={() => changeLocale('nl')}>Nepali</div>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  changeLocale: PropTypes.func.isRequired,
};

export default connect(
  null,
  { changeLocale },
)(LanguageSwitcher);
