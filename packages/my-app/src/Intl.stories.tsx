import type { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText } from 'react-native-my-text';

const TestComponent: FC = () => {
  return (
    <View testID="outer-box" style={styles.outerBox}>
      <MyText>
        {JSON.stringify(Intl.supportedValuesOf('collation'), null, 2)}
      </MyText>
      <MyText>
        {JSON.stringify(Intl.supportedValuesOf('currency'), null, 2)}
      </MyText>
      <MyText>
        {JSON.stringify(Intl.supportedValuesOf('numberingSystem'), null, 2)}
      </MyText>
      <MyText>
        {JSON.stringify(Intl.supportedValuesOf('timeZone'), null, 2)}
      </MyText>
      <MyText>{JSON.stringify(Intl.supportedValuesOf('unit'), null, 2)}</MyText>
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

const meta: Meta<typeof TestComponent> = {
  title: 'Intl',
  component: TestComponent,
  parameters: {
    notes: 'This checks the functionality of the Intl module.',
  },
};

export default meta;

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {},
};
