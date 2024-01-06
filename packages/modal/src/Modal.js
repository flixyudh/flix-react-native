import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const { height } = Dimensions.get('window');

const PressableAnimation = Animated.createAnimatedComponent(Pressable);

/**
 * @typedef {object} ModalData
 * @prop {function} hide - Function to hide the modal.
 * @prop {function} renderItem - Function to render the content of the modal.
 * @prop {boolean} disabledBackdrop - Flag to disable the backdrop press.
 * @prop {function} onPressBackdrop - Function to handle the press on the backdrop.
 * @prop {number} duration - Duration of the animation in milliseconds.
 * @prop {string} animationType - Type of animation for the modal ('fade' or 'slide').
 * @prop {object} styleContainer - Custom styles for the modal container.
 */

/**
 * @file Modal.js
 * @brief Modal component that can be used to display a modal with different animation types.
 *
 * @param {ModalData} Props
 *
 * @returns {JSX.Element} The Modal component.
 */
const Modal = ({
  hide,
  renderItem,
  disabledBackdrop = false,
  onPressBackdrop,
  duration = 300,
  animationType = false,
  styleContainer,
}) => {
  const animation = React.useRef(new Animated.Value(0)).current;

  const interpolateAnimation = (inputRange, outputRange) => {
    return animation.interpolate({
      inputRange,
      outputRange,
    });
  };

  const runAnimated = (toValue) => {
    return Animated.timing(animation, {
      toValue,
      duration,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    });
  };

  React.useEffect(() => {
    if (animationType) runAnimated(1).start();
  }, [animationType]);

  const onHide = (cb) => {
    if (!animationType) {
      onPressBackdrop?.();
      hide();
    } else {
      runAnimated(0).start(() => {
        onPressBackdrop?.();
        hide();
      });
    }
  };

  const fadeStyle = {
    opacity: animation,
    transform: [{ scale: animation }],
  };

  const slideStyle = {
    transform: [{ translateY: interpolateAnimation([0, 1], [height / 2, 0]) }],
  };

  const animationStyle = () => {
    switch (animationType) {
      case 'fade':
        return fadeStyle;
      case 'slide':
        return slideStyle;
      default:
        return {};
    }
  };

  const RenderComponent = React.useCallback(() =>
    React.createElement(renderItem)
  );

  return (
    <PressableAnimation
      onPress={onHide}
      activeOpacity={1}
      disabled={disabledBackdrop}
      style={[
        styles.container,
        {
          backgroundColor: '#332f3766',
          opacity: animationType ? animation : 1,
        },
        styleContainer,
      ]}
    >
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            animationStyle(),
            { backgroundColor: '#fffbff' },
            styles.content,
          ]}
        >
          <RenderComponent renderItem={renderItem} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </PressableAnimation>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
    justifyContent: 'center',
  },
  content: {
    padding: 14,
    margin: 14,
    borderRadius: 5,
  },
});

export default Modal;
