import type { Meta, StoryObj } from '@storybook/react';

import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

const ViewPagerSample: FC = () => (
  <View style={styles.container}>
    <PagerView style={styles.container} initialPage={0}>
      <View style={styles.page} key="1">
        <Text>First page</Text>
        <Text>Swipe ➡️</Text>
      </View>
      <View style={styles.page} key="2">
        <Text>Second page</Text>
      </View>
      <View style={styles.page} key="3">
        <Text>Third page</Text>
      </View>
    </PagerView>
  </View>
);
const meta: Meta<typeof ViewPagerSample> = {
  title: 'View Pager',
  component: ViewPagerSample,
  parameters: {
    notes: 'Nothing.',
  },
};

export default meta;

type Story = StoryObj<typeof ViewPagerSample>;

export const Default: Story = {
  args: {},
  parameters: {},
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
