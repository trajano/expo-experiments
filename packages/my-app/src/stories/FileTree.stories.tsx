import { PreviewViewMode } from '@sb/preview';
import type { Meta, StoryObj } from '@storybook/react';
import * as FileSystem from 'expo-file-system';
import { FileTree } from 'react-native-my-components';

const meta: Meta<typeof FileTree> = {
  title: 'FileTree',
  component: FileTree,
};

export default meta;

type Story = StoryObj<typeof FileTree>;

export const DocumentDirectory: Story = {
  args: { directoryUri: FileSystem.documentDirectory! },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const CacheDirectory: Story = {
  args: { directoryUri: FileSystem.cacheDirectory! },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const BundleDirectory: Story = {
  args: { directoryUri: FileSystem.bundleDirectory! },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
