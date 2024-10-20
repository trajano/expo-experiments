import type { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import { ColorValue, StyleSheet, Text, View } from 'react-native';
import { PreviewViewMode } from '@sb/preview';

const TestComponent: FC<{ text: string; backgroundColor: ColorValue }> = ({
  text,
  backgroundColor,
}) => {
  return (
    <View testID="outer-box" style={styles.outerBox}>
      <View testID="inner-box" style={[styles.innerBox, { backgroundColor }]}>
        <Text testID="inner-text">{text}</Text>
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
    justifyContent: 'center', // Center content vertically inside the box
    alignItems: 'center', // Center content horizontally inside the box
  },
});

const meta: Meta<typeof TestComponent> = {
  title: 'Storybook View',
  component: TestComponent,
  parameters: {
    notes: 'This is to ensure that Storybook views render correctly.',
  },
};

export default meta;

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {
    text: 'Inner text',
    backgroundColor: '#a819b9',
  },
};

export const NoScrollView: Story = {
  args: {
    text: 'No Scroll View',
    backgroundColor: '#a819b9',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Centered: Story = {
  args: {
    text: 'Centered',
    backgroundColor: '#a819b9',
  },
  parameters: {
    previewViewMode: PreviewViewMode.CENTERED,
  },
};
