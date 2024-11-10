import { act, render, fireEvent } from '@testing-library/react-native';
import * as FileSystem from 'expo-file-system';
import { FileTree } from './FileTree';
import * as stories from './FileTree.stories';
import { composeStories } from '@storybook/react';
import FileViewer from 'react-native-file-viewer';
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

jest.mock('expo-file-system');
jest.mock('expo-haptics');
jest.mock('react-native-file-viewer', () => ({ open: jest.fn() }));

const { DocumentDirectory } = composeStories(stories);

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

describe('storybook of FileTree', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('renders DocumentDirectory', async () => {
    const mockFileSystem = FileSystem as jest.Mocked<typeof FileSystem>;
    mockFileSystem.readDirectoryAsync.mockResolvedValueOnce([]);
    render(<DocumentDirectory />);
    await act(() => Promise.resolve());
  });

  it('renders DocumentDirectory with one file', async () => {
    const mockFileSystem = FileSystem as jest.Mocked<typeof FileSystem>;
    mockFileSystem.readDirectoryAsync.mockResolvedValueOnce(['file.txt']);
    mockFileSystem.getInfoAsync.mockResolvedValueOnce({
      isDirectory: false,
      uri: 'foo://file.txt',
      exists: true,
      size: 42,
      modificationTime: 1,
    });
    const { getByTestId } = render(<DocumentDirectory />);
    await act(() => Promise.resolve());
    const treeItem = getByTestId('touchable-tree-item');
    expect(treeItem).toBeTruthy();
    fireEvent.press(treeItem);
    expect(FileViewer.open).toHaveBeenCalledWith('undefined/file.txt');
  });

  it('renders DocumentDirectory with one file to delete', async () => {
    jest.spyOn(Alert, 'alert');
    const mockFileSystem = FileSystem as jest.Mocked<typeof FileSystem>;
    mockFileSystem.readDirectoryAsync.mockResolvedValue(['file.txt']);
    mockFileSystem.getInfoAsync.mockResolvedValue({
      isDirectory: false,
      uri: 'foo://file.txt',
      exists: true,
      size: 42,
      modificationTime: 1,
    });
    const { getByTestId } = render(<DocumentDirectory />);
    await act(() => Promise.resolve());
    const treeItem = getByTestId('touchable-tree-item');
    expect(treeItem).toBeTruthy();
    fireEvent(treeItem, 'longPress');
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Heavy,
    );
    await act(() => Promise.resolve());
    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete file',
      'Do you want to delete file.txt?',
      expect.anything(),
    );
    const yesButton = jest.mocked(Alert.alert).mock.calls[0][2][0];
    expect(yesButton.text).toEqual('Yes');
    await act(() => {
      yesButton.onPress();
    });

    expect(FileSystem.deleteAsync).toHaveBeenCalledWith('undefined/file.txt', {
      idempotent: true,
    });
  });
});
