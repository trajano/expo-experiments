import { FC, useEffect, useRef, useState } from 'react';
import { Image } from 'expo-image';

import * as Crypto from 'expo-crypto';
import { usePdfPipeline } from './PdfPipeline';
import { PdfPipelineViewProps } from './PdfPipelineViewProps';
import { Asset } from 'expo-asset';

/**
 * This renders a PDF page using pdf.js inside a web view that's set up via PdfPipeline
 * The way it works is it generates a correlation ID, then sets up an event listener that is waiting for the PDF
 * event for the given correlation ID
 * Once it receives the image data it returns a ExpoImage
 */
export const PdfPipelineView: FC<PdfPipelineViewProps> = ({
  uri,
  pageNumber = 1,
  scale = 1.0,
  onViewPortKnown = () => {},
  onError = () => {},
  onPageCountKnown = () => {},
  contentFit = 'cover',
  style,
  ...props
}) => {
  const [imageDataUri, setImageDataUri] = useState<string | undefined>(
    undefined,
  );
  const {
    postPdfRequest,
    addListener: addPdfListener,
    pdfPipelineReadyPromise,
  } = usePdfPipeline();
  const lastUriRef = useRef<string | null>(null);
  const correlationId = useRef(Crypto.randomUUID()).current;

  useEffect(() => {
    if (lastUriRef.current !== uri) {
      setImageDataUri(undefined);
    }
    const receivedListenerSubscription = addPdfListener(
      'received',
      correlationId,
      (event) => {
        if (event.type !== 'received') {
          return;
        }
      },
    );
    const viewportListenerSubscription = addPdfListener(
      'viewport',
      correlationId,
      (event) => {
        if (event.type !== 'viewport') {
          return;
        }
        onViewPortKnown({
          width: event.width,
          height: event.height,
          scale: event.scale,
        });
      },
    );

    const pageCountListenerSubscription = addPdfListener(
      'numPages',
      correlationId,
      (event) => {
        if (event.type !== 'numPages') {
          return;
        }
        console.log(event);
        onPageCountKnown({
          pageCount: event.numPages,
        });
      },
    );
    const okListenerSubscription = addPdfListener(
      'ok',
      correlationId,
      (event) => {
        if (event.type !== 'ok') {
          return;
        }
        // may cache this later
        setImageDataUri(event.data);
        lastUriRef.current = uri;
      },
    );
    const errorListenerSubscription = addPdfListener(
      'error',
      correlationId,
      (event) => {
        if (event.type !== 'error') {
          return;
        }
        onError({
          error: event.error,
        });
      },
    );
    (async () => {
      try {
        const localUri = (await Asset.fromURI(uri).downloadAsync()).localUri!;
        await pdfPipelineReadyPromise;
        postPdfRequest(correlationId, localUri, pageNumber, scale);
      } catch (error: unknown) {
        console.error('posted', error);
      }
    })();
    return () => {
      okListenerSubscription.remove();
      pageCountListenerSubscription.remove();
      errorListenerSubscription.remove();
      viewportListenerSubscription.remove();
      receivedListenerSubscription.remove();
    };
  }, [
    uri,
    addPdfListener,
    postPdfRequest,
    onPageCountKnown,
    onViewPortKnown,
    pageNumber,
    onError,
    pdfPipelineReadyPromise,
    scale,
  ]);
  return (
    <Image
      {...props}
      source={{ uri: imageDataUri }}
      style={style}
      contentFit={contentFit}
    />
  );
};
