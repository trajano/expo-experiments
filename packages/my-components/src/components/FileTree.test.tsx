import { act, render } from '@testing-library/react-native';
import * as FileSystem from 'expo-file-system';
import { FileTree } from './FileTree';

jest.mock('expo-file-system');

describe('FileTree Component', () => {
  it('renders the file tree correctly', async () => {
    const mockFileSystem = FileSystem as jest.Mocked<typeof FileSystem>;
    mockFileSystem.readDirectoryAsync
      .mockResolvedValueOnce(['folder1', 'file1.txt'])
      .mockResolvedValueOnce(['file2.txt']);
    mockFileSystem.getInfoAsync.mockImplementation(async (uri) => {
      if (uri.endsWith('folder1')) {
        return {
          isDirectory: true,
          uri: 'foo://folder1',
        } as FileSystem.FileInfo;
      } else {
        return { isDirectory: false } as FileSystem.FileInfo;
      }
    });

    const { getByText } = render(<FileTree directoryUri="foo://" />);
    await act(() => Promise.resolve());
    expect(getByText('📁 folder1')).toBeTruthy();
    expect(getByText('📄 file2.txt 1')).toBeTruthy();
    expect(getByText('📄 file1.txt 0')).toBeTruthy();
  }, 20_000);
});
