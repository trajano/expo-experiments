type OkPdfViewMessage = {
  type: 'ok';
  data: string;
  correlationId: string;
};
type NoDataPdfViewMessage = {
  type: 'nodata';
};
type StagePdfViewMessage = {
  type: 'stage';
  stage: string;
};
type PageCountPdfViewMessage = {
  type: 'numPages';
  numPages: number;
  correlationId: string;
};
type ViewPortPdfViewMessage = {
  type: 'viewport';
  width: number;
  height: number;
  scale: number;
  correlationId: string;
};
type ErrorPdfViewMessage = {
  type: 'error';
  error: string;
  where?: string;
};

export type PdfPipelineMessage =
  | NoDataPdfViewMessage
  | OkPdfViewMessage
  | PageCountPdfViewMessage
  | StagePdfViewMessage
  | ViewPortPdfViewMessage
  | ErrorPdfViewMessage;
