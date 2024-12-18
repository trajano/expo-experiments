export const renderPdfPipelineHtml = (
  pdfJsCodeUri: string,
  pdfWorkerCodeUri: string,
  locale: string = 'en',
  concurrency: number = 3,
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

class CanvasResourcePool {
  constructor() {
    this.pool = [];
    this.maxSize = ${concurrency};
    this.waitQueue = [];
  }
  async acquire() {
    return new Promise((resolve) => {
      if (this.pool.length > 0) {
        const canvas = this.pool.pop();
        resolve(canvas);
      } else if (this.pool.length + this.waitQueue.length < this.maxSize) {
        const canvas = document.createElement('canvas');
        resolve(canvas);
      } else {
        this.waitQueue.push(resolve);
      }
    });
  }
  /** @param {HTMLCanvasElement} canvas */
  release(canvas) {
    if (this.waitQueue.length > 0) {
      const nextRequester = this.waitQueue.shift();
      const newCanvas = document.createElement('canvas');
      nextRequester(newCanvas);
    } else {
      const newCanvas = document.createElement('canvas');
      this.pool.push(newCanvas);
    }
    canvas.remove();
  }
}
const canvasPool = new CanvasResourcePool();

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
  const canvasElement = await canvasPool.acquire();
  const viewport = pdfPage.getViewport({ scale });
  canvasElement.height= viewport.height;
  canvasElement.width = viewport.width;
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
    canvasPool.release(canvasElement);
  }
};

window.addEventListener('message', (rawMessage) => {
  const message = JSON.parse(rawMessage.data)

  window.ReactNativeWebView.postMessage(
    JSON.stringify({'type': 'received', ...message}),
  );

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
        renderPdfAsync(xhr.response, message.pageNumber, message.scale, message.correlationId);
    }
  }
  xhr.open("GET", message.uri);
  xhr.responseType ="arraybuffer";
  xhr.send();

});

</script>
</head>
<body>
</body>
</html>
`;
