import { createContext, forwardRef, useContext } from 'react';
import { Text, type TextProps } from 'react-native';
import {
  mapToEmbeddedFontFamily,
  mapToGoogleFontKey,
} from './mapToEmbeddedFontFamily';
import type {
  FontFamilyMapper,
  FontStyleContext,
  LineHeightMapper,
} from './MyText.types';
import { useFontStyles } from './useFontStyles';

const defaultMapToLineHeight: LineHeightMapper = () => undefined;
/**
 * MyTextContext is a React Context that provides the font styles to
 * all nested MyText components.
 */
const MyTextContext = createContext<FontStyleContext>({
  mapToFontFamily: mapToGoogleFontKey,
  mapToLineHeight: defaultMapToLineHeight,
});

export type MyTextProps = TextProps & {
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

/**
 * A factory function that creates a custom Text component that inherits font styles
 * (fontFamily, fontStyle, fontWeight) from its parent MyText components unless explicitly overridden.
 *
 * @param defaultMapToFontFamily - The default function to map the font family.
 * @returns A React component that renders a Text element with inherited font styles.
 */
const createMyTextComponent = (defaultMapToFontFamily: FontFamilyMapper) =>
  // eslint-disable-next-line react/display-name
  forwardRef<Text, MyTextProps>(
    ({ children, mapToFontFamily, mapToLineHeight, style, ...props }, ref) => {
      const parentStyles = useContext(MyTextContext);
      const { currentFontStyles, combinedStyle } = useFontStyles(
        mapToFontFamily ?? defaultMapToFontFamily,
        mapToLineHeight ?? defaultMapToLineHeight,
        style,
        parentStyles,
      );

      return (
        <MyTextContext.Provider value={currentFontStyles}>
          <Text ref={ref} style={combinedStyle} {...props}>
            {children}
          </Text>
        </MyTextContext.Provider>
      );
    },
  );

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
