import { WebViewProps } from 'react-native-webview';

export type IpcWebViewProps = Omit<
  WebViewProps,
  'source' | 'originWhiteList' | 'style'
> & {
  sourceProvider: () => Promise<string>;
};
