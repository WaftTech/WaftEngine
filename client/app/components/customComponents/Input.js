import React from 'react';

const Input = ({
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

export default Input;
