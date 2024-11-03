import { PreviewViewMode } from '@sb/preview';
import type { Meta, StoryObj } from '@storybook/react';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
import { Alert, Platform } from 'react-native';
import { FileTree, OnItemPressCallback } from 'react-native-my-components';
import { MyText } from 'react-native-my-text';
import FileViewer from 'react-native-file-viewer'

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
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
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

export const BundleDirectory: Story =
  Platform.OS === 'ios'
    ? {
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
      }
    : {
        render: () => <MyText>Unsupported</MyText>,
        parameters: {
          backgrounds: {
            default: 'plain',
          },
        },
      };
