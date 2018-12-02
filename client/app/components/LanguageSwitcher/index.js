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

function LanguageSwitcher(props) {
  const { changeLocale } = props;
  return (
    <div>
      <span onClick={() => changeLocale('en')}>English</span>|
      <span onClick={() => changeLocale('nl')}>नेपाली</span>
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
