export const renderPdfHtml = (pdfJsCode: string, pdfJsWorkerDataUri: string, locale:string="en") =>`
<!DOCTYPE html>
<html lang="${locale}">
<head>
<style>
body, html { margin: 0; padding: 0; background-color: red;}
body {
 display: flex;
 flex-direction: column;
}
canvas {
  flex: 1;
 }
</style>
<script type="module">
${pdfJsCode};
</script>
<script type="module">
const { pdfjsLib } = /** @type {{ pdfjsLib: typeof import('pdfjs-dist') }} */ (globalThis);
pdfjsLib.GlobalWorkerOptions.workerSrc = ${JSON.stringify(pdfJsWorkerDataUri)};
const renderPdfAsync = async () => {
  const stored = JSON.parse(window.ReactNativeWebView.injectedObjectJson());
  const pdfDocument = await pdfjsLib.getDocument({ data: atob(stored.data) }).promise;
  const pdfPage = await pdfDocument.getPage(stored.pageNumber);

  /** @type {HTMLCanvasElement} */
  const canvasElement = document.getElementById('canvas');
  const viewport = pdfPage.getViewport({ scale: stored.scale });
  canvasElement.height= viewport.height;
  canvasElement.width = viewport.width;
    window.ReactNativeWebView.postMessage(
      JSON.stringify({'type': 'viewport', 'width': viewport.width, 'height': viewport.height, 'scale': viewport.scale}),
    );

  await pdfPage.render({
    canvasContext: canvasElement.getContext('2d'),
    viewport: viewport,
  }).promise;
  return { 'type': 'ok', 'data': canvasElement.toDataURL('image/png') };
};
window.onload = () => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({'type': 'stage', 'stage':'loaded'}),
  );


  if (window.ReactNativeWebView.injectedObjectJson && window.ReactNativeWebView.injectedObjectJson()) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({'type': 'stage', 'stage': 'data injected: ' + window.ReactNativeWebView.injectedObjectJson().substring(0,40)}),
    );

    renderPdfAsync()
      .then(
        (message) => {
          window.ReactNativeWebView.postMessage(
            JSON.stringify(message),
          );
        },
      )
      .catch(
        (error) => {
          window.ReactNativeWebView.postMessage(
            JSON.stringify(
              {
                'type': 'error',
                'error': error.message ?? error,
              },
            ),
          );
        },
      );
    return true;
  } else {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({'type': 'error', 'error':'no data'}),
  );
    return true;
  }
};
</script>
</head>
<body>
<canvas id="canvas"></canvas>
</body>
</html>
`
