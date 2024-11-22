type OkPdfViewMessage = {
  type: 'ok';
  data: string;
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
  where?: string;
};

export type PdfWebViewMessage =
  | NoDataPdfViewMessage
  | OkPdfViewMessage
  | PageCountPdfViewMessage
  | StagePdfViewMessage
  | ViewPortPdfViewMessage
  | ErrorPdfViewMessage;
