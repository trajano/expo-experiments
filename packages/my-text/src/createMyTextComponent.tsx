/* eslint-disable react/display-name */
import { createContext, forwardRef, useContext } from 'react';
import { Text, TextProps } from 'react-native';
import {
  FontFamilyMapper,
  FontStyleContext,
  FontStyleProps,
  LineHeightMapper,
} from './MyText.types';
import { mapToGoogleFontKey } from './mapToEmbeddedFontFamily';
import { useFontStyles } from './useFontStyles';

export const defaultMapToLineHeight: LineHeightMapper = () => undefined;

/**
 * MyTextContext is a React Context that provides the font styles to
 * all nested MyText components.
 */
const MyTextContext = createContext<FontStyleContext>({
  mapToFontFamily: mapToGoogleFontKey,
  mapToLineHeight: defaultMapToLineHeight,
});

/**
 * A factory function that creates a custom Text component that inherits font styles
 * (fontFamily, fontStyle, fontWeight) from its parent MyText components unless explicitly overridden.
 *
 * @param defaultMapToFontFamily - The default function to map the font family.
 * @returns A React component that renders a Text element with inherited font styles.
 */
export const createMyTextComponent = (
  defaultMapToFontFamily: FontFamilyMapper,
) =>
  forwardRef<Text, FontStyleProps & TextProps>(
    ({ mapToFontFamily, mapToLineHeight, style, ...props }, ref) => {
      const parentStyles = useContext(MyTextContext);
      const { currentFontStyles, combinedStyle } = useFontStyles(
        mapToFontFamily ?? defaultMapToFontFamily,
        mapToLineHeight ?? defaultMapToLineHeight,
        style,
        parentStyles,
      );

      return (
        <MyTextContext.Provider value={currentFontStyles}>
          <Text ref={ref} style={combinedStyle} {...props} />
        </MyTextContext.Provider>
      );
    },
  );
