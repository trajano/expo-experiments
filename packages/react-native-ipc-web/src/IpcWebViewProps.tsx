import { WebViewProps } from 'react-native-webview';

export type IpcWebViewProps = Omit<
  WebViewProps,
  'source' | 'originWhiteList' | 'style'
> & {
  sourceProvider: () => Promise<string>;
  /**
   * Folder to write the source to.  The contents of this folder will be accessible by
   * the web view for file access via XMLHttpRequest.  This must end with a `/`. This defaults to FileSystem.cacheDirectory.
   */
  sourceFolder?: string;
};
