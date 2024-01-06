import React from 'react';
import InternalUseModal from './internalUseModal';
import Modal from './Modal';

/**
 * @typedef {object} OptionsType
 * @prop {boolean} disabledBackdrop - Flag to disable the backdrop press.
 * @prop {function} onPressBackdrop - Function to handle the press on the backdrop.
 * @prop {number} duration - Duration of the animation in milliseconds.
 * @prop {string} animationType - Type of animation for the modal ('fade' or 'slide').
 * @prop {import('react-native').ViewProps} style - Custom styles for the modal container.
 */

/**
 * @callback show
 * @param {React.JSX} renderItem
 * @param {OptionsType} options
 */
export const ModalContext = React.createContext({
  /**
   * @callback show
   * @param {React.JSX} renderItem
   * @param {OptionsType} options
   */
  show: (renderItem, options) => null,
  /**
   * function to hide modal
   *
   * @returns {void}
   */
  hide: () => null,
});

/**
 * @file ModalProvider.js
 * @brief This component is used as a provider for the ModalContext.
 *
 * @typedef ModalProviderProps
 * @type {Object}
 * @prop {React.FC} children - The children components.
 * @prop {import('react-native').ViewProps} style - The style object for the component.
 *
 * @param {ModalProviderProps} props
 * @returns {JSX.Element} The ModalProvider component.
 */
export default ({ children, style }) => {
  const { ModalData, show, hide } = InternalUseModal();
  const contextValue = React.useMemo(
    () => ({ ModalData, show, hide }),
    [ModalData, show, hide]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {ModalData && <Modal key={ModalData?.id} {...ModalData} style={style} />}
    </ModalContext.Provider>
  );
};
