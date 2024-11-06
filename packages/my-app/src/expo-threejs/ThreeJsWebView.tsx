import { WebView } from 'react-native-webview';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ThreeJsWebViewProps = {
  style: StyleProp<ViewStyle>;
};
/**
 * This is a component that renders ThreeJsWebView.
 */
export const ThreeJsWebView: FC<ThreeJsWebViewProps> = ({ style }) => (
  <WebView
    source={{
      uri: 'https://threejs.org/examples/webgl_animation_skinning_ik.html',
    }}
    style={style}
  />
);
