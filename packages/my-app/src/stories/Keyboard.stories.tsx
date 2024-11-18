import type { Meta, StoryObj } from '@storybook/react';

import { FC, useEffect, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { MyText as Text, MyTextInput as TextInput } from 'react-native-my-text';

const KeyboardSample: FC = () => {
  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <TextInput
        style={style.input}
        placeholder="Click here…"
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={style.status}>{keyboardStatus}</Text>
    </>
  );
};

const meta: Meta<typeof KeyboardSample> = {
  title: 'Keyboard',
  component: KeyboardSample,
  parameters: {
    notes: 'Nothing.',
  },
};

export default meta;

type Story = StoryObj<typeof KeyboardSample>;

export const Default: Story = {
  args: {},
  parameters: {},
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 16,
    textAlign: 'center',
  },
});
