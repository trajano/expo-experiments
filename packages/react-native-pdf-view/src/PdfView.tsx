import { FC, useCallback, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { PdfRenderEventData, PdfViewProps } from './PdfViewProps';
import { PdfWebView } from './PdfWebView';

/**
 * This renders a PDF page using pdf.js inside a web view.
 * The way it works is it
 * fetches the PDF.js library and embedded the code inside an HTML file that will
 * be rendered as part of the web view.  The uri will be converted to a cached
 * file URI if it isn't a file URI already.
 *
 * This does not perform any caching of the source at this level
 *
 * The PDF.js while in the webview will provide a data URL which is a PNG image that will then be cached and an Expo Image
 * will be rendering the result.
 */
export const PdfView: FC<PdfViewProps> = ({
  uri,
  pageNumber = 1,
  scale = 1.0,
  onViewPortKnown = () => {},
  onRender = () => {},
  onError = () => {},
  onPageCountKnown = () => {},
  pdfJs,
  pdfWorkerJs,
  style,
  ...props
}) => {
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);

  const updateImageOnRender = useCallback(
    (event: PdfRenderEventData) => {
      (async () => {
        setImageDataUri(event.imageDataUri);
        onRender(event);
      })();
    },
    [onRender],
  );
  useEffect(() => {
    setImageDataUri(null);
  }, [uri]);
  if (imageDataUri) {
    return (
      <Image
        {...props}
        source={{ uri: imageDataUri }}
        style={style}
        contentFit="contain"
      />
    );
  } else {
    return (
      <PdfWebView
        {...props}
        uri={uri}
        pageNumber={pageNumber}
        scale={scale}
        onViewPortKnown={onViewPortKnown}
        onRender={updateImageOnRender}
        onError={onError}
        onPageCountKnown={onPageCountKnown}
        pdfJs={pdfJs}
        pdfWorkerJs={pdfWorkerJs}
        style={style}
      />
    );
  }
};
