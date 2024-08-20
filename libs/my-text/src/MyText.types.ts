import type { TextStyle } from 'react-native';

/**
 * A function type that maps the provided font family, weight, and style to a new font family.
 *
 * @param fontFamily - The original font family.
 * @param fontWeight - The original font weight.
 * @param fontStyle - The original font style.
 * @returns The mapped font family or `undefined` if no mapping is applied.
 */
export type FontFamilyMapper = (
  fontFamily?: TextStyle['fontFamily'],
  fontWeight?: TextStyle['fontWeight'],
  fontStyle?: TextStyle['fontStyle'],
) => TextStyle['fontFamily'] | undefined;

/**
 * A function type that maps the provided font size to a new line height.
 *
 * @param fontSize - The original font size.
 * @returns The mapped line height or `undefined` if no mapping is applied.
 */
export type LineHeightMapper = (
  fontSize?: TextStyle['fontSize'],
) => TextStyle['lineHeight'] | undefined;
