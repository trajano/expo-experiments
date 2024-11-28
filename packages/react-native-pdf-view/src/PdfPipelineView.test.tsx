import { render, act, screen } from '@testing-library/react-native';
import { PdfPipelineView } from './PdfPipelineView';
import { usePdfPipeline } from './PdfPipeline';
import * as Crypto from 'expo-crypto';
import { Asset } from 'expo-asset';
import { PdfPipelineMessage } from './PdfPipelineMessage';

// Mock dependencies
jest.mock('./PdfPipeline', () => ({
  usePdfPipeline: jest.fn(),
}));

jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(),
}));

jest.mock('expo-asset', () => ({
  Asset: {
    fromURI: jest.fn(),
  },
}));

describe('PdfPipelineView', () => {
  const mockPostPdfRequest = jest.fn();
  const mockAddListener = jest.fn();
  const mockPdfPipelineReadyPromise = Promise.resolve(true);

  beforeEach(() => {
    jest.clearAllMocks();
    (Crypto.randomUUID as jest.Mock).mockReturnValue('test-correlation-id');
    (usePdfPipeline as jest.Mock).mockReturnValue({
      postPdfRequest: mockPostPdfRequest,
      addListener: mockAddListener,
      pdfPipelineReadyPromise: mockPdfPipelineReadyPromise,
    });
    (Asset.fromURI as jest.Mock).mockReturnValue({
      downloadAsync: jest
        .fn()
        .mockResolvedValue({ localUri: 'file://test.pdf' }),
    });
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <PdfPipelineView
        uri="test-uri"
        pageNumber={1}
        scale={1.0}
        onViewPortKnown={jest.fn()}
        onError={jest.fn()}
        onPageCountKnown={jest.fn()}
        contentFit="cover"
        style={{ width: 100, height: 100 }}
        testID="pdf-pipeline-view"
      />,
    );

    expect(getByTestId('pdf-pipeline-view')).toBeTruthy();
  });

  it('sets up event listeners and posts PDF request', async () => {
    const { rerender } = render(
      <PdfPipelineView
        uri="test-uri"
        pageNumber={1}
        scale={1.0}
        onViewPortKnown={jest.fn()}
        onError={jest.fn()}
        onPageCountKnown={jest.fn()}
        testID="pdf-pipeline-view"
      />,
    );

    // Assert listeners and postPdfRequest were called
    await act(async () => {
      expect(mockAddListener).toHaveBeenCalledTimes(5);
    });
    await act(async () => {
      expect(mockPostPdfRequest).toHaveBeenCalledWith(
        'test-correlation-id',
        'file://test.pdf',
        1,
        1.0,
      );
    });

    expect(screen.getByTestId('pdf-pipeline-view')).toBeTruthy();
    expect(screen.getByTestId('pdf-pipeline-view').props.source).toEqual([]);

    const okCallback = mockAddListener.mock.calls.find(
      (it) => it[0] === 'ok',
    )[2];
    expect(typeof okCallback).toBe('function');

    await act(async () => {
      okCallback({
        type: 'ok',
        data: 'abc',
        correlationId: 'test-correlation-id',
      } satisfies PdfPipelineMessage);
    });
    expect(screen.getByTestId('pdf-pipeline-view')).toBeTruthy();
    expect(screen.getByTestId('pdf-pipeline-view').props.source).toContainEqual(
      { uri: 'abc' },
    );

    expect(screen.toJSON()).toMatchSnapshot();

    mockAddListener.mockClear();

    // Update props and ensure effect runs again
    rerender(
      <PdfPipelineView
        uri="new-test-uri"
        pageNumber={2}
        scale={1.5}
        onViewPortKnown={jest.fn()}
        onError={jest.fn()}
        onPageCountKnown={jest.fn()}
        testID="pdf-pipeline-view"
      />,
    );
    await act(async () => Promise.resolve());
    await act(async () => {
      expect(mockAddListener).toHaveBeenCalledTimes(5);
      expect(mockPostPdfRequest).toHaveBeenCalledWith(
        'test-correlation-id',
        'file://test.pdf',
        2,
        1.5,
      );
    });
    expect(screen.getByTestId('pdf-pipeline-view')).toBeTruthy();
    expect(screen.getByTestId('pdf-pipeline-view').props.source).toContainEqual(
      { uri: 'abc' },
    );

    const receivedCallback = mockAddListener.mock.calls.find(
      (it) => it[0] === 'received',
    )[2];
    expect(typeof okCallback).toBe('function');
    await act(async () => {
      receivedCallback({
        type: 'received',
        uri: 'new-test-uri',
        pageNumber: 2,
        scale: 1.5,
        correlationId: 'test-correlation-id',
      } satisfies PdfPipelineMessage);
    });
    expect(screen.getByTestId('pdf-pipeline-view').props.source).toEqual([]);

    const rerenderOkCallback = mockAddListener.mock.calls.find(
      (it) => it[0] === 'ok',
    )[2];

    await act(async () => {
      rerenderOkCallback({
        type: 'ok',
        data: 'new-abc',
        correlationId: 'test-correlation-id',
      } satisfies PdfPipelineMessage);
    });
    expect(screen.getByTestId('pdf-pipeline-view').props.source).toContainEqual(
      { uri: 'new-abc' },
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('cleans up listeners on unmount', () => {
    const mockRemoveListener = jest.fn();
    mockAddListener.mockReturnValue({ remove: mockRemoveListener });

    const { unmount } = render(
      <PdfPipelineView
        uri="test-uri"
        pageNumber={1}
        scale={1.0}
        onViewPortKnown={jest.fn()}
        onError={jest.fn()}
        onPageCountKnown={jest.fn()}
      />,
    );

    unmount();
    expect(mockRemoveListener).toHaveBeenCalledTimes(5);
  });
});
