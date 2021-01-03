/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Panel
 *
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Panel = ({ title, body, open, key }) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const [openVal, setOpenVal] = useState(open || panelOpen);

  const handlePanel = () => {
    setPanelOpen(!panelOpen);
    if (!open) {
      setOpenVal(!openVal);
    }
  };

  return (
    <div
      className="border rounded mb-4"
      key={key}
      onClick={() => handlePanel()}
    >
      <div aria-controls="panel2a-content" id="panel2a-header">
        <h3 className="text-bold text-base px-4 py-3 border-b">
          {title}
          <span
            className={`float-right text-lg ${openVal ? 'transform rotate-180' : ''
              }`}
          >
            {' '}
            ^
          </span>
        </h3>
      </div>
      {openVal && <p className="text-base p-3 leading-loose">{body}</p>}
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
  open: PropTypes.bool,
  key: PropTypes.string,
};

export default Panel;
