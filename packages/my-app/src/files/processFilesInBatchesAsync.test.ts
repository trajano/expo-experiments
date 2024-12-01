import { processFilesInBatchesAsync } from './processFilesInBatchesAsync'; // Adjust path
import { FileInfo } from 'expo-file-system';

describe('processFilesInBatchesAsync', () => {
  const mockFiles: FileInfo[] = [
    {
      uri: 'file://path/to/file1',
      exists: true,
      isDirectory: false,
      size: 1024,
      modificationTime: 1630456789000,
    },
    {
      uri: 'file://path/to/file2',
      exists: true,
      isDirectory: false,
      size: 2048,
      modificationTime: 1630456790000,
    },
    {
      uri: 'file://path/to/file3',
      exists: true,
      isDirectory: false,
      size: 512,
      modificationTime: 1630456791000,
    },
    {
      uri: 'file://path/to/file4',
      exists: true,
      isDirectory: false,
      size: 4096,
      modificationTime: 1630456792000,
    },
    {
      uri: 'file://path/to/file5',
      exists: true,
      isDirectory: false,
      size: 8192,
      modificationTime: 1630456793000,
    },
    {
      uri: 'file://path/to/file6',
      exists: true,
      isDirectory: false,
      size: 256,
      modificationTime: 1630456794000,
    },
  ];

  const mockProcessFunction = jest.fn(async (file: FileInfo) => {
    if (file.uri.includes('file3')) return null; // Simulate skipping a file
    if (!file.isDirectory && file.exists) {
      return `Processed: ${file.uri} (size: ${file.size}, modified: ${file.modificationTime})`;
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('processes files in batches of the default size', async () => {
    const results = await processFilesInBatchesAsync(
      mockFiles,
      mockProcessFunction,
    );

    expect(results).toEqual([
      'Processed: file://path/to/file1 (size: 1024, modified: 1630456789000)',
      'Processed: file://path/to/file2 (size: 2048, modified: 1630456790000)',
      'Processed: file://path/to/file4 (size: 4096, modified: 1630456792000)',
      'Processed: file://path/to/file5 (size: 8192, modified: 1630456793000)',
      'Processed: file://path/to/file6 (size: 256, modified: 1630456794000)',
    ]);
    expect(mockProcessFunction).toHaveBeenCalledTimes(6); // All items processed
  });

  it('processes files in custom batch sizes', async () => {
    const results = await processFilesInBatchesAsync(
      mockFiles,
      mockProcessFunction,
      2,
    );

    expect(results).toEqual([
      'Processed: file://path/to/file1 (size: 1024, modified: 1630456789000)',
      'Processed: file://path/to/file2 (size: 2048, modified: 1630456790000)',
      'Processed: file://path/to/file4 (size: 4096, modified: 1630456792000)',
      'Processed: file://path/to/file5 (size: 8192, modified: 1630456793000)',
      'Processed: file://path/to/file6 (size: 256, modified: 1630456794000)',
    ]);
    expect(mockProcessFunction).toHaveBeenCalledTimes(6);
  });

  it('returns an empty array when given no files', async () => {
    const results = await processFilesInBatchesAsync([], mockProcessFunction);

    expect(results).toEqual([]);
    expect(mockProcessFunction).not.toHaveBeenCalled();
  });

  it('handles large datasets by batching correctly', async () => {
    const largeFiles: FileInfo[] = Array.from({ length: 100 }, (_, i) => ({
      uri: `file://path/to/file${i + 1}`,
      exists: true,
      isDirectory: false,
      size: 1024 + i,
      modificationTime: 1630456789000 + i,
    }));

    const processMock = jest.fn(
      async (file: FileInfo) => `Processed: ${file.uri}`,
    );

    const results = await processFilesInBatchesAsync(
      largeFiles,
      processMock,
      20,
    );

    expect(results).toHaveLength(100);
    expect(processMock).toHaveBeenCalledTimes(100);
  });

  it('skips files that return null', async () => {
    const results = await processFilesInBatchesAsync(
      mockFiles,
      mockProcessFunction,
    );

    expect(results).not.toContain(
      'Processed: file://path/to/file3 (size: 512, modified: 1630456791000)',
    );
  });
});
