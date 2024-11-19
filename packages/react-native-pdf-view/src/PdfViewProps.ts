import { Asset } from 'expo-asset';
import { ImageProps, ImageStyle } from 'expo-image';
import { WebViewProps } from 'react-native-webview';
import { StyleProp } from 'react-native';

export type PdfErrorEventData = {
  error: Error | unknown;
  where?: string;
};

export type PdfPageCountEventData = {
  pageCount: number;
};

export type PdfViewPortEventData = {
  width: number;
  height: number;
  scale: number;
};

export type PdfRenderEventData = {
  /**
   * Data URI containing the image of the page in PNG format.  So this will start with `data:image/png;base64,`
   */
  imageDataUri: string;
};

export type PdfLoadEventData =
  | PdfViewPortEventData
  | PdfPageCountEventData
  | PdfRenderEventData
  | {
      /**
       * Source URI originally provided.
       */
      uri: string;
      /**
       * URI pointing to the image in the cache or the data URI if disk cache is not used.
       */
      imageUri: string;
    };

export type PdfViewProps = Omit<
  ImageProps & WebViewProps,
  | 'source'
  | 'injectedJavaScriptObject'
  | 'containerStyle'
  | 'onLoad'
  | 'style'
  | 'cacheEnabled'
  | 'onMessage'
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

  /**
   * Cache policy
   */
  // cachePolicy?: ImageProps['cachePolicy'];

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

  onPageCountKnown?: (event: PdfPageCountEventData) => void;
  onViewPortKnown?: (event: PdfViewPortEventData) => void;
  onRender?: (event: PdfRenderEventData) => void;
  // onLoad?: (event: PdfLoadEventData) => void;
  onError?: (event: PdfErrorEventData) => void;
  style?: StyleProp<ImageStyle>;
};
