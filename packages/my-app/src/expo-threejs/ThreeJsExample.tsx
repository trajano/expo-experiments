import { FC, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

export type ThreeJsExampleProps = {
  style?: StyleProp<ViewStyle>;
  /**
   * name of the example
   */
  exampleName: string;
};
/**
 * This is a component that renders Three.js experiments in a web view.
 */
export const ThreeJsExample: FC<ThreeJsExampleProps> = ({
  style,
  exampleName,
}) => {
  const webviewRef = useRef<WebView>(null);
  return (
    <WebView
      testID="webview"
      bounces={false}
      source={{
        uri: `https://threejs.org/examples/${exampleName}.html`,
      }}
      ref={webviewRef}
      style={style}
      onContentProcessDidTerminate={() => webviewRef.current?.reload()}
    />
  );
};
