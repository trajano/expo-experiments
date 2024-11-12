import { FC, forwardRef } from 'react';
import { View } from 'react-native';

export const WebView: FC = forwardRef<View>((props, ref) => (
  <View ref={ref} {...props} />
));
WebView.displayName = 'WebView';
