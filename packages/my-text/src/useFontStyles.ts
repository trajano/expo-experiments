import { StyleSheet, type StyleProp, type TextStyle } from 'react-native';
import type {
  FontFamilyMapper,
  FontStyleContext,
  LineHeightMapper,
} from './MyText.types';

/**
 * A custom hook that computes the current font styles and combined styles
 * based on the provided or inherited styles.
 *
 * @param mapToFontFamily - The function that maps logical font family to the final font family.
 * @param mapToLineHeight - The function that maps fontSize to lineHeight.
 * @param style - The incoming style to be flattened and processed.
 * @param parentStyles - The parent styles inherited from the context.
 * @returns The current font styles and the combined styles to be applied to the Text component.
 */
export const useFontStyles = (
  mapToFontFamily: FontFamilyMapper,
  mapToLineHeight: LineHeightMapper,
  style: StyleProp<TextStyle>,
  parentStyles: FontStyleContext,
) => {
  const flattenedStyle = StyleSheet.flatten(style) ?? {};

  const mapperToFontFamily = mapToFontFamily ?? parentStyles.mapToFontFamily;
  const mapperToLineHeight = mapToLineHeight ?? parentStyles.mapToLineHeight;

  const currentFontStyles: FontStyleContext = {
    fontFamily: flattenedStyle.fontFamily ?? parentStyles.fontFamily,
    fontStyle: flattenedStyle.fontStyle ?? parentStyles.fontStyle,
    fontWeight: flattenedStyle.fontWeight ?? parentStyles.fontWeight,
    mapToFontFamily: mapperToFontFamily,
    mapToLineHeight: mapperToLineHeight,
  };

  const mappedFontFamily = mapperToFontFamily(
    currentFontStyles.fontFamily,
    currentFontStyles.fontWeight,
    currentFontStyles.fontStyle,
  );

  const mappedLineHeight =
    flattenedStyle.lineHeight ?? mapperToLineHeight(flattenedStyle.fontSize);

  const combinedStyle: TextStyle = {
    ...flattenedStyle,
    fontFamily: mappedFontFamily ?? currentFontStyles.fontFamily, // Fallback to original fontFamily if mapping fails
    fontStyle: mappedFontFamily ? undefined : currentFontStyles.fontStyle, // Fallback to original fontStyle if mapping fails
    fontWeight: mappedFontFamily ? undefined : currentFontStyles.fontWeight, // Fallback to original fontWeight if mapping fails
    lineHeight: mappedLineHeight,
  };

  return { currentFontStyles, combinedStyle };
};
