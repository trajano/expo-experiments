import { FC, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { PdfViewProps } from './PdfViewProps';
import { fetchToBase64 } from './fetchToBase64';

import * as Crypto from 'expo-crypto';
import { usePdfPipeline } from './PdfPipeline';
import { PdfPipelineMessage } from './PdfPipelineMessage';

/**
 * This renders a PDF page using pdf.js inside a web view that's set up via PdfPipeline
 * The way it works is it generates a correlation ID, then sets up an event listener that is waiting for the PDF
 * event for the given correlation ID
 * Once it receives the image data it returns a ExpoImage
 */
export const PdfPipelineView: FC<PdfViewProps> = ({
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
  const { postPdfRequest, addListener: addPdfListener } = usePdfPipeline();

  useEffect(() => {
    setImageDataUri(null);
    const correlationId = Crypto.randomUUID();
    const listenerSubscription = addPdfListener(
      'ok',
      (event: PdfPipelineMessage) => {
        console.log({ event });
        if (event.type !== 'ok' || event.correlationId !== correlationId) {
          return;
        }
        // may cache this later
        setImageDataUri(event.data);
        listenerSubscription.remove();
      },
    );
    (async () => {
      const data = await fetchToBase64(uri);
      console.log({
        correlationId,
        pageNumber,
        scale,
        data: data.substring(0, 20),
      });
      postPdfRequest(correlationId, data, pageNumber, scale);
    })();
    return () => {
      listenerSubscription.remove();
    };
  }, [uri, addPdfListener, postPdfRequest]);
  return (
    <Image
      {...props}
      source={{ uri: imageDataUri }}
      style={style}
      contentFit="contain"
    />
  );
};
