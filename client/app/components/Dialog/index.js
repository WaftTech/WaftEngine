/**
 *
 * Dialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Dialog = ({ open, onClose, className, title, body, actions }) => {
  return open ? (
    <div className=" w-full flex  h-screen my-auto justify-center items-center z-10 fixed top-0 left-0 bg-black bg-opacity-25">
      <div
        className={`shadow-md bg-white   ${
          className && className !== '' ? className : 'w-1/2'
        } `}
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
