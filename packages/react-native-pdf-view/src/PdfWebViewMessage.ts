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

export type PdfWebViewMessage =
  | OkPdfViewMessage
  | StagePdfViewMessage
  | ViewPortPdfViewMessage
  | ErrorPdfViewMessage;
