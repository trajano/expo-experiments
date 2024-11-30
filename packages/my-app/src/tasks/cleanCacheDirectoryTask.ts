/**
 * Using background fetch trigger which is usually quite infrequent periodically clean the cache directory of the app.
 * Inspiration https://www.echowaves.com/post/expo-filesystem-cachedirectory-has-to-be-cleaned
 */
import { backgroundFetchLog } from '@/logging';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as FileSystem from 'expo-file-system';

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

const processFilesInBatchesAsync = async <T>(
  items: string[],
  processFunction: (item: string) => Promise<T | null>,
): Promise<T[]> => {
  const results: T[] = [];
  for (
    let i = 0;
    i < items.length;
    i += FILESYSTEM_ASYNC_OPERATIONS_BATCH_SIZE
  ) {
    const batch = items.slice(i, i + FILESYSTEM_ASYNC_OPERATIONS_BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(processFunction));
    results.push(...(batchResults.filter((it) => it !== null) as T[]));
  }
  return results;
};

/**
 * Function that specifies which files to preseve.  Namely Cache.db* and *.ttf
 * @param filename
 */
const shouldPreserve = (filename: string) => {
  const preserveCacheDb = filename.startsWith('Cache.db');
  const preserveTtf = filename.endsWith('.ttf');

  return preserveCacheDb || preserveTtf;
};
/**
 * Traverses the directory and skips some files.
 * @param directory
 */
const traverseDirectorySkipFontsAsync = async (
  directory: string,
): Promise<string[]> => {
  const files: string[] = [];
  const items = await FileSystem.readDirectoryAsync(directory);

  for (const item of items) {
    const fullPath = `${directory}/${item}`;
    const fileInfo = await FileSystem.getInfoAsync(fullPath);

    if (fileInfo.isDirectory) {
      const nestedFiles = await traverseDirectorySkipFontsAsync(fullPath);
      files.push(...nestedFiles);
    } else if (!shouldPreserve(item)) {
      files.push(fullPath);
    }
  }
  return files;
};

TaskManager.defineTask(CLEAN_CACHE_DIRECTORY_TASK, async () => {
  try {
    const files = await traverseDirectorySkipFontsAsync(
      FileSystem.cacheDirectory!,
    );

    // Process file info in batches
    const fileInfos = await processFilesInBatchesAsync(files, async (file) => {
      const info = await FileSystem.getInfoAsync(file, { size: true });
      if (info.isDirectory || !info.exists || info.modificationTime === 0) {
        return null;
      } else {
        return info;
      }
    });

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
      const filesToDelete = fileInfos
        .slice(0, fileInfos.length - MIN_FILES_TO_KEEP)
        .map((f) => f.uri);

      // Delete files in batches
      await processFilesInBatchesAsync(filesToDelete, async (fileUri) => {
        await FileSystem.deleteAsync(fileUri, { idempotent: true });
      });
    }
    return BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (e: unknown) {
    backgroundFetchLog.error('Error', e);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});
