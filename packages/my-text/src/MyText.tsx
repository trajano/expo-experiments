import { TextInputProps, TextProps } from 'react-native';
import { createMyTextComponent } from './createMyTextComponent';
import {
  mapToEmbeddedFontFamily,
  mapToGoogleFontKey,
} from './mapToEmbeddedFontFamily';
import { FontStyleProps } from './MyText.types';

export type MyTextProps = TextProps & FontStyleProps;

export type MyTextInputProps = TextInputProps & FontStyleProps;
/**
 * MyText is a custom Text component that inherits font styles
 * (fontFamily, fontStyle, fontWeight) from its parent MyText components
 * unless explicitly overridden. It presumes the use of Expo Google Fonts
 * and the fonts are loaded using the `useExpoGoogleFonts` hook.
 */
export const MyText = createMyTextComponent(mapToGoogleFontKey);

/**
 * MyTextE is a custom Text component similar to MyText, but it uses
 * embedded font families instead of Google Fonts by default.
 */
export const MyTextE = createMyTextComponent(mapToEmbeddedFontFamily);
