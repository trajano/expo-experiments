import { Asset } from 'expo-asset';
import { fetchCachedFileAsync } from './fetchCachedFileAsync';
import * as FileSystem from 'expo-file-system';
import { EncodingType } from 'expo-file-system';
import { renderPdfHtml } from './renderPdfHtml';
import * as Crypto from 'expo-crypto';

const fetchOrAssetCopyAsync = async (
  src: string | Asset,
  ext: string,
  cacheEnabled: boolean,
): Promise<string> => {
  if (typeof src === 'string') {
    return fetchCachedFileAsync(src, ext, cacheEnabled);
  } else {
    const downloadedAsset = await src.downloadAsync();
    return downloadedAsset.localUri!;
  }
};
export const buildPdfHtmlAsync = async (
  pdfJs: string | Asset,
  pdfWorkerJs: string | Asset,
  cacheEnabled: boolean,
): Promise<string> => {
  const filename = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    JSON.stringify({
      pdfJs,
      pdfWorkerJs,
      render: renderPdfHtml('', ''),
    }),
  );
  const pdfHtmlUri = `${FileSystem.cacheDirectory}${filename}.html`;
  const htmlFileInfo = await FileSystem.getInfoAsync(pdfHtmlUri);
  if (htmlFileInfo.exists && cacheEnabled) {
    return await FileSystem.readAsStringAsync(pdfHtmlUri, {
      encoding: EncodingType.UTF8,
    });
  }

  const [pdfJsUri, pdfWorkerJsUri] = await Promise.all([
    fetchOrAssetCopyAsync(pdfJs, 'mjs', cacheEnabled),
    fetchOrAssetCopyAsync(pdfWorkerJs, 'mjs', cacheEnabled),
  ]);
  const pdfJsCode = await FileSystem.readAsStringAsync(pdfJsUri, {
    encoding: EncodingType.UTF8,
  });
  const pdfWorkerCodeBase64 = await FileSystem.readAsStringAsync(
    pdfWorkerJsUri,
    { encoding: EncodingType.Base64 },
  );
  const pdfWorkerDataUri = `data:application/javascript;base64,${pdfWorkerCodeBase64}`;
  const renderedHtml = renderPdfHtml(pdfJsCode, pdfWorkerDataUri);
  await FileSystem.writeAsStringAsync(pdfHtmlUri, renderedHtml, {
    encoding: EncodingType.UTF8,
  });
  return renderedHtml;
};
