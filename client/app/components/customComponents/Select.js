import React from 'react';

const Select = ({
  label,
  inputclassName,
  value,
  name,
  options,
  error,
  errorClassName,
  emptyValue, // this props is used to name the option with empty value
  ...restProps
}) => (
  <React.Fragment>
    {label && (
      <label className="font-bold text-gray-700">
        {label}
      </label>
    )}
    <select
      className={inputclassName}
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

export default Select;
