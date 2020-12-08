import React from 'react';
import PropTypes from 'prop-types';
import ReactSelectLibrary from 'react-select';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Select = ({
  label,
  id,
  options,
  error,
  errorClassName,
  emptyValue = 'Select...', // this props is used to name the option with empty value
  ...restProps
}) => (
  <>
    {label && (
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    )}
    <select id={id} {...restProps}>
      <option className="test-gray-300" key="0" name="all" value="">
        {emptyValue}
      </option>
      {options.map(each => (
        <option key={each.key} value={each.value}>
          {each.key}
        </option>
      ))}
    </select>
    {error && <div id={errorClassName || 'component-error-text'}>{error}</div>}
  </>
);

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  emptyValue: PropTypes.string,
  error: PropTypes.string,
  errorClassName: PropTypes.string,
  options: PropTypes.array,
};

const CustomSelect = ({
  label,
  className,
  value,
  name,
  options,
  error,
  errorClassName,
  emptyValue, // this props is used to name the option with empty value
  ...restProps
}) => (
  <React.Fragment>
    {label && <label className="text-sm">{label}</label>}
    <select
      className={className}
      value={value || ''}
      name={name || 'name'}
      {...restProps}
    >
      <option key="0" name="all" value="">
        {emptyValue || '---Select---'}
      </option>
      {options.map(each => (
        <option key={each.key} value={each.value}>
          {each.key}
        </option>
      ))}
    </select>
    {error && <div id={errorClassName || 'component-error-text'}>{error}</div>}
  </React.Fragment>
);

export function DatePicker({
  label,
  name,
  id,
  selected,
  handleChange,
  placeholder = 'MM/DD/YYYY',
  ...resProps
}) {
  return (
    <>
      {label && (
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      )}
      <ReactDatePicker
        id={id}
        name={name}
        selected={selected}
        className="inputbox"
        placeholderText={placeholder}
        onChange={handleChange}
        {...resProps}
      />
    </>
  );
}

export function ReactSelect({
  value,
  handleSelect,
  options,
  label,
  name,
  ...resProps
}) {
  return (
    <>
      {label && <label className="text-sm">{label}</label>}
      <ReactSelectLibrary
        name={name}
        className="inputbox"
        value={value}
        onChange={handleSelect}
        options={options}
        {...resProps}
      />
    </>
  );
}

export default CustomSelect;
