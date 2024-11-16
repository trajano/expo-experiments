import ClearLogFiles from './ClearLogFiles.devmenu';
import * as FileSystem from 'expo-file-system';

// Mock FileSystem methods
jest.mock('expo-file-system', () => ({
  readDirectoryAsync: jest.fn(),
  deleteAsync: jest.fn(),
  documentDirectory: 'document-directory/',
}));

describe('Clear Log Files Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete files with the specified prefix and suffix', async () => {
    // Mock directory contents
    jest
      .mocked(FileSystem.readDirectoryAsync)
      .mockResolvedValue([
        'logs_file1.txt',
        'logs_file2.txt',
        'other_file.txt',
        'background_fetch_2023.txt',
        'notification_alert.txt',
        'location_data.txt',
      ]);

    // Execute the callback function
    await ClearLogFiles.callback();

    // Assertions for deleteAsync calls
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'document-directory/logs_file1.txt',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'document-directory/logs_file2.txt',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'document-directory/background_fetch_2023.txt',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'document-directory/notification_alert.txt',
      { idempotent: true },
    );
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(
      'document-directory/location_data.txt',
      { idempotent: true },
    );

    // Ensure that files without the specified prefix or suffix are not deleted
    expect(FileSystem.deleteAsync).not.toHaveBeenCalledWith(
      'document-directory/other_file.txt',
      { idempotent: true },
    );
  });
});
