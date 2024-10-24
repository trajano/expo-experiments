import { act, render, fireEvent } from '@testing-library/react-native';
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

    const { getByText, queryByText } = render(
      <FileTree directoryUri="foo://" />,
    );
    await act(() => Promise.resolve());
    expect(getByText('📁 folder1')).toBeTruthy();
    expect(getByText('📄 file2.txt 1')).toBeTruthy();
    expect(queryByText('📄 file2.txt 1')).toBeTruthy();
    expect(getByText('📄 file1.txt 0')).toBeTruthy();
  }, 20_000);

  it('fires press callback', async () => {
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
    const callback = jest.fn();
    const { getByText } = render(
      <FileTree directoryUri="foo://" onItemPress={callback} />,
    );
    await act(() => Promise.resolve());

    fireEvent.press(getByText('📁 folder1'));
    expect(callback).toHaveBeenCalledWith(
      {
        children: [],
        depth: 0,
        name: 'folder1',
        type: 'directory',
        uri: 'foo:///folder1',
      },
      expect.anything(),
    );

    fireEvent.press(getByText('📄 file2.txt 1'));
    expect(callback).toHaveBeenCalledWith(
      {
        depth: 1,
        name: 'file2.txt',
        type: 'file',
        uri: 'foo:///folder1/file2.txt',
      },
      expect.anything(),
    );

    fireEvent.press(getByText('📄 file1.txt 0'));
    expect(callback).toHaveBeenCalledWith(
      {
        depth: 0,
        name: 'file1.txt',
        type: 'file',
        uri: 'foo:///file1.txt',
      },
      expect.anything(),
    );
  }, 20_000);

  it('fires press callback with refresh', async () => {
    const mockFileSystem = FileSystem as jest.Mocked<typeof FileSystem>;
    mockFileSystem.readDirectoryAsync
      .mockResolvedValueOnce(['folder1', 'file1.txt'])
      .mockResolvedValueOnce(['file2.txt'])
      .mockResolvedValueOnce(['last-remaining-file.txt']);
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
    const callback = jest.fn(async (item, refresh) => {
      await refresh();
    });
    const { getByText, queryByText } = render(
      <FileTree directoryUri="foo://" onItemPress={callback} />,
    );
    await act(() => Promise.resolve());

    await act(() => fireEvent.press(getByText('📁 folder1')));

    expect(callback).toHaveBeenCalledWith(
      {
        children: [],
        depth: 0,
        name: 'folder1',
        type: 'directory',
        uri: 'foo:///folder1',
      },
      expect.anything(),
    );

    expect(queryByText('📁 folder1')).not.toBeTruthy();
    expect(queryByText('📄 file2.txt 1')).not.toBeTruthy();
    expect(queryByText('📄 file1.txt 0')).not.toBeTruthy();
    expect(getByText('📄 last-remaining-file.txt 0')).toBeTruthy();
  }, 20_000);

  it('renders the file tree no children', async () => {
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

    const { getByText, queryByText } = render(
      <FileTree directoryUri="foo://" hideChildren={true} />,
    );
    await act(() => Promise.resolve());
    expect(getByText('📁 folder1')).toBeTruthy();
    expect(queryByText('📄 file2.txt 1')).not.toBeTruthy();
    expect(getByText('📄 file1.txt 0')).toBeTruthy();
  }, 20_000);
});
