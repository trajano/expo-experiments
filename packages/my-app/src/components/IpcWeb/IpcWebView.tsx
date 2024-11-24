import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { WebView, WebViewProps } from 'react-native-webview';
import { StyleSheet } from 'react-native';

export type IpcWebViewProps = Omit<
  WebViewProps,
  'source' | 'originWhiteList' | 'style'
> & {
  sourceProvider: () => Promise<string>;
};
const IpcWebViewWithRef = (
  { sourceProvider, onMessage, ...props }: IpcWebViewProps,
  ref: ForwardedRef<WebView>,
) => {
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const nextHtml = await sourceProvider();
      if (mounted) {
        setHtml(nextHtml);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [sourceProvider]);
  if (html === null) {
    return null;
  }
  return (
    <WebView
      {...props}
      ref={ref}
      onMessage={onMessage}
      originWhitelist={['*']}
      source={{ html }}
      style={styles.webview}
      webviewDebuggingEnabled={__DEV__}
    />
  );
};

export const IpcWebView = forwardRef<WebView, IpcWebViewProps>((props, ref) =>
  IpcWebViewWithRef(props, ref),
);
const styles = StyleSheet.create({
  webview: {
    position: 'absolute',
    zIndex: -9999,
    opacity: 0,
    width: 1,
    height: 1,
  },
});
