import * as FileSystem from 'expo-file-system';
import { walkDirectoryAsync } from './index';
import { FileInfo } from 'expo-file-system'; // Adjust the path to your module

jest.mock('expo-file-system');

describe('walkDirectoryAsync', () => {
  const mockReadDirectoryAsync = FileSystem.readDirectoryAsync as jest.Mock;
  const mockGetInfoAsync = FileSystem.getInfoAsync as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFileStructure: Record<string, string[]> = {
    '/root': ['file1.txt', 'dir1', 'file2.txt'],
    '/root/dir1': ['file3.txt', 'dir2'],
    '/root/dir1/dir2': ['file4.txt'],
  };

  const mockFileInfo: Record<string, FileInfo> = {
    '/root/file1.txt': {
      exists: true,
      isDirectory: false,
      uri: '/root/file1.txt',
      size: 1024,
      modificationTime: 123,
    },
    '/root/dir1': {
      exists: true,
      isDirectory: true,
      uri: '/root/dir1',
      size: 0,
      modificationTime: 123,
    },
    '/root/file2.txt': {
      exists: true,
      isDirectory: false,
      uri: '/root/file2.txt',
      size: 2048,
      modificationTime: 123,
    },
    '/root/dir1/file3.txt': {
      exists: true,
      isDirectory: false,
      uri: '/root/dir1/file3.txt',
      size: 512,
      modificationTime: 123,
    },
    '/root/dir1/dir2': {
      exists: true,
      isDirectory: true,
      uri: '/root/dir1/dir2',
      size: 0,
      modificationTime: 123,
    },
    '/root/dir1/dir2/file4.txt': {
      exists: true,
      isDirectory: false,
      uri: '/root/dir1/dir2/file4.txt',
      size: 256,
      modificationTime: 123,
    },
  };

  mockReadDirectoryAsync.mockImplementation((path) => {
    return Promise.resolve(mockFileStructure[path] || []);
  });

  mockGetInfoAsync.mockImplementation((path) => {
    return Promise.resolve(mockFileInfo[path] || { exists: false });
  });

  it('traverses directory with depthFirst: true', async () => {
    const files = await walkDirectoryAsync('/root', { depthFirst: true });
    expect(files.map((f) => f.uri)).toEqual([
      '/root/dir1/dir2/file4.txt',
      '/root/dir1/file3.txt',
      '/root/file1.txt',
      '/root/file2.txt',
    ]);
  });

  it('traverses directory with depthFirst: false', async () => {
    const files = await walkDirectoryAsync('/root', { depthFirst: false });
    expect(files.map((f) => f.uri)).toEqual([
      '/root/file1.txt',
      '/root/file2.txt',
      '/root/dir1/file3.txt',
      '/root/dir1/dir2/file4.txt',
    ]);
  });
});
