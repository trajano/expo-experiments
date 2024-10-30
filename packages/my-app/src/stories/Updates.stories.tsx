import _ from 'lodash';
import type { Meta, StoryObj } from '@storybook/react';
import * as Updates from 'expo-updates';
import { FC, useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { MyText, Strong } from 'react-native-my-text';
import JSONTree, { JSONTreeProps } from 'react-native-json-tree';

// List of enum objects to be excluded
const enumKeysToRemove = [
  'UpdateCheckResultNotAvailableReason',
  'UpdateInfoType',
  'UpdatesCheckAutomaticallyValue',
  'UpdatesLogEntryCode',
  'UpdatesLogEntryLevel',
];

const labelRenderer: JSONTreeProps['labelRenderer'] = (keypath) => (
  <MyText style={{ fontSize: 20 }}>{keypath[0]}</MyText>
);
const valueRenderer: JSONTreeProps['valueRenderer'] = (raw) => (
  <MyText style={{ fontSize: 16 }}>
    {typeof raw === 'string' ? raw : JSON.stringify(raw)}
  </MyText>
);
const updateConstants = _.omit(Updates, enumKeysToRemove);
const ExpoUpdatesView: FC = () => {
  const updatesState = Updates.useUpdates();
  const checkForUpdates = useCallback(async () => {
    await Updates.checkForUpdateAsync();
  }, []);
  const fetchUpdate = useCallback(async () => {
    await Updates.fetchUpdateAsync();
  }, []);
  const reload = useCallback(async () => {
    await Updates.reloadAsync();
  }, []);
  return (
    <View style={styles.container}>
      <MyText>
        <Strong>Is update available</Strong>:{' '}
        {updatesState.isUpdateAvailable ? 'Yes' : 'No'}
      </MyText>
      <MyText>
        <Strong>Is update pending</Strong>:{' '}
        {updatesState.isUpdatePending ? 'Yes' : 'No'}
      </MyText>
      <MyText>
        <Strong>Is checking</Strong>: {updatesState.isChecking ? 'Yes' : 'No'}
      </MyText>
      <MyText>
        <Strong>Is isDownloading</Strong>:{' '}
        {updatesState.isDownloading ? 'Yes' : 'No'}
      </MyText>
      <Button
        title="check for updates"
        disabled={!Updates.isEnabled}
        onPress={checkForUpdates}
      />
      <Button
        title="fetch updates"
        disabled={!Updates.isEnabled}
        onPress={fetchUpdate}
      />

      <Button title="reload" disabled={!Updates.isEnabled} onPress={reload} />

      <MyText style={styles.text}>
        {JSON.stringify(updatesState, null, 2)}
      </MyText>

      <MyText style={styles.text}>
        <Strong>Constants</Strong>:
      </MyText>
      <JSONTree
        data={updateConstants}
        shouldExpandNode={(keyName) => keyName !== 'assets'}
        hideRoot={true}
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
      />
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
