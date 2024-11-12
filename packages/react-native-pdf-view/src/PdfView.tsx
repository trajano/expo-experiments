import { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  WebView,
  WebViewMessageEvent,
  WebViewProps,
} from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { fetchCachedFileAsync } from './fetchCachedFileAsync';
import { buildPdfHtmlAsync } from './buildPdfHtmlAsync';

export type PdfViewProps = Omit<
  WebViewProps,
  | 'source'
  | 'injectedJavaScriptObject'
  | 'originWhitelist'
  | 'onMessage'
  | 'onContentProcessDidTerminate'
> & {
  /**
   * URI to the PDF.
   */
  uri: string;
  /**
   * Page number of PDF to render. Defaults to 1.
   */
  pageNumber?: number;
  /**
   * Scale factor for the PDF.  The higher the number the sharper the text.  Defaults to 1.0
   */
  scale?: number;
  onMessage?: (message: PdfViewMessage) => void;
  /**
   * URL to the pdf.js script, defaults to https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs. It
   * can also be an asset reference.
   */
  pdfJs?: string | Asset;
  /**
   * URL to the pdf.js worker script, defaults to https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs.  It
   * can also be an asset reference.
   */
  pdfWorkerJs?: string | Asset;
};

type InjectedJavaScriptObject = {
  /** base 64 data of PDF */
  data: string;
  pageNumber: number;
  scale: number;
};

const getInjectedJavaScriptObjectAsync = async (
  sourceUri: string,
  pageNumber: number,
  scale: number,
): Promise<InjectedJavaScriptObject> => {
  const uri = await fetchCachedFileAsync(sourceUri);
  const base64Data = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64',
  });
  return { data: base64Data, pageNumber, scale };
};

type OkPdfViewMessage = {
  type: 'ok';
  data?: string;
};
type StagePdfViewMessage = {
  type: 'stage';
  stage: string;
};
type ViewPortPdfViewMessage = {
  type: 'viewport';
  width: number;
  height: number;
  scale: number;
};
type ErrorPdfViewMessage = {
  type: 'error';
  error: string;
};

export type PdfViewMessage =
  | OkPdfViewMessage
  | StagePdfViewMessage
  | ViewPortPdfViewMessage
  | ErrorPdfViewMessage;
const convertToPdfViewMessage = (messageFromWebView: string): PdfViewMessage =>
  JSON.parse(messageFromWebView);

/**
 * This renders a PDF page using pdf.js inside a web view.  The way it works is it
 * fetches the PDF.js library and embedded the code inside an HTML file that will
 * be rendered as part of the web view.  The uri will be converted to a cached
 * file URI if it isn't a file URI already.
 */
export const PdfView: FC<PdfViewProps> = ({
  uri,
  pageNumber = 1,
  scale = 1.0,
  onMessage,
  pdfJs = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs',
  pdfWorkerJs = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs',
  ...props
}) => {
  const [injectedJavaScriptObject, setInjectedJavaScriptObject] = useState<
    InjectedJavaScriptObject | undefined
  >(undefined);
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    let mounted = true;
    (async () => {
      const [nextInjectedJavaScriptObject, nextHtml] = await Promise.all([
        getInjectedJavaScriptObjectAsync(uri, pageNumber, scale),
        buildPdfHtmlAsync(pdfJs, pdfWorkerJs),
      ]);
      if (mounted) {
        setInjectedJavaScriptObject(nextInjectedJavaScriptObject);
        setHtml(nextHtml);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [uri, pageNumber, pdfJs, pdfWorkerJs]);

  const onWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      if (event.nativeEvent.data?.indexOf('no data') !== -1) {
        console.log('Reloading', !!webviewRef.current);
        webviewRef.current?.reload();
      } else if (onMessage) {
        onMessage(convertToPdfViewMessage(event.nativeEvent.data));
      }
    },
    [onMessage],
  );
  const webviewRef = useRef<WebView>(null);

  return (
    <WebView
      key={'1sa'}
      injectedJavaScriptObject={injectedJavaScriptObject}
      originWhitelist={['*']}
      source={{ html }}
      onMessage={onWebViewMessage}
      ref={webviewRef}
      onContentProcessDidTerminate={() => webviewRef.current?.reload()}
      {...props}
    />
  );
};
