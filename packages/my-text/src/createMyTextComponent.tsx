import { ComponentType, createContext, forwardRef, useContext } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import {
  FontFamilyMapper,
  FontStyleContext,
  FontStyleProps,
  LineHeightMapper,
} from './MyText.types';
import { mapToGoogleFontKey } from './mapToEmbeddedFontFamily';
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
/**
 * A factory function that creates a custom Text or TextInput component that inherits font styles
 * (fontFamily, fontStyle, fontWeight) from its parent MyText components unless explicitly overridden.
 *
 * @param Component - The React component to be rendered, either Text or TextInput.
 * @param defaultMapToFontFamily - The default function to map the font family.
 * @returns A React component that renders the specified component with inherited font styles.
 */
export const createMyTextComponent = <
  P extends FontStyleProps & { style?: StyleProp<TextStyle> },
>(
  Component: ComponentType<P>,
  defaultMapToFontFamily: FontFamilyMapper,
) =>
  forwardRef<React.ElementRef<typeof Component>, P>(
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
          <Component ref={ref} style={combinedStyle} {...props} />
        </MyTextContext.Provider>
      );
    },
  );
