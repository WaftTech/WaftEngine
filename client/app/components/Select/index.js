/**
 *
 * Select
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

const SelectWrapper = props => {
  return <Select {...props} />;
};

SelectWrapper.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

export default SelectWrapper;
