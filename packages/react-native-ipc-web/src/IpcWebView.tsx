import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { IpcWebViewProps } from './IpcWebViewProps';
import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import { CryptoDigestAlgorithm } from 'expo-crypto';

/*
 * On iOS for it to read files, a file URI must be passed in
 * https://github.com/react-native-webview/react-native-webview/blob/8ad2360ccbd62de5112b90c41fcdee56129b6294/apple/RNCWebViewImpl.m#L881
 */

const IpcWebViewWithRef = (
  {
    sourceProvider,
    sourceFolder = FileSystem.cacheDirectory!,
    onMessage,
    ...props
  }: IpcWebViewProps,
  ref: ForwardedRef<WebView>,
) => {
  const [htmlUri, setHtmlUri] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const htmlContent = await sourceProvider();
      const nextHtmlUri = `${
        sourceFolder +
        (await Crypto.digestStringAsync(
          CryptoDigestAlgorithm.SHA1,
          htmlContent,
        ))
      }.html`;
      await FileSystem.writeAsStringAsync(nextHtmlUri, htmlContent, {
        encoding: 'utf8',
      });

      if (mounted) {
        setHtmlUri(nextHtmlUri);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [sourceProvider, sourceFolder]);
  if (htmlUri === null) {
    return null;
  }
  return (
    <WebView
      {...props}
      ref={ref}
      onMessage={onMessage}
      allowFileAccessFromFileURLs
      allowFileAccess
      allowingReadAccessToURL={sourceFolder}
      originWhitelist={['*']}
      source={{ uri: htmlUri, baseUrl: sourceFolder }}
      style={styles.webview}
      pointerEvents="none"
      webviewDebuggingEnabled={__DEV__}
    />
  );
};

export const IpcWebView = forwardRef<WebView, IpcWebViewProps>((props, ref) =>
  IpcWebViewWithRef(props, ref),
);
IpcWebView.displayName = 'IpcWebView';

const styles = StyleSheet.create({
  webview: {
    position: 'absolute',
    zIndex: -9999,
    opacity: 0,
    width: 1,
    height: 1,
  },
});
