import React from 'react';

/**
 * @file InternalUseModal.js
 * This is a React component used for managing and displaying Modal.
 */
const InternalUseModal = () => {
  const [ModalData, setModalData] = React.useState(null);

  const show = React.useCallback((renderItem, options) => {
    const id = Date.now().toString(36);
    requestAnimationFrame(() => {
      setModalData({ renderItem, id, hide, ...options });
    });
  }, []);

  const hide = React.useCallback(() => {
    setModalData(null);
  }, []);

  return {
    /** @type {import("./Modal").ModalData} */
    ModalData,
    /**
     * A function to display a Modal.
     *
     * @param {React.JSX} renderItem
     * @param {import('./ModalProvider').OptionsType} options
     */
    show,
    /**
     * A function to hide a Modal.
     *
     * @returns {void}
     */
    hide,
  };
};

export default InternalUseModal;
