import { useNetInfo, addEventListener } from '@react-native-community/netinfo';
import type { Meta, StoryObj } from '@storybook/react';
import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText, Strong } from 'react-native-my-text';
import * as Network from 'expo-network';

const NetInfoView: FC = () => {
  const netInfoState = useNetInfo();
  const [ipAddress, setIpAddress] = useState('');
  const [networkState, setNetworkState] = useState<Network.NetworkState>({
    type: Network.NetworkStateType.UNKNOWN,
  });
  useEffect(() => {
    let mounted = true;
    const unsubscribe = addEventListener(async () => {
      // though this can also update netInfoState, useNetInfo is utilized.
      // this effect is primarily to get the values from expo-network that
      // does not have a listener pattern.
      const nextIpAddress = await Network.getIpAddressAsync();
      const nextNetworkState = await Network.getNetworkStateAsync();
      if (mounted) {
        setIpAddress(nextIpAddress);
        setNetworkState(nextNetworkState);
      }
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.container}>
      <MyText style={styles.text}>
        {JSON.stringify(netInfoState, null, 2)}
      </MyText>
      <MyText style={styles.text}>
        <Strong>IP Address</Strong>: {ipAddress}
      </MyText>
      <MyText style={styles.text}>
        <Strong>Network State:</Strong>{' '}
        {Network.NetworkStateType[networkState.type!]}
      </MyText>
      <MyText style={styles.text}>
        {JSON.stringify(networkState, null, 2)}
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
  title: 'NetInfo',
  component: NetInfoView,
  parameters: {
    notes: 'This checks Network information.',
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
