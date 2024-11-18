import type { Meta, StoryObj } from '@storybook/react';

import { FC, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Switch } from 'react-native';
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
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      <TextInput
        style={style.input}
        placeholder="Click here…"
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={style.status}>{keyboardStatus}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </>
  );
};

const meta: Meta<typeof KeyboardSample> = {
  title: 'Keyboard and Switch',
  component: KeyboardSample,
  parameters: {
    notes: 'Tests React Native Keyboard and Switch',
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
