import { PreviewViewMode } from '@sb/preview';
import type { Meta, StoryObj } from '@storybook/react';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { FileTree, OnItemPressCallback } from 'react-native-my-components';

// This is an example of a conditional missing react-native dependency.
let FileViewer: any;
try {
  FileViewer = require('react-native-file-viewer');
} catch (e: unknown) {
  FileViewer = {
    open: () =>
      Promise.reject(new Error('react-native-file-viewer not installed ')),
  };
}
const openFileInViewer: OnItemPressCallback = async (item) => {
  if (item.type === 'file') {
    try {
      await FileViewer.open(item.uri);
    } catch (e: unknown) {
      Alert.alert(
        'File Viewer',
        `Unable to open file ${item.name} reason: ${e}`,
      );
    }
  }
};
const meta: Meta<typeof FileTree> = {
  title: 'FileTree',
  component: FileTree,
};

export default meta;

type Story = StoryObj<typeof FileTree>;

export const DocumentDirectory: Story = {
  args: {
    directoryUri: FileSystem.documentDirectory!,
    hideChildren: false,
    onItemPress: openFileInViewer,
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const CacheDirectory: Story = {
  args: {
    directoryUri: FileSystem.cacheDirectory!,
    hideChildren: false,
    onItemPress: openFileInViewer,
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const BundleDirectory: Story = {
  args: {
    directoryUri: FileSystem.bundleDirectory!,
    hideChildren: false,
    onItemPress: openFileInViewer,
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
