import {
  addEventListener,
  NetInfoState,
  NetInfoStateType,
} from '@react-native-community/netinfo';
import type { Meta, StoryObj } from '@storybook/react';
import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText } from 'react-native-my-text';
const NetInfoView: FC = () => {
  const [netInfoState, setNetInfoState] = useState<NetInfoState>({
    type: NetInfoStateType.unknown,
    isConnected: null,
    isInternetReachable: null,
    details: null,
  });
  useEffect(() => {
    const unsubscribe = addEventListener((nextState) => {
      setNetInfoState(nextState);
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <MyText style={styles.text}>
        {JSON.stringify(netInfoState, null, 2)}
      </MyText>
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

const meta: Meta<typeof NetInfoView> = {
  title: 'Debug',
  component: NetInfoView,
  parameters: {
    notes:
      'This checks the functionality of the ECMAScript Internationalization API.',
  },
};

export default meta;

type Story = StoryObj<typeof NetInfoView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
