import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { defaultMapToLineHeight } from './createMyTextComponent';
import { FontFamilyMapper, FontStyleProps } from './MyText.types';
import { useFontStyles } from './useFontStyles';

/**
 * A factory function that creates a custom TextInput component.  This does not inherit any style from
 * a parent Text (since that's actually not supported).  However it does the mapping of the fonts and line
 * heights.
 *
 * @param defaultMapToFontFamily - The default function to map the font family.
 * @returns A React component that renders a TextInput element with inherited font styles.
 */

export const createMyTextInputComponent = (
  defaultMapToFontFamily: FontFamilyMapper,
) =>
  forwardRef<TextInput, FontStyleProps & TextInputProps>(
    ({ mapToFontFamily, mapToLineHeight, style, ...props }, ref) => {
      const { combinedStyle } = useFontStyles(
        mapToFontFamily ?? defaultMapToFontFamily,
        mapToLineHeight ?? defaultMapToLineHeight,
        style,
      );

      return <TextInput ref={ref} style={combinedStyle} {...props} />;
    },
  );
