import type { Meta, StoryObj } from '@storybook/react';
import {
  BatteryState,
  useBatteryLevel,
  useBatteryState,
  useLowPowerMode,
  usePowerState,
} from 'expo-battery';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText } from 'react-native-my-text';
const BatteryView: FC = () => {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();
  const lowPowerMode = useLowPowerMode();
  const powerState = usePowerState();
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>Battery Level</MyText>
      </View>
      <MyText style={styles.text}>
        {JSON.stringify(batteryLevel, null, 2)}
      </MyText>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>Battery State</MyText>
      </View>
      <MyText style={styles.text}>{BatteryState[batteryState]}</MyText>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>Low Power Mode</MyText>
      </View>
      <MyText style={styles.text}>
        {JSON.stringify(lowPowerMode, null, 2)}
      </MyText>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>Power State</MyText>
      </View>
      <MyText style={styles.text}>{JSON.stringify(powerState, null, 2)}</MyText>
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
  sectionHeader: {
    padding: 10,
    backgroundColor: 'black',
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    color: 'white',
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

const meta: Meta<typeof BatteryView> = {
  title: 'Battery',
  component: BatteryView,
  parameters: {
    notes: 'This checks Battery information.',
  },
};

export default meta;

type Story = StoryObj<typeof BatteryView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
