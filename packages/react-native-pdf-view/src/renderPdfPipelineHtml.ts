export const renderPdfPipelineHtml = (
  pdfJsCodeUri: string,
  pdfWorkerCodeUri: string,
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
<script type="module" src="${pdfJsCodeUri}"></script>
<script type="module">
const { pdfjsLib } = /** @type {{ pdfjsLib: typeof import('pdfjs-dist') }} */ (globalThis);
pdfjsLib.GlobalWorkerOptions.workerSrc = ${JSON.stringify(pdfWorkerCodeUri)};
/**
*
* @param {ArrayBuffer} arrayBuffer array buffer of PDF file
* @param {number} pageNumber page number
* @param {number} scale scale
* @param {string} correlationId correlation ID
* @returns {Promise<{data: string, type: string}>}
*/
const renderPdfAsync = async (arrayBuffer, pageNumber, scale, correlationId) => {
  const pdfDocument = await pdfjsLib.getDocument({data: new Uint8Array(arrayBuffer)}).promise;
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

  window.ReactNativeWebView.postMessage(
    JSON.stringify({'type': 'received', ...message}),
  );

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    console.log(xhr.readyState, message.uri);
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
        renderPdfAsync(xhr.response, message.pageNumber, message.scale, message.correlationId).then();
    }
  }
  xhr.open("GET", message.uri);
  xhr.responseType ="arraybuffer";
  setTimeout(()=> xhr.send(), 3000);

});

</script>
</head>
<body>
</body>
</html>
`;
