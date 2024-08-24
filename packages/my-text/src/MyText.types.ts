import type { TextStyle } from 'react-native';

/**
 * FontStyleContext is used to define the shape of the font styles
 * that will be tracked and inherited by nested MyText components.
 */
export interface FontStyleContext {
  fontFamily?: string;
  fontStyle?: TextStyle['fontStyle'];
  fontWeight?: TextStyle['fontWeight'];
  mapToFontFamily: FontFamilyMapper;
  mapToLineHeight: LineHeightMapper;
}

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

/**
 * A reusable type that contains the shared properties for both Text and TextInput components.
 */
export type FontStyleProps = {
  /**
   * An optional mapper that would get the final font family given the logical font family, font weight, and font style.
   * This defaults to {@link mapToGoogleFontKey}
   */
  mapToFontFamily?: FontFamilyMapper;

  /**
   * An optional mapper that would take the fontSize and translate it to a lineHeight value to ensure consistency across platforms.
   * This defaults to always return `undefined` which lets React Native handle it natively.
   */
  mapToLineHeight?: LineHeightMapper;
};
