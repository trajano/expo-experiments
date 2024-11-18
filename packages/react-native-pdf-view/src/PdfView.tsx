import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { EncodingType } from 'expo-file-system';
import { Image } from 'expo-image';
import { fetchCachedFileAsync } from './fetchCachedFileAsync';
import { buildPdfHtmlAsync } from './buildPdfHtmlAsync';
import * as Crypto from 'expo-crypto';
import { PdfViewProps } from './PdfViewProps';
import { PdfWebViewMessage } from './PdfWebViewMessage';

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
  cacheEnabled: boolean,
): Promise<InjectedJavaScriptObject> => {
  const uri = await fetchCachedFileAsync(sourceUri, 'pdf', cacheEnabled);
  const base64Data = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64',
  });
  return { data: base64Data, pageNumber, scale };
};
type ViewPortInfo = {
  width: number;
  height: number;
  scale: number;
};

const convertToPdfWebViewMessage = (
  messageFromWebView: string,
): PdfWebViewMessage => JSON.parse(messageFromWebView);

/**
 * This renders a PDF page using pdf.js inside a web view.
 * The way it works is it
 * fetches the PDF.js library and embedded the code inside an HTML file that will
 * be rendered as part of the web view.  The uri will be converted to a cached
 * file URI if it isn't a file URI already.
 *
 * The PDF.js while in the webview will provide a data URL which is a PNG image that will then be cached and an Expo Image
 * will be rendering the result.
 */
export const PdfView: FC<PdfViewProps> = ({
  uri,
  pageNumber = 1,
  scale = 1.0,
  cachePolicy = 'disk',
  onViewPortKnown = () => {},
  onLoad = () => {},
  onRender = () => {},
  onError = () => {},
  onPageCountKnown = () => {},
  pdfJs = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs',
  pdfWorkerJs = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs',
  style,
  ...props
}) => {
  const [injectedJavaScriptObject, setInjectedJavaScriptObject] = useState<
    InjectedJavaScriptObject | undefined
  >(undefined);
  const [viewport, setViewport] = useState<ViewPortInfo>({
    scale,
    width: 0,
    height: 0,
  });
  const [html, setHtml] = useState<string>('');
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const [nextInjectedJavaScriptObject, nextHtml] = await Promise.all([
        getInjectedJavaScriptObjectAsync(
          uri,
          pageNumber,
          scale,
          cachePolicy === 'disk' || cachePolicy === 'memory-disk',
        ),
        buildPdfHtmlAsync(
          pdfJs,
          pdfWorkerJs,
          cachePolicy === 'disk' || cachePolicy === 'memory-disk',
        ),
      ]);
      if (mounted) {
        setInjectedJavaScriptObject(nextInjectedJavaScriptObject);
        setHtml(nextHtml);
        setImageDataUri(null);
        setImageUri(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [uri, cachePolicy, scale, pageNumber, pdfJs, pdfWorkerJs]);

  const onWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const pdfViewMessage = convertToPdfWebViewMessage(event.nativeEvent.data);
      if (
        pdfViewMessage.type === 'error' &&
        pdfViewMessage.error === 'no data'
      ) {
        webviewRef.current?.reload();
      } else if (pdfViewMessage.type === 'error') {
        onError({ error: new Error(pdfViewMessage.error) });
      } else if (pdfViewMessage.type === 'numPages') {
        setPageCount(pdfViewMessage.numPages);
        onPageCountKnown({
          pageCount: pdfViewMessage.numPages,
        });
      } else if (pdfViewMessage.type === 'viewport') {
        setViewport({
          width: pdfViewMessage.width,
          height: pdfViewMessage.height,
          scale: pdfViewMessage.scale,
        });
        onViewPortKnown({
          width: pdfViewMessage.width,
          height: pdfViewMessage.height,
          scale: pdfViewMessage.scale,
        });
      } else if (pdfViewMessage.type === 'ok') {
        setImageDataUri(pdfViewMessage.data);
        onRender({
          imageDataUri: pdfViewMessage.data,
        });
      }
    },
    [onViewPortKnown, onError, onPageCountKnown, onRender],
  );
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    let mounted = true;
    if (!imageDataUri) {
      return;
    }
    if (cachePolicy !== 'disk' && cachePolicy !== 'memory-disk') {
      setImageUri(imageDataUri);
      onLoad({
        uri,
        imageDataUri,
        ...viewport,
        pageCount,
        imageUri: imageDataUri,
      });
      return;
    }

    (async () => {
      try {
        const filename =
          FileSystem.cacheDirectory +
          (await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            JSON.stringify(uri),
          )) +
          pageNumber +
          '.png';

        await FileSystem.writeAsStringAsync(
          filename,
          imageDataUri.substring('data:image/png;base64,'.length),
          {
            encoding: EncodingType.Base64,
          },
        );
        if (mounted) {
          setImageUri(filename);
          onLoad({
            uri,
            imageDataUri,
            ...viewport,
            pageCount,
            imageUri: filename,
          });
        }
      } catch (e: unknown) {
        onError({ error: e });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [
    imageDataUri,
    uri,
    pageNumber,
    onError,
    pageCount,
    onLoad,
    viewport,
    cachePolicy,
  ]);

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        style={style}
        cachePolicy={cachePolicy}
      />
    );
  } else if (injectedJavaScriptObject) {
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
        containerStyle={style}
      />
    );
  } else {
    console.log('WTF');
    return null;
  }
};
