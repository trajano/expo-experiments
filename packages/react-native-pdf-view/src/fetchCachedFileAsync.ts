import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';

export const fetchCachedFileAsync = async (
  sourceUri: string,
): Promise<string> => {
  if (sourceUri.startsWith('file:///')) {
    return sourceUri;
  }
  const filename = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    JSON.stringify(sourceUri),
  );
  const cachedFileUri = `${FileSystem.cacheDirectory}${filename}`;
  const download = await FileSystem.downloadAsync(sourceUri, cachedFileUri, {
    cache: true,
  });
  if (download.status === 200) {
    return download.uri;
  } else {
    throw new Error(`unexpected HTTP status: ${download.status}`);
  }
};
