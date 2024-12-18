import { act, render, screen } from '@testing-library/react-native';
import { PdfView } from './PdfView';
import { composeStories } from '@storybook/react';
import * as stories from './PdfView.stories';
import * as FileSystem from 'expo-file-system';

jest.mock('expo-file-system', () => ({
  EncodingType: jest.requireActual('expo-file-system').EncodingType,
  cacheDirectory: 'file:///cache/',
  readAsStringAsync: jest.fn(),
  getInfoAsync: jest.fn(),
  downloadAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
}));

// jest.setup.ts or at the start of your test file
class MockFileReader {
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null =
    null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null =
    null;
  result: string | ArrayBuffer | null = null;
  error = null;
  onloadend = null;
  onabort = null;
  onloadstart = null;
  onprogress = null;
  readyState = null;
  abort = null;
  readAsArrayBuffer = null;
  readAsBinaryString = null;
  readAsText = null;
  addEventListener = null;
  EMPTY = null;
  LOADING = null;
  DONE = null;
  removeEventListener = null;
  dispatchEvent = null;

  readAsDataURL(): void {
    setTimeout(() => {
      this.result = 'data:image/png;base64,mockBase64Data';
      if (this.onload) {
        this.onload({
          target: this,
        } as unknown as ProgressEvent<FileReader>);
      }
    }, 0);
  }
}

// Replace the global FileReader with the mock
global.FileReader = MockFileReader as unknown as typeof FileReader;

const { MyResume } = composeStories(stories);
describe('PdfView', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('renders a file URI', async () => {
    jest.mocked(FileSystem.getInfoAsync).mockResolvedValueOnce({
      exists: false,
      isDirectory: false,
      uri: 'a',
    });
    jest.mocked(FileSystem.readAsStringAsync).mockResolvedValue('AAAAA');
    jest.mocked(FileSystem.downloadAsync).mockResolvedValue({
      status: 200,
      uri: 'a',
      headers: {},
      mimeType: '',
    });
    jest.mocked(FileSystem.getInfoAsync).mockResolvedValue({
      exists: true,
      isDirectory: false,
      uri: 'a',
      size: 42,
      modificationTime: 1,
    });

    render(
      <PdfView uri="file:///trajano.net/assets/Archimedes%20Trajano.pdf" />,
    );
    await act(() => Promise.resolve());
    // expect(FileSystem.downloadAsync).toHaveBeenCalledWith(
    //   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs',
    //   expect.anything(),
    //   { cache: true },
    // );
    // expect(FileSystem.downloadAsync).toHaveBeenCalledWith(
    //   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs',
    //   expect.anything(),
    //   { cache: true },
    // );
    // expect(FileSystem.writeAsStringAsync).toHaveBeenCalledWith(
    //   expect.stringMatching(new RegExp('^file:///cache/.+')),
    //   expect.anything(),
    //   { encoding: 'utf8' },
    // );
    expect(screen.toJSON()).toMatchSnapshot();
  }, 60_000);
  it('renders MyResume story', async () => {
    jest.mocked(FileSystem.getInfoAsync).mockResolvedValue({
      exists: true,
      isDirectory: false,
      uri: 'a',
      size: 42,
      modificationTime: 1,
    });
    jest.mocked(FileSystem.downloadAsync).mockResolvedValueOnce({
      status: 200,
      uri: 'a',
      headers: {},
      mimeType: '',
    });
    jest.mocked(FileSystem.readAsStringAsync).mockResolvedValueOnce('AAAAA');
    jest
      .mocked(FileSystem.readAsStringAsync)
      .mockResolvedValueOnce('DATA AAAAA');
    render(<MyResume />);
    await act(() => Promise.resolve());
    // expect(FileSystem.downloadAsync).not.toHaveBeenCalledWith(
    //   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs',
    //   expect.anything(),
    //   { cache: true },
    // );
    // expect(FileSystem.downloadAsync).not.toHaveBeenCalledWith(
    //   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs',
    //   expect.anything(),
    //   { cache: true },
    // );
    // expect(FileSystem.downloadAsync).toHaveBeenCalledWith(
    //   'https:///trajano.net/assets/Archimedes%20Trajano.pdf',
    //   expect.anything(),
    //   { cache: true },
    // );
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
