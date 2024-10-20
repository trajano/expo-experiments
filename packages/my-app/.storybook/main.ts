import { type StorybookConfig } from '@storybook/react-native';

export default <StorybookConfig>{
  stories: [
    '../src/**/*.stories.?(ts|tsx)',
    '../../*/src/**/*.stories.?(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-notes',
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
    '@storybook/addon-ondevice-backgrounds',
  ],
};
