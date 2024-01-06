import React from 'react';
import { Button, Text, View } from 'react-native';
import { useModal } from '@flix-react-native/modal';

const Example = (props) => {
  const { show, hide } = useModal();

  const RenderModal = React.useCallback(() => (
    <View>
      <Text>I'm Modal</Text>
      <Button title="close" onPress={() => hide()} />
    </View>
  ));

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginBottom: 24, textAlign: 'center', fontSize: 18 }}>
        Example usage for Modal
      </Text>
      <Button
        title="Open Modal"
        onPress={() => show(RenderModal, { animationType: 'fade' })}
      />
    </View>
  );
};

export default Example;
