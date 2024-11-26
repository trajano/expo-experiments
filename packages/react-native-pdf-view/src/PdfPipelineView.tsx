import { FC, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { fetchToBase64 } from './fetchToBase64';

import * as Crypto from 'expo-crypto';
import { usePdfPipeline } from './PdfPipeline';
import { PdfPipelineViewProps } from './PdfPipelineViewProps';

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

  useEffect(() => {
    const correlationId = Crypto.randomUUID();
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
        viewportListenerSubscription.remove();
      },
    );

    const pageCountListenerSubscription = addPdfListener(
      'numPages',
      correlationId,
      (event) => {
        if (event.type !== 'numPages') {
          return;
        }
        onPageCountKnown({
          pageCount: event.numPages,
        });
        pageCountListenerSubscription.remove();
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
        okListenerSubscription.remove();
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
        const data = await fetchToBase64(uri);
        await pdfPipelineReadyPromise;
        postPdfRequest(correlationId, data, pageNumber, scale);
      } catch (error: unknown) {
        console.error('posted', error);
      }
    })();
    return () => {
      okListenerSubscription.remove();
      errorListenerSubscription.remove();
      viewportListenerSubscription.remove();
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
