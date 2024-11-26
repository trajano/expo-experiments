import { EventSubscription } from 'react-native';

export type OkPdfViewMessage = {
  type: 'ok';
  data: string;
  correlationId: string;
};
export type PageCountPdfViewMessage = {
  type: 'numPages';
  numPages: number;
  correlationId: string;
};
export type ViewPortPdfViewMessage = {
  type: 'viewport';
  width: number;
  height: number;
  scale: number;
  correlationId: string;
};
export type ErrorPdfViewMessage = {
  type: 'error';
  error: string;
  correlationId?: string;
  where?: string;
};

export type PdfPipelineMessage =
  | OkPdfViewMessage
  | PageCountPdfViewMessage
  | ViewPortPdfViewMessage
  | ErrorPdfViewMessage;

type PdfEventName = PdfPipelineMessage['type'];
type PdfPipelineListener = (event: PdfPipelineMessage) => void;
export type AddListenerFunction = (
  eventName: PdfEventName,
  correlationId: string,
  listener: PdfPipelineListener,
) => EventSubscription;
