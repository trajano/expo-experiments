import * as FileSystem from 'expo-file-system';

export const fetchToBase64 = async (
  uri: string,
  requestOptions?: RequestInit,
): Promise<string> => {
  if (uri.startsWith('file://')) {
    return FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  }
  const response = await fetch(uri, requestOptions);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onerror = () => {
      reject(new Error(`Unable to read ${uri}`));
    };
    fileReader.onload = () => {
      resolve((fileReader.result as string).split(',')[1]);
    };
    fileReader.readAsDataURL(blob);
  });
};
