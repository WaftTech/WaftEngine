import React from 'react';
import PropTypes from 'prop-types';

export default function Crumb(props) {
  return (
    <>
      <li>{props.children}</li>
      {!props.isLast && (
        <li>
          <span className="flex items-center">
            <i className="material-icons">keyboard_arrow_right</i>
          </span>
        </li>
      )}
    </>
  );
}

Crumb.propTypes = {
  children: PropTypes.node.isRequired,
};
