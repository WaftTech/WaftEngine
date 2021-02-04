/**
 *
 * DropdownMenu
 *
 */

import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function useComponentVisible(initialIsVisible, setShowList) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible,
  );
  const ref = useRef(null);

  const handleClickOutside = event => {
    // uses ref to check if outside of Div is clicked
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
      if (setShowList === undefined) {
        console.log('!! onClose function not passed to dialog component. !!');
      } else {
        setShowList(false);
      }
    }
  };

  useEffect(() => {
    // document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      // document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

const DropdownMenu = ({ main, items }) => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(open, handleClose);

  return (
    <>
      <div className="mt-2 p-2" onClick={() => handleMenu()}>
        {main}
      </div>
      {open ? (
        <>
          <div
            className="w-screen h-screen z-40 fixed top-0 left-0 overflow-auto"
            onClick={handleClose}
          />
          <div
            className={`fixed overflow-auto left-2/4 top-2/4 z-50 shadow-lg transform -translate-x-2/4 -translate-y-2/4 rounded-lg bg-white slide-dialog  `}
          >
            <div onClick={() => handleMenu()} className="p-2 border-2">
              {items && items}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

DropdownMenu.propTypes = {};

export default DropdownMenu;
