/**
 * A context that provides no specific functionality. This serves as a template for developers
 * to create React Context-based implementations and includes a higher-order component (HOC) version.
 */
import {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { IpcWebProvider, useIpcWeb } from 'react-native-ipc-web';
import { renderPdfPipelineHtml } from './renderPdfPipelineHtml';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { EventSubscription } from 'react-native';
import { AddListenerFunction, PdfPipelineMessage } from './PdfPipelineMessage';

export interface PdfPipeline {
  /**
   * Adds an event listener
   * the event
   * @param eventName PDF EventName
   * @param correlationId correlation ID
   * @param listener event listener
   */
  addListener: AddListenerFunction;

  /**
   * @param correlationId correlation ID use Crypto.randomUUID()
   * @param pdfData base64 data for the PDF.
   * @param pageNumber defaults to 1
   * @param scale default to 1.0
   */
  postPdfRequest(
    correlationId: string,
    pdfData: string,
    pageNumber?: number,
    scale?: number,
  ): void;

  pdfPipelineReadyPromise: Promise<boolean>;
}

export const PdfPipelineContext = createContext<PdfPipeline>({
  addListener: () =>
    ({
      remove: () => {},
    }) as EventSubscription,
  postPdfRequest: () => {},
  pdfPipelineReadyPromise: Promise.resolve(true),
});

export const usePdfPipeline = () => useContext(PdfPipelineContext);

const InternalPdfPipelineProvider: FC<
  PropsWithChildren<{
    addListener: AddListenerFunction;
  }>
> = ({ addListener, children }) => {
  const { IpcWebView, postMessage, ipcWebViewReadyPromise } = useIpcWeb();

  const postPdfRequest = useCallback(
    (
      correlationId: string,
      pdfData: string,
      pageNumber: number = 1,
      scale: number = 1.0,
    ) => {
      postMessage({
        correlationId,
        pdfData,
        pageNumber,
        scale,
      });
    },
    [postMessage],
  );
  const value = useMemo<PdfPipeline>(
    () => ({
      addListener,
      postPdfRequest,
      pdfPipelineReadyPromise: ipcWebViewReadyPromise,
    }),
    [addListener, postPdfRequest, ipcWebViewReadyPromise],
  );
  return (
    <PdfPipelineContext.Provider value={value}>
      <IpcWebView />
      {children}
    </PdfPipelineContext.Provider>
  );
};
type PdfPipelineProviderProps = PropsWithChildren<{
  /**
   * Asset pointing to the pdf.js script, defaults to https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs. It
   * can also be an asset reference.
   */
  pdfJs?: Asset;

  /**
   * Asset pointing to the pdf.js worker script, defaults to https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs.  It
   * can also be an asset reference.
   */
  pdfWorkerJs?: Asset;
}>;
export const PdfPipelineProvider: FC<PdfPipelineProviderProps> = ({
  pdfJs,
  pdfWorkerJs,
  children,
}) => {
  const eventEmitterRef = useRef(new EventEmitter());
  const renderSourceAsync = useCallback(async () => {
    const pdfJsAsset =
      pdfJs ??
      Asset.fromURI(
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs',
      );
    const pdfWorkerJsAsset =
      pdfWorkerJs ??
      Asset.fromURI(
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs',
      );

    const [pdfJsCode, pdfWorkerBase64Code] = await Promise.all([
      FileSystem.readAsStringAsync(
        (await pdfJsAsset.downloadAsync()).localUri!,
        { encoding: 'utf8' },
      ),
      FileSystem.readAsStringAsync(
        (await pdfWorkerJsAsset.downloadAsync()).localUri!,
        { encoding: 'base64' },
      ),
    ]);
    return renderPdfPipelineHtml(
      pdfJsCode,
      `data:application/javascript;base64,${pdfWorkerBase64Code}`,
    );
  }, [pdfJs, pdfWorkerJs]);
  const onMessage = useCallback((message: PdfPipelineMessage) => {
    const eventEmitter = eventEmitterRef.current;
    // emit an event
    eventEmitter.emit(message.type, message);
  }, []);
  const addListener: AddListenerFunction = (
    eventName,
    correlationId,
    pdfPipelineEventListener,
  ) => {
    return eventEmitterRef.current.addListener(
      eventName,
      (event: PdfPipelineMessage) => {
        if (event.correlationId === correlationId) {
          pdfPipelineEventListener(event);
        }
      },
    );
  };
  useEffect(() => {
    const eventEmitter = eventEmitterRef.current;

    return () => {
      eventEmitter.removeAllListeners();
    };
  }, []);

  return (
    <IpcWebProvider sourceProvider={renderSourceAsync} onMessage={onMessage}>
      <InternalPdfPipelineProvider addListener={addListener}>
        {children}
      </InternalPdfPipelineProvider>
    </IpcWebProvider>
  );
};

export const WithPdfView = <P extends object>(
  Component: ComponentType<P>,
): FC<P> => {
  const WrappedComponent = ({ ...props }: P) => (
    <PdfPipelineProvider>
      <Component {...props} />
    </PdfPipelineProvider>
  );

  WrappedComponent.displayName = `WithPdfView(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};
