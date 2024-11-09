import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

export type ThreeJsExampleProps = {
  style: StyleProp<ViewStyle>;
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
}) => (
  <WebView
    source={{
      uri: `https://threejs.org/examples/${exampleName}.html`,
    }}
    style={style}
  />
);
