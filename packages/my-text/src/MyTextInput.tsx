import { createMyTextInputComponent } from './createMyTextInputComponent';
import {
  mapToEmbeddedFontFamily,
  mapToGoogleFontKey,
} from './mapToEmbeddedFontFamily';

/**
 * MyTextInput is a custom TextInput component that inherits font styles
 * (fontFamily, fontStyle, fontWeight) from its parent MyText components
 * unless explicitly overridden. It presumes the use of Expo Google Fonts
 * and the fonts are loaded using the `useExpoGoogleFonts` hook.
 */
export const MyTextInput = createMyTextInputComponent(mapToGoogleFontKey);

/**
 * MyTextInputE is a custom TextInput component similar to MyTextInput, but it uses
 * embedded font families instead of Google Fonts by default.
 */
export const MyTextInputE = createMyTextInputComponent(mapToEmbeddedFontFamily);
