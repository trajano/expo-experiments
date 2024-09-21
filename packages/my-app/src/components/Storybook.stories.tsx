import type { Meta, StoryObj } from '@storybook/react';
import { HelloWave } from './HelloWave';
import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

const TestComponent: FC = () => {
  return (
    <View style={styles.outerBox}>
      <View style={styles.innerBox}>
        <Text>Inner text</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    backgroundColor: '#111', // Teal background for outer box
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    width: '100%', // Fills the width of the parent
    borderWidth: 1,
    borderColor: 'white',
  },
  innerBox: {
    width: 200, // 200px width
    height: 200, // 200px height
    backgroundColor: 'yellow', // Yellow background for the inner box
    justifyContent: 'center', // Center content vertically inside the box
    alignItems: 'center', // Center content horizontally inside the box
  },
});

const meta: Meta<typeof HelloWave> = {
  title: 'Storybook View',
  component: TestComponent,
  parameters: {
    notes: 'This is to ensure that Storybook views render correctly.',
  },
};

export default meta;

type Story = StoryObj<typeof HelloWave>;

export const Default: Story = {
  args: {},
};
