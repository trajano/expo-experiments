import { FileInfo } from 'expo-file-system';

/**
 * Processes an array of `FileInfo` items in batches using a specified asynchronous function.
 *
 * @template T - The type of the processed result for each file.
 *
 * @param items - The array of `FileInfo` objects to be processed.
 * @param processFunction - An asynchronous function to process each file. Returns a result of type `T` or `null` to exclude the file from the results.
 * @param batchSize - The maximum number of files to process concurrently in each batch. Defaults to `10`.
 *
 * @returns A promise that resolves to an array of results of type `T`, excluding `null` values returned by `processFunction`.
 *
 * @example
 * ```typescript
 * import { processFilesInBatchesAsync } from './your-module';
 *
 * const files = [
 *   { uri: "file://path/to/file1", exists: true, isDirectory: false },
 *   { uri: "file://path/to/file2", exists: true, isDirectory: false },
 * ];
 *
 * const processFile = async (file: FileInfo): Promise<string | null> => {
 *   if (!file.exists || file.isDirectory) {
 *     return null;
 *   }
 *   return `Processed: ${file.uri}`;
 * };
 *
 * (async () => {
 *   const results = await processFilesInBatchesAsync(files, processFile, 5);
 *   console.log(results); // [ "Processed: file://path/to/file1", "Processed: file://path/to/file2" ]
 * })();
 * ```
 */
export const processFilesInBatchesAsync = async <T>(
  items: FileInfo[],
  processFunction: (item: FileInfo) => Promise<T | null>,
  batchSize = 10,
): Promise<T[]> => {
  const results: T[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processFunction));
    results.push(...(batchResults.filter((it) => it !== null) as T[]));
  }
  return results;
};
