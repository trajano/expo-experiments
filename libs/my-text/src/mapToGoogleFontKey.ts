import { Platform } from 'react-native';
import type { FontFamilyMapper } from './MyText.types';

/**
 * A mapping of various fontWeight values to their corresponding Expo Google Font keys.
 */
const weightMap: Record<string | number, string> = {
  '100': '200ExtraLight',
  '200': '200ExtraLight',
  '300': '300Light',
  '400': '400Regular',
  '500': '500Medium',
  '600': '600SemiBold',
  '700': '700Bold',
  '800': '800ExtraBold',
  '900': '900Black',
  normal: '400Regular', // Default mapping for 'normal'
  bold: '700Bold', // Default mapping for 'bold'
  ultralight: '200ExtraLight', // Map 'ultralight' to '200ExtraLight'
  thin: '200ExtraLight', // Map 'thin' to '200ExtraLight'
  light: '300Light', // Map 'light' to '300Light'
  medium: '500Medium', // Map 'medium' to '500Medium'
  regular: '400Regular', // Map 'regular' to '400Regular'
  semibold: '600SemiBold', // Map 'semibold' to '600SemiBold'
  condensedBold: '700Bold', // Approximate 'condensedBold' with '700Bold'
  condensed: '400Regular', // Approximate 'condensed' with '400Regular'
  heavy: '800ExtraBold', // Map 'heavy' to '800ExtraBold'
  black: '900Black', // Map 'black' to '900Black'
};

const postscriptWeightMap: Record<string | number, string> = {
  '100': 'Thin',
  '200': 'ExtraLight',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
  '800': 'ExtraBold',
  '900': 'Black',
  normal: 'Regular', // Default mapping for 'normal'
  bold: 'Bold', // Default mapping for 'bold'
};

/**
 * Maps the combination of fontFamily, fontWeight, and fontStyle
 * to the corresponding Expo Google Font key.
 *
 * @param fontFamily - The fontFamily name.
 * @param fontWeight - The fontWeight value, which could be a string or number.
 * @param fontStyle - The fontStyle, such as 'normal' or 'italic'.
 * @returns The corresponding Google Font key if available, or undefined.
 */
export const mapToGoogleFontKey: FontFamilyMapper = (
  fontFamily,
  fontWeight,
  fontStyle,
) => {
  if (!fontFamily) return undefined;

  const weightKey = weightMap[fontWeight ?? 'normal'];
  const styleSuffix = fontStyle === 'italic' ? '_Italic' : '';

  return `${fontFamily}_${weightKey}${styleSuffix}`;
};

/**
 * Maps the combination of fontFamily, fontWeight, and fontStyle
 * to the corresponding PostScript name for iOS.
 *
 * @param fontFamily - The fontFamily name.
 * @param fontWeight - The fontWeight value, which could be a string or number.
 * @param fontStyle - The fontStyle, such as 'normal' or 'italic'.
 * @returns The corresponding PostScript name if available, or undefined.
 */
export const mapToPostScriptName: FontFamilyMapper = (
  fontFamily,
  fontWeight,
  fontStyle,
) => {
  if (!fontFamily) return undefined;

  const weightName = postscriptWeightMap[fontWeight ?? 'normal'] ?? 'Regular';
  const styleSuffix = fontStyle === 'italic' ? 'Italic' : '';
  if (weightName === 'Regular' && styleSuffix === 'Italic') {
    return `${fontFamily}-${styleSuffix}`;
  }
  return `${fontFamily}-${weightName}${styleSuffix}`;
};

/**
 * Maps the combination of fontFamily, fontWeight, and fontStyle
 * to the corresponding PostScript name for iOS.
 *
 * @param fontFamily - The fontFamily name.
 * @param fontWeight - The fontWeight value, which could be a string or number.
 * @param fontStyle - The fontStyle, such as 'normal' or 'italic'.
 * @returns The corresponding PostScript name if available, or undefined.
 */
export const mapToEmbeddedFontFamily: FontFamilyMapper = (
  fontFamily,
  fontWeight,
  fontStyle,
) => {
  return Platform.select({
    ios: mapToPostScriptName(fontFamily, fontWeight, fontStyle),
    default: mapToGoogleFontKey(fontFamily, fontWeight, fontStyle),
  });
};
