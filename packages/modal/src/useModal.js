import React from 'react';
import { ModalContext } from './ModalProvider';

/**
 * @file useModal.js
 * @brief This hook is used to access the ModalContext and retrieve the show function.
 *
 * @throws {Error} Throws an error if the ModalContext is not defined.
 */

const useModal = () => {
  const ModalCTX = React.useContext(ModalContext);
  if (!ModalCTX) {
    throw new Error('useModal must be defined.');
  }

  return ModalCTX;
};

export default useModal;
