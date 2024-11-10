import { WebView } from 'react-native-webview';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type PhaseWebViewProps = {
  style: StyleProp<ViewStyle>;
};
/**
 * This is a component that renders PhaserWebView.
 */
export const PhaserWebView: FC<PhaseWebViewProps> = ({ style }) => (
  <WebView
    source={{
      uri: 'https://labs.phaser.io/boot.html?src=src\\games\\bank%20panic\\boot.json',
    }}
    style={style}
  />
);
