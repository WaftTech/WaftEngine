import React from 'react';
import PropTypes from 'prop-types';

export default function Crumb(props) {
  return (
    <>
      <li>{props.children}</li>
      {!props.isLast && (
        <li>
          <span className="mx-2">/</span>
        </li>
      )}
    </>
  );
}

Crumb.propTypes = {
  children: PropTypes.node.isRequired,
};
