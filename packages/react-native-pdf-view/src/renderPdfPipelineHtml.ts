export const renderPdfPipelineHtml = (
  pdfJsCode: string,
  pdfJsWorkerDataUri: string,
  locale: string = 'en',
) => `
<!DOCTYPE html>
<html lang="${locale}">
<head>
<title>PdfPipeline</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body, html {
  margin: 0; padding: 0;
}
canvas {
  width: 100%;
 }
</style>
<script type="module">
${pdfJsCode};
</script>
<script type="module">
const { pdfjsLib } = /** @type {{ pdfjsLib: typeof import('pdfjs-dist') }} */ (globalThis);
pdfjsLib.GlobalWorkerOptions.workerSrc = ${JSON.stringify(pdfJsWorkerDataUri)};

/**
*
* @param {string} pdfData PDF data as base64
* @param {number} pageNumber page number
* @param {number} scale scale
* @param {string} correlationId correlation ID
* @returns {Promise<{data: string, type: string}>}
*/
const renderPdfAsync = async (pdfData, pageNumber, scale, correlationId) => {
  const pdfDocument = await pdfjsLib.getDocument({ data: atob(pdfData) }).promise;
  window.ReactNativeWebView.postMessage(
    JSON.stringify({'type': 'numPages', 'numPages': pdfDocument.numPages, correlationId}),
  );

  const pdfPage = await pdfDocument.getPage(pageNumber);

  /** @type {HTMLCanvasElement} */
  const canvasElement = document.createElement('canvas');
  const viewport = pdfPage.getViewport({ scale });
  canvasElement.height= viewport.height;
  canvasElement.width = viewport.width;
  document.body.appendChild(canvasElement);
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
        type: 'viewport',
        width: viewport.width,
        height: viewport.height,
        scale: viewport.scale,
        correlationId}),
  );

  try {
    await pdfPage.render({
      canvasContext: canvasElement.getContext('2d'),
      viewport: viewport,
    }).promise;

  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: 'ok',
      data: canvasElement.toDataURL('image/png'),
      correlationId
}));
  } finally {
    document.body.removeChild(canvasElement);
    canvasElement.remove();
  }
};

window.addEventListener('message', (rawMessage) => {
  const message = JSON.parse(rawMessage.data)
  renderPdfAsync(message.pdfData, message.pageNumber, message.scale, message.correlationId).then();
});

</script>
</head>
<body>
</body>
</html>
`;
