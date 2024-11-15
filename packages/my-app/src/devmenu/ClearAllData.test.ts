import { DevSettings } from 'react-native';
import * as FileSystem from 'expo-file-system';
import ClearAllData from './ClearAllData.devmenu';

jest.mock('expo-file-system', () => ({
  readDirectoryAsync: jest.fn(),
  getInfoAsync: jest.fn(),
  deleteAsync: jest.fn(),
  documentDirectory: 'document-directory',
  cacheDirectory: 'cache-directory',
}));

jest.mock('react-native', () => ({
  DevSettings: {
    reload: jest.fn(),
  },
}));

describe('Reset App Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete all files and directories recursively and reload the app', async () => {
    // Mock file structure
    const mockFileStructure: Record<string, string[]> = {
      'document-directory': ['file1', 'dir1'],
      'document-directory/dir1': ['file2'],
      'cache-directory': ['file3'],
    };

    // Mock FileSystem functions
    jest
      .mocked(FileSystem.readDirectoryAsync)
      .mockImplementation(async (dir) => {
        return mockFileStructure[dir] || [];
      });

    jest.mocked(FileSystem.getInfoAsync).mockImplementation(async (path) => ({
      isDirectory: path.includes('dir'),
      exists: true,
      modificationTime: Date.now(),
      uri: path,
      size: 42,
    }));

    jest.mocked(FileSystem.deleteAsync).mockResolvedValue();

    // Execute the callback
    await ClearAllData.callback();

    // Assert file deletion
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'document-directory/file1',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'document-directory/dir1/file2',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'document-directory/dir1',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'cache-directory/file3',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).not.toHaveBeenCalledWith(
      'document-directory',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).not.toHaveBeenCalledWith('cache-directory', {
      idempotent: true,
    });

    // Assert app reload
    expect(DevSettings.reload).toHaveBeenCalledWith('application reset');
  });
});
