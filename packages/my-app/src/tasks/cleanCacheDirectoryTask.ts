/**
 * Using background fetch trigger which is usually quite infrequent periodically clean the cache directory of the app.
 * Inspiration https://www.echowaves.com/post/expo-filesystem-cachedirectory-has-to-be-cleaned
 */
import { backgroundFetchLog } from '@/logging';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as FileSystem from 'expo-file-system';
import { processFilesInBatchesAsync, walkDirectoryAsync } from '@/files';
import { FileInfo } from 'expo-file-system';

export const CLEAN_CACHE_DIRECTORY_TASK =
  'clean-cache-directory-background-fetch';
/**
 * This is the maximum number of FileSystem.**Async calls to run so we don't exhaust?
 */
const FILESYSTEM_ASYNC_OPERATIONS_BATCH_SIZE = 100;

/**
 * This threshold must be met by the file sizes before cleaning will occur.
 */
const TRIGGER_CACHE_SIZE_IN_BYTES = 100_000_000;

/**
 * Minimum number of files to keep in the cache.
 */
const MIN_FILES_TO_KEEP = 100;

/**
 * Function that specifies which files to preserve.  Namely Cache.db* and *.ttf and zero byte files.
 */
const shouldPreserve = async (filename: string, fileInfo: FileInfo) => {
  const preserveCacheDb = filename.startsWith('Cache.db');
  const preserveTtf = filename.endsWith('.ttf');
  const preserveZeroSizeFiles =
    fileInfo.exists && !fileInfo.isDirectory && fileInfo.size === 0;
  return preserveCacheDb || preserveTtf || preserveZeroSizeFiles;
};

TaskManager.defineTask(CLEAN_CACHE_DIRECTORY_TASK, async () => {
  try {
    const files = await walkDirectoryAsync(FileSystem.cacheDirectory!, {
      size: true,
      onFileInfoAsync: shouldPreserve,
    });

    // Process file info in batches
    const fileInfos = await processFilesInBatchesAsync(
      files,
      async (info) => {
        if (info.isDirectory || !info.exists || info.modificationTime === 0) {
          return null;
        } else {
          return info;
        }
      },
      FILESYSTEM_ASYNC_OPERATIONS_BATCH_SIZE,
    );

    const totalSizeOfCacheDirectoryInBytes = fileInfos.reduce(
      (c, info) => c + info.size,
      0,
    );

    backgroundFetchLog.info(
      `totalSizeOfCacheDirectoryInBytes ${totalSizeOfCacheDirectoryInBytes}, number of files in cache ${fileInfos.length}`,
    );

    if (
      totalSizeOfCacheDirectoryInBytes >= TRIGGER_CACHE_SIZE_IN_BYTES ||
      fileInfos.length > MIN_FILES_TO_KEEP
    ) {
      fileInfos.sort((a, b) => a.modificationTime - b.modificationTime);
      const filesToDelete = fileInfos.slice(
        0,
        fileInfos.length - MIN_FILES_TO_KEEP,
      );

      // Delete files in batches
      await processFilesInBatchesAsync(filesToDelete, async (info) => {
        await FileSystem.deleteAsync(info.uri, { idempotent: true });
      });
    }
    return BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (e: unknown) {
    backgroundFetchLog.error('Error', e);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});
