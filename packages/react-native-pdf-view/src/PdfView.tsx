import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { EncodingType } from 'expo-file-system';
import { Image } from 'expo-image';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Asset } from 'expo-asset';
import { fetchCachedFileAsync } from './fetchCachedFileAsync';
import { buildPdfHtmlAsync } from './buildPdfHtmlAsync';
import * as Crypto from 'expo-crypto';

export type PdfViewProps = Omit<
  ViewProps,
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
  const uri = await fetchCachedFileAsync(sourceUri, 'pdf');
  const base64Data = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64',
  });
  return { data: base64Data, pageNumber, scale };
};

type OkPdfViewMessage = {
  type: 'ok';
  data: string;
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

type ViewPortInfo = {
  width: number;
  height: number;
  scale: number;
};
export type PdfViewMessage =
  | OkPdfViewMessage
  | StagePdfViewMessage
  | ViewPortPdfViewMessage
  | ErrorPdfViewMessage;
const convertToPdfViewMessage = (messageFromWebView: string): PdfViewMessage =>
  JSON.parse(messageFromWebView);

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
  onMessage,
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  const [html, setHtml] = useState<string>('');
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
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
        setImageUri(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [uri, scale, pageNumber, pdfJs, pdfWorkerJs]);

  const onWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const pdfViewMessage = convertToPdfViewMessage(event.nativeEvent.data);
      if (
        pdfViewMessage.type === 'error' &&
        pdfViewMessage.error === 'no data'
      ) {
        webviewRef.current?.reload();
      } else if (pdfViewMessage.type === 'viewport') {
        console.log(pdfViewMessage);
        setViewport({
          width: pdfViewMessage.width,
          height: pdfViewMessage.height,
          scale: pdfViewMessage.scale,
        });
      } else if (pdfViewMessage.type === 'ok') {
        setImageDataUri(pdfViewMessage.data);
      } else if (onMessage) {
        onMessage(pdfViewMessage);
      }
    },
    [onMessage],
  );
  const webviewRef = useRef<WebView>(null);

  const aspectRatio = useMemo(() => {
    return viewport.width / viewport.height;
  }, [viewport]);
  const viewStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return StyleSheet.compose(style, { aspectRatio });
  }, [style, aspectRatio]);

  useEffect(() => {
    let mounted = true;
    if (!imageDataUri) {
      return;
    }
    (async () => {
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
      }
    })();
    return () => {
      mounted = false;
    };
  }, [imageDataUri, uri, pageNumber]);

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        contentFit={'contain'}
        style={style as any}
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
        containerStyle={viewStyle}
      />
    );
  } else {
    return null;
  }
};
