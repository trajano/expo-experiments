import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { EncodingType } from 'expo-file-system';
import { renderPdfHtml } from './renderPdfHtml';

const fetchOrAssetCopyAsync = async (src: string | Asset): Promise<string> => {
  if (typeof src === 'string') {
    const downloadedAsset = await Asset.fromURI(src).downloadAsync();
    return downloadedAsset.localUri!;
  } else {
    const downloadedAsset = await src.downloadAsync();
    return downloadedAsset.localUri!;
  }
};
/**
 * This does not cache because if there's multiple requests it will clash.
 * @param pdfJs
 * @param pdfWorkerJs
 */
export const buildPdfHtmlAsync = async (
  pdfJs: string | Asset,
  pdfWorkerJs: string | Asset,
): Promise<string> => {
  const [pdfJsUri, pdfWorkerJsUri] = await Promise.all([
    fetchOrAssetCopyAsync(pdfJs),
    fetchOrAssetCopyAsync(pdfWorkerJs),
  ]);
  const pdfJsCode = await FileSystem.readAsStringAsync(pdfJsUri, {
    encoding: EncodingType.UTF8,
  });
  const pdfWorkerCodeBase64 = await FileSystem.readAsStringAsync(
    pdfWorkerJsUri,
    { encoding: EncodingType.Base64 },
  );
  const pdfWorkerDataUri = `data:application/javascript;base64,${pdfWorkerCodeBase64}`;
  return renderPdfHtml(pdfJsCode, pdfWorkerDataUri);
};
