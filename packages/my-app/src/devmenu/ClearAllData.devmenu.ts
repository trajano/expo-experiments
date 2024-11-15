import { DevMenuItemModule } from '@/devmenu/types';
import * as FileSystem from 'expo-file-system';
import { DevSettings } from 'react-native';

const deleteFilesRecursivelyAsync = async (directoryUri: string) => {
  // Get all items in the directory
  const items = await FileSystem.readDirectoryAsync(directoryUri);

  // Iterate over each item and check if it's a directory or a file
  for (const item of items) {
    const itemUri = `${directoryUri}/${item}`;
    const info = await FileSystem.getInfoAsync(itemUri);

    if (info.isDirectory) {
      // Recursively delete contents of the directory
      await deleteFilesRecursivelyAsync(itemUri);
    }

    // Delete the file or empty directory as long as it isn't the root
    if (
      itemUri !== FileSystem.documentDirectory &&
      itemUri !== FileSystem.cacheDirectory
    ) {
      await FileSystem.deleteAsync(itemUri, { idempotent: true });
    }
  }
};

export default {
  name: 'Reset app',
  callback: async () => {
    await Promise.all([
      deleteFilesRecursivelyAsync(FileSystem.documentDirectory!),
      deleteFilesRecursivelyAsync(FileSystem.cacheDirectory!),
    ]);
    DevSettings.reload('application reset');
  },
} satisfies DevMenuItemModule;
