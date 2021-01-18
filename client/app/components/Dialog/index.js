/**
 *
 * Dialog
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

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

const Dialog = ({ open, onClose, className, title, body, actions }) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(open, onClose);

  return open ? (
    <div className=" w-full flex  h-screen my-auto justify-center items-center z-10 fixed top-0 left-0 bg-black bg-opacity-25">
      <div
        className={`shadow-md bg-white   ${
          className && className !== '' ? className : 'w-1/2'
        } `}
        ref={ref}
      >
        {title !== undefined && (
          <div className="flex flex-wrap justify-between p-2 border-b border-2">
            {title}{' '}
            <button
              type="button"
              className="underline text-red-400 "
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
        {body !== undefined && <div className="p-4">{body}</div>}
        {actions !== undefined && (
          <div className="border-t border-2 p-2 flex justify-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.any,
  body: PropTypes.any,
  actions: PropTypes.any,
};

export default Dialog;
