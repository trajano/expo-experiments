import { PreviewViewMode } from '@sb/preview';
import type { Meta, StoryObj } from '@storybook/react';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
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

const deleteItem: OnItemPressCallback = async (item, refreshCallback) => {
  if (item.type === 'file') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert('Delete file', `Do you want to delete ${item.name}?`, [
      {
        text: 'Yes',
        onPress: () => {
          (async () => {
            await FileSystem.deleteAsync(item.uri, { idempotent: true });
            await refreshCallback();
          })();
        },
        style: 'destructive',
      },
      { text: 'No', onPress: () => {}, style: 'cancel' },
    ]);
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
    itemTextStyle: { fontSize: 20 },
    onItemPress: openFileInViewer,
    onItemLongPress: deleteItem,
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
    itemTextStyle: { fontSize: 20 },
    onItemPress: openFileInViewer,
    onItemLongPress: deleteItem,
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
    itemTextStyle: { fontSize: 20 },
    onItemPress: openFileInViewer,
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};