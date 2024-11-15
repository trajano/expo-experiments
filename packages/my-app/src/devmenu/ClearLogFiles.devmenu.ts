import { DevMenuItemModule } from '@/devmenu/types';
import * as FileSystem from 'expo-file-system';

const clearLogFilesByPrefixAndSuffixAsync = async (
  prefix: string,
  suffix: string,
): Promise<void> => {
  await Promise.all(
    (await FileSystem.readDirectoryAsync(FileSystem.documentDirectory!))
      .filter((it) => it.startsWith(prefix) && it.endsWith(suffix))
      .map((it) => FileSystem.documentDirectory + it)
      .map((it) => FileSystem.deleteAsync(it, { idempotent: true })),
  );
};

export default {
  name: 'Clear Log Files',
  callback: async () => {
    await Promise.all([
      clearLogFilesByPrefixAndSuffixAsync('logs_', '.txt'),
      clearLogFilesByPrefixAndSuffixAsync('background_fetch_', '.txt'),
      clearLogFilesByPrefixAndSuffixAsync('notification_', '.txt'),
      clearLogFilesByPrefixAndSuffixAsync('location_', '.txt'),
    ]);
  },
} satisfies DevMenuItemModule;
