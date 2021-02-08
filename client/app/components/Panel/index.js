/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Panel
 *
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

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
    <div className="border rounded mb-4" key={key}>
      <div
        aria-controls="panel2a-content"
        id="panel2a-header"
        onClick={() => handlePanel()}
      >
        <div className="w-full flex justify-between items-center hover:shadow">
          <h3 className="flex-1 m-0 text-bold text-base px-4 py-2 cursor-pointer ">
            {title}
          </h3>
          <span
            className={` flex p-2 ${openVal ? 'transform rotate-180' : ''}`}
          >
            <FaAngleDown className="opacity-75 cursor-pointer text-lg m-auto hover:opacity-1" />
          </span>
        </div>
      </div>
      {openVal && (
        <p className="text-sm border-t py-2 px-4 leading-loose">{body}</p>
      )}
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.any.isRequired,
  body: PropTypes.any.isRequired,
  open: PropTypes.bool,
  key: PropTypes.string,
};

export default Panel;
