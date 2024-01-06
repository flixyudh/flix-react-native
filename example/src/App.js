import * as React from 'react';

import { SnackbarProvider } from '@flix-react-native/snackbar';
import { ModalProvider } from '@flix-react-native/modal';
import Snackbar from './Snackbar';
import Modal from './Modal';
import { Button, View } from 'react-native';

export default function App() {
  const [Example, setExample] = React.useState({
    label: 'Snackbar',
    component: Snackbar,
  });

  const RenderExample = [
    { label: 'Snackbar', component: Snackbar },
    { label: 'Modal', component: Modal },
  ];

  return (
    <SnackbarProvider>
      <ModalProvider>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {RenderExample.map((x) => (
              <View
                key={x.label}
                style={{ marginHorizontal: 14, alignSelf: 'center' }}
              >
                <Button title={x.label} onPress={() => setExample(x)} />
              </View>
            ))}
          </View>
          <View
            style={{
              marginTop: 48,
              borderWidth: 1,
              padding: 24,
              margin: 24,
              borderRadius: 5,
            }}
          >
            <Example.component />
          </View>
        </View>
      </ModalProvider>
    </SnackbarProvider>
  );
}
