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
        htmlFor={`${id}`}
      >
        {label}
      </label>
    )}
    {subLabel && <div className="text-xs text-gray-500">{subLabel}</div>}
    <input
      className="inputbox"
      id={`${id}`}
      type="text"
      {...restProps}
    />
    {children && <>{children}</>}
    {error && <div className={errorClassName || 'error'}>{error}</div>}
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
  tooltip,
  ...restProps
}) => (
  <React.Fragment>
    {label && (
      <>
        <label
          htmlFor={`${inputid}`}
        >
          {label}
          {tooltip && (
            <span className="tooltip ml-1">
              <i className="material-icons text-sm">info</i>
              <span className="tooltip-content">{tooltip}</span>
            </span>
          )}
        </label>
      </>
    )}
    {children && <>{children}</>}
    <input
      className={inputclassName}
      id={`${inputid}`}
      type={inputType || 'text'}
      value={value || ''}
      name={name || 'name'}
      tooltip={tooltip || ''}
      {...restProps}
    />
    {/* {children && <>{children}</>} */}
    {error && <div className={errorClassName || 'error'}>{error}</div>}
  </React.Fragment>
);

export default CustomInput;
