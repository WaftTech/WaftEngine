/**
 *
 * Select
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: 14,
  }),
  control: (provided, state) => ({
    ...provided,
    "&:hover": {
      borderColor: state.isFocused ? '#63b3ed' : "#d4d4d8",
    },
    boxShadow: state.isFocused ? '0 0 0 2px #bee3f8' : null,
    borderColor: state.isFocused ? '#63b3ed' : "#d4d4d8",
  }),

  // box-shadow: ;
  //   border: 1px solid #63b3ed;

  container: state => ({
    width: '100%',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  singleValue: state => ({
    fontSize: 14,
  }),
  placeholder: (provided, state) => ({
    fontSize: 14,
    opacity: 0.5
  })
}
const SelectWrapper = props => {
  return <div className="relative">
    <Select
      isSearchable
      styles={customStyles}
      {...props} />
  </div>
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
