import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import type { Preview } from '@storybook/react';
import { ComponentType } from 'react';
import { Appearance, ScrollView, StyleSheet, View } from 'react-native';

export enum PreviewViewMode {
  SCROLL_VIEW,
  NO_SCROLL_VIEW,
  CENTERED,
}
const preview: Preview = {
  decorators: [
    (Story: ComponentType, context) => {
      if (
        context.parameters.previewViewMode === PreviewViewMode.NO_SCROLL_VIEW
      ) {
        return <Story />;
      } else if (
        context.parameters.previewViewMode === PreviewViewMode.CENTERED
      ) {
        return (
          <View style={styles.centeredContainer}>
            <Story />
          </View>
        );
      } else {
        return (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Story />
          </ScrollView>
        );
      }
    },
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
    previewViewMode: PreviewViewMode.SCROLL_VIEW,
  },
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content can grow and scroll when necessary
  },
  centeredContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default preview;
