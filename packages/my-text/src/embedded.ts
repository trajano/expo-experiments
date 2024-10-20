/**
 * This module provides an alternate text renderer that leverages how @expo-google-fonts are used for embedded font scenarios.  It allows a simple migration path from loaded fonts to embedded fonts by rexporting the embedded variants with the same name as the loaded variants.
 */
export { useExpoGoogleFonts } from './useExpoGoogleFonts';
export { MyTextE as MyText } from './MyText';
export { MyTextInputE as MyTextInput } from './MyTextInput';
export { StrongE as Strong, EmE as Em } from './variants';
