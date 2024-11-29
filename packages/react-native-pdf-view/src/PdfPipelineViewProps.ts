import { ImageProps } from 'expo-image';
import {
  PdfErrorEventData,
  PdfPageCountEventData,
  PdfViewPortEventData,
} from './PdfViewProps';

export type PdfPipelineViewProps = Omit<ImageProps, 'source'> & {
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

  onPageCountKnown?: (event: PdfPageCountEventData) => void;
  onViewPortKnown?: (event: PdfViewPortEventData) => void;
  onError?: (event: PdfErrorEventData) => void;
};
