import { Asset } from 'expo-asset';
import { fetchCachedFileAsync } from './fetchCachedFileAsync';
import * as FileSystem from 'expo-file-system';
import { renderPdfHtml } from './renderPdfHtml';

const fetchOrAssetCopyAsync = async (src: string | Asset): Promise<string> => {
  if (typeof src === 'string') {
    return fetchCachedFileAsync(src);
  } else {
    const downloadedAsset = await src.downloadAsync();
    return downloadedAsset.localUri!;
  }
};
export const buildPdfHtmlAsync = async (
  pdfJs: string | Asset,
  pdfWorkerJs: string | Asset,
): Promise<string> => {
  const [pdfJsUri, pdfWorkerJsUri] = await Promise.all([
    fetchOrAssetCopyAsync(pdfJs),
    fetchOrAssetCopyAsync(pdfWorkerJs),
  ]);
  const pdfJsCode = await FileSystem.readAsStringAsync(pdfJsUri, {
    encoding: 'utf8',
  });
  const pdfWorkerCodeBase64 = await FileSystem.readAsStringAsync(
    pdfWorkerJsUri,
    { encoding: 'base64' },
  );
  const pdfWorkerDataUri = `data:application/javascript;base64,${pdfWorkerCodeBase64}`;
  return renderPdfHtml(pdfJsCode, pdfWorkerDataUri);
};
