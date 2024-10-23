import type { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import { ColorValue, Dimensions, StyleSheet, Text, View } from 'react-native';
import { PreviewViewMode } from '@sb/preview';

type TestComponentProps = {
  text: string;
  backgroundColor: ColorValue;
  height: number;
  outerBoxFlex: boolean;
};
const TestComponentWithOuterBox: FC<TestComponentProps> = ({
  text,
  backgroundColor,
  height,
  outerBoxFlex,
}) => (
  <View
    testID="outer-box"
    style={[styles.outerBox, outerBoxFlex ? { flex: 1 } : {}]}
  >
    <View
      testID="inner-box"
      style={[styles.innerBox, { backgroundColor, height }]}
    >
      <Text testID="inner-text">{text}</Text>
    </View>
  </View>
);

const TestComponentWithoutOuterBox: FC<TestComponentProps> = ({
  text,
  backgroundColor,
  height,
}) => (
  <View
    testID="inner-box"
    style={[styles.innerBox, { backgroundColor, height }]}
  >
    <Text testID="inner-text">{text}</Text>
  </View>
);

const TestComponent: FC<
  TestComponentProps & {
    outerBox: boolean;
  }
> = ({ outerBox, ...props }) =>
  outerBox ? (
    <TestComponentWithOuterBox {...props} />
  ) : (
    <TestComponentWithoutOuterBox {...props} />
  );
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
    justifyContent: 'center', // Center content vertically inside the box
    alignItems: 'center', // Center content horizontally inside the box
  },
});

const meta: Meta<typeof TestComponent> = {
  title: 'Storybook View',
  component: TestComponent,
  parameters: {
    notes: `This story ensures that the Storybook previewing works correctly.

What is being tested is the safe areas and scrollability of the story component.

On Android, "Default" and "No Scroll View" appears to work the same way as the ScrollView component will not bounce past it's bounds.
`,
  },
};

export default meta;

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {
    text: 'Inner text',
    backgroundColor: '#a819b9',
    outerBox: true,
    outerBoxFlex: false,
    height: 200,
  },
};

export const Tall: Story = {
  args: {
    text: 'Inner text',
    backgroundColor: '#a819b9',
    outerBox: true,
    outerBoxFlex: false,
    height: Dimensions.get('window').height * 2,
  },
};

export const NoScrollView: Story = {
  args: {
    text: 'No Scroll View',
    backgroundColor: '#a819b9',
    outerBoxFlex: false,
    outerBox: true,
    height: 200,
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Centered: Story = {
  args: {
    text: 'Centered',
    backgroundColor: '#a819b9',
    outerBoxFlex: false,
    outerBox: false,
    height: 200,
  },
  parameters: {
    previewViewMode: PreviewViewMode.CENTERED,
  },
};
