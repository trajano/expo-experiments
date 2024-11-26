import { render } from '@testing-library/react-native';
import { PdfPipelineProvider, usePdfPipeline } from './PdfPipeline';
import { IpcWebProvider } from 'react-native-ipc-web';
import { Text } from 'react-native';
import { FC } from 'react';

jest.mock('react-native-ipc-web', () => {
  const { WebView } = require('react-native-webview');
  return {
    useIpcWeb: jest.fn(() => ({
      IpcWebView: jest.fn(() => <WebView testID="IpcWebView" />),
      postMessage: jest.fn(),
      ipcWebViewReadyPromise: Promise.resolve(true),
    })),
    IpcWebProvider: jest.fn(({ children }) => <>{children}</>),
  };
});

jest.mock('expo-asset', () => ({
  Asset: {
    fromURI: jest.fn(() => ({
      downloadAsync: jest
        .fn()
        .mockResolvedValue({ localUri: '/mock/path/to/asset' }),
    })),
  },
}));

jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn(async () => 'mock-file-content'),
}));

describe('PdfPipelineProvider', () => {
  it('provides the PdfPipelineContext with the correct default values', async () => {
    const TestComponent: FC = () => {
      const context = usePdfPipeline();
      return (
        <>
          <Text testID="context-addListener">{typeof context.addListener}</Text>
          <Text testID="context-postPdfRequest">
            {typeof context.postPdfRequest}
          </Text>
        </>
      );
    };

    const { getByTestId } = render(
      <PdfPipelineProvider>
        <TestComponent />
      </PdfPipelineProvider>,
    );

    expect(getByTestId('context-addListener').props.children).toBe('function');
    expect(getByTestId('context-postPdfRequest').props.children).toBe(
      'function',
    );
    expect(IpcWebProvider).toHaveBeenCalled();
  });

  it('renders the IpcWebView component', () => {
    const TestComponent: FC = () => {
      usePdfPipeline();
      return null;
    };

    const { getByTestId } = render(
      <PdfPipelineProvider>
        <TestComponent />
      </PdfPipelineProvider>,
    );

    expect(getByTestId('IpcWebView')).toBeTruthy();
  });
});
