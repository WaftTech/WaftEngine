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
      <div className="flex items-center hover:bg-gray-100" onClick={() => handleMenu()}>
        <div className="relative px-6">
        {main}
        {open ? (
        <>
          <div
            className="w-screen h-screen z-40 fixed top-0 left-0 overflow-auto"
            onClick={handleClose}
          />
         
            <div className="z-50 shadow absolute right-0 w-64 bg-white border mt-4" onClick={() => handleMenu()}>
              {items && items}
            </div>
        </>
      ) : null}
        </div>
      </div>
    </>
  );
};

DropdownMenu.propTypes = {};

export default DropdownMenu;
