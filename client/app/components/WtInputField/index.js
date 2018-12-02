/**
 *
 * WtInputField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import AutoNumberField from './AutoNumberField';
import Checkbox from './Checkbox';
import Date from './Date';
import DateTime from './DateTime';
import Decimal from './Decimal';
import Email from './Email';
import FileUpload from './FileUpload';
import LongInteger from './LongInteger';
import Lookup from './Lookup';
import MultiLine from './MultiLine';
import MultiSelect from './MultiSelect';
import MultiSelectLookup from './MultiSelectLookup';
import Phone from './Phone';
import PickList from './PickList';
import SingleLine from './SingleLine';
import URL from './URL';
import User from './User';

/* eslint-disable react/prefer-stateless-function */
class WtInputField extends React.Component {
  render() {
    const { fieldType } = this.props;
    switch (fieldType) {
      case 'AutoNumberField':
        return (
          <AutoNumberField />
        );
      case 'Checkbox':
        return (
          <Checkbox />
        );
      case 'Date':
        return (
          <Date />
        );
      case 'DateTime':
        return (
          <DateTime />
        );
      case 'Decimal':
        return (
          <Decimal />
        );
      case 'Email':
        return (
          <Email />
        );
      case 'FileUpload':
        return (
          <FileUpload />
        );
      case 'LongInteger':
        return (
          <LongInteger />
        );
      case 'Lookup':
        return (
          <Lookup />
        );
      case 'MultiLine':
        return (
          <MultiLine />
        );
      case 'MultiSelect':
        return (
          <MultiSelect />
        );
      case 'MultiSelectLookup':
        return (
          <MultiSelectLookup />
        );
      case 'Phone':
        return (
          <Phone />
        );
      case 'PickList':
        return (
          <PickList />
        );
      case 'SingleLine':
        return (
          <SingleLine />
        );
      case 'URL':
        return (
          <URL />
        );
      case 'User':
        return (
          <User />
        );
    }
  }
}

WtInputField.propTypes = {
  fieldType: PropTypes.string.isRequired
};

export default WtInputField;
