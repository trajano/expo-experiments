import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import type { Preview } from '@storybook/react';
import { ComponentType } from 'react';
import { Appearance, ScrollView, StyleSheet } from 'react-native';

const preview: Preview = {
  decorators: [
    (Story: ComponentType) => (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Story />
      </ScrollView>
    ),
    withBackgrounds,
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: Appearance.getColorScheme() === 'dark' ? 'dark' : 'plain',
      values: [
        { name: 'plain', value: 'white' },
        { name: 'dark', value: '#333' },
        { name: 'app', value: '#eeeeee' },
      ],
    },
  },
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content can grow and scroll when necessary
  },
});
export default preview;
