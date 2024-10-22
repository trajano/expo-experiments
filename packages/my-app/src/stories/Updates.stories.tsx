import type { Meta, StoryObj } from '@storybook/react';
import * as Updates from 'expo-updates';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText, Strong } from 'react-native-my-text';

// List of enum objects to be excluded
const enumKeysToRemove = [
  'UpdateCheckResultNotAvailableReason',
  'UpdateInfoType',
  'UpdatesCheckAutomaticallyValue',
  'UpdatesLogEntryCode',
  'UpdatesLogEntryLevel',
];

const customReplacer = (key: string, value: any) => {
  if (enumKeysToRemove.includes(key)) {
    return undefined; // Exclude these enum objects
  }
  return value; // Keep everything else
};

const updateConstants = JSON.stringify(Updates, customReplacer, 2);
const ExpoUpdatesView: FC = () => {
  const updatesState = Updates.useUpdates();
  return (
    <View style={styles.container}>
      <MyText style={styles.text}>
        {JSON.stringify(updatesState, null, 2)}
      </MyText>
      <MyText style={styles.text}>
        <Strong>Constants</Strong>:
      </MyText>
      <MyText style={styles.text}>{updateConstants}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    borderWidth: 1,
    borderColor: 'red',
  },
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito',
  },
});

const meta: Meta<typeof ExpoUpdatesView> = {
  title: 'Updates',
  component: ExpoUpdatesView,
  parameters: {
    notes: 'This checks expo-updates information.',
  },
};

export default meta;

type Story = StoryObj<typeof ExpoUpdatesView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
