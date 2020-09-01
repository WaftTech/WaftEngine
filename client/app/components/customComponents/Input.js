import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  label,
  id,
  error,
  errorClassName,
  children,
  subLabel,
  ...restProps
}) => (
  <>
    {label && (
      <label
        className="font-bold text-gray-700"
        htmlFor={`grid-last-name-${id}`}
      >
        {label}
      </label>
    )}
    {subLabel && <div className="text-xs text-gray-500">{subLabel}</div>}
    <input
      className="inputbox"
      id={`grid-last-name-${id}`}
      type="text"
      {...restProps}
    />
    {children && <>{children}</>}
    {error && <div id={errorClassName || 'component-error-text'}>{error}</div>}
  </>
);

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  subLabel: PropTypes.string,
  errorClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const CustomInput = ({
  label,
  inputid,
  inputType,
  inputclassName,
  value,
  name,
  error,
  errorClassName,
  children,
  ...restProps
}) => (
  <React.Fragment>
    {label && (
      <label
        className="font-bold text-gray-700"
        htmlFor={`grid-last-name-${inputid}`}
      >
        {label}
      </label>
    )}
    <input
      className={inputclassName}
      id={`grid-last-name-${inputid}`}
      type={inputType || 'text'}
      value={value || ''}
      name={name || 'name'}
      {...restProps}
    />
    {children && <>{children}</>}
    {error && <div id={errorClassName || 'component-error-text'}>{error}</div>}
  </React.Fragment>
);

export default CustomInput;
