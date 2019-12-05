import React from 'react';

const Input = (props) => (
  <React.Fragment>
    {props.label && <label
      className="label"
      htmlFor="grid-last-name"
    >
      {props.label}
    </label>}
    <input
      className={props.inputClassName}
      id={props.inputId}
      type={props.inputType || 'text'}
      value={props.value || ''}
      name={props.name || 'name'}
      onChange={props.onChange}

    />
    {props.error && <div id={props.errorClassName || 'component-error-text'}>
      {props.error}
    </div>}
  </React.Fragment>
);

export default Input;
