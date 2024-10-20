/**
 * This module provides an alternative text rendering solution optimized
 * for use with expo-google-fonts.
 *
 * Note: While both embedded and non-embedded text components can be used
 * together, it is recommended to select one approach for consistency and
 * to avoid confusion.
 *
 * To use the embedded components version of this module, import from:
 * ```ts
 * import * as MyText from 'react-native-my-text/embedded';
 * ```
 * The above import provides the embedded variants of all components
 * re-exported by this module.
 */
export { useExpoGoogleFonts } from './useExpoGoogleFonts';
export { MyText, MyTextE } from './MyText';
export { MyTextInput, MyTextInputE } from './MyTextInput';
export { Strong, StrongE, Em, EmE } from './variants';
