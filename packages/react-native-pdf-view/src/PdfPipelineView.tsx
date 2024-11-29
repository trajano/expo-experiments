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
  /**
   * This is string for fast comparison consisting of the uri_pageNumber_scale
   */
  const lastUriPageScaleRef = useRef<string | null>(null);
  const correlationId = useRef(Crypto.randomUUID()).current;

  useEffect(() => {
    const receivedListenerSubscription = addPdfListener(
      'received',
      correlationId,
      (event) => {
        if (event.type !== 'received') {
          return;
        }
        if (
          lastUriPageScaleRef.current !==
          event.uri + '_' + event.pageNumber + '_' + event.scale
        ) {
          setImageDataUri(undefined);
        }
      },
    );

    const viewportListenerSubscription = addPdfListener(
      'viewport',
      correlationId,
      (event) => {
        if (
          event.type !== 'viewport' ||
          typeof onViewPortKnown !== 'function'
        ) {
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
        if (
          event.type !== 'numPages' ||
          typeof onPageCountKnown !== 'function'
        ) {
          return;
        }
        onPageCountKnown({
          pageCount: event.numPages,
        });
      },
    );
    const errorListenerSubscription = addPdfListener(
      'error',
      correlationId,
      (event) => {
        if (event.type !== 'error' || typeof onError !== 'function') {
          return;
        }
        onError({
          error: event.error,
          where: 'event',
        });
      },
    );

    return () => {
      receivedListenerSubscription?.remove();
      viewportListenerSubscription?.remove();
      pageCountListenerSubscription?.remove();
      errorListenerSubscription?.remove();
    };
  }, [
    addPdfListener,
    correlationId,
    onViewPortKnown,
    onPageCountKnown,
    onError,
  ]);

  useEffect(() => {
    const okListenerSubscription = addPdfListener(
      'ok',
      correlationId,
      (event) => {
        if (event.type !== 'ok') {
          return;
        }
        // may cache this later
        setImageDataUri(event.data);
        lastUriPageScaleRef.current = uri + '_' + pageNumber + '_' + scale;
      },
    );
    (async () => {
      try {
        const localUri = (await Asset.fromURI(uri).downloadAsync()).localUri!;
        await pdfPipelineReadyPromise;
        postPdfRequest(correlationId, localUri, pageNumber, scale);
      } catch (error: unknown) {
        onError({ error, where: 'posting' });
      }
    })();
    return () => {
      okListenerSubscription?.remove();
    };
  }, [
    uri,
    correlationId,
    addPdfListener,
    postPdfRequest,
    onError,
    pageNumber,
    pdfPipelineReadyPromise,
    scale,
  ]);
  return (
    <Image
      {...props}
      source={imageDataUri && { uri: imageDataUri }}
      style={style}
      contentFit={contentFit}
    />
  );
};
