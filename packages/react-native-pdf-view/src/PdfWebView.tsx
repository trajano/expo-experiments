import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { PdfWebViewMessage } from './PdfWebViewMessage';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { renderPdfHtml } from './renderPdfHtml';
import { fetchToBase64 } from './fetchToBase64';
import { PdfViewProps } from './PdfViewProps';

type InjectedJavaScriptObject = {
  /** base 64 data of PDF */
  data: string;
  pageNumber: number;
  scale: number;
};

const convertToPdfWebViewMessage = (
  messageFromWebView: string,
): PdfWebViewMessage => JSON.parse(messageFromWebView);

export const PdfWebView: FC<
  Omit<PdfViewProps, 'onLoad'> &
    Required<
      Pick<
        PdfViewProps,
        | 'pageNumber'
        | 'scale'
        | 'onError'
        | 'onViewPortKnown'
        | 'onPageCountKnown'
        | 'onRender'
      >
    >
> = ({
  uri,
  pageNumber,
  scale,
  onViewPortKnown,
  onRender,
  onError,
  onPageCountKnown,
  pdfJs,
  pdfWorkerJs,
  style,
  ...props
}) => {
  const [injectedJavaScriptObject, setInjectedJavaScriptObject] = useState<
    InjectedJavaScriptObject | undefined
  >(undefined);
  const [html, setHtml] = useState<string>('');
  const webviewRef = useRef<WebView>(null);

  const onWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const pdfViewMessage = convertToPdfWebViewMessage(event.nativeEvent.data);
      if (pdfViewMessage.type === 'nodata') {
        webviewRef.current?.reload();
      } else if (pdfViewMessage.type === 'error') {
        onError({
          error: new Error(pdfViewMessage.error),
          where: pdfViewMessage.where,
        });
      } else if (pdfViewMessage.type === 'numPages') {
        onPageCountKnown!({
          pageCount: pdfViewMessage.numPages,
        });
      } else if (pdfViewMessage.type === 'viewport') {
        onViewPortKnown!({
          width: pdfViewMessage.width,
          height: pdfViewMessage.height,
          scale: pdfViewMessage.scale,
        });
      } else if (pdfViewMessage.type === 'ok') {
        onRender({
          imageDataUri: pdfViewMessage.data,
        });
      }
    },
    [onViewPortKnown, onError, onPageCountKnown, onRender],
  );

  useEffect(() => {
    // set the HTML
    let mounted = true;
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
    (async () => {
      try {
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
        const rendered = renderPdfHtml(
          pdfJsCode,
          `data:application/javascript;base64,${pdfWorkerBase64Code}`,
        );
        if (mounted) {
          setHtml(rendered);
        }
      } catch (error: unknown) {
        onError({ error, where: 'setHtml' });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [pdfJs, pdfWorkerJs, onError]);

  useEffect(() => {
    // set the Injected Javascript Object
    let mounted = true;

    (async () => {
      const data = await fetchToBase64(uri);
      const nextInjectedJavaScriptObject: InjectedJavaScriptObject = {
        data,
        scale,
        pageNumber,
      };
      if (mounted) {
        setInjectedJavaScriptObject(nextInjectedJavaScriptObject);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [uri, scale, pageNumber]);

  if (!html || !injectedJavaScriptObject) {
    return null;
  }
  return (
    <WebView
      {...props}
      originWhitelist={['*']}
      source={{ html, baseUrl: 'about:blank' }}
      cacheEnabled={false}
      onMessage={onWebViewMessage}
      webviewDebuggingEnabled={__DEV__}
      injectedJavaScriptObject={injectedJavaScriptObject}
      ref={webviewRef}
      javaScriptEnabled={true}
      domStorageEnabled={false}
      scrollEnabled={false}
      style={style}
      pointerEvents="none"
      useSharedProcessPool={false}
    />
  );
};
