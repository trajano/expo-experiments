import { createContext, forwardRef, useContext } from 'react';
import { StyleSheet, Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';
import { mapToEmbeddedFontFamily, mapToGoogleFontKey } from './mapToGoogleFontKey';
import type { FontFamilyMapper, LineHeightMapper } from './MyText.types';

/**
 * FontStyleContext is used to define the shape of the font styles
 * that will be tracked and inherited by nested MyText components.
 */
interface FontStyleContext {
    fontFamily?: string;
    fontStyle?: TextStyle['fontStyle'];
    fontWeight?: TextStyle['fontWeight'];
    mapToFontFamily: FontFamilyMapper;
    mapToLineHeight: LineHeightMapper;
}

/**
 * MyTextContext is a React Context that provides the font styles to
 * all nested MyText components.
 */
const MyTextContext = createContext<FontStyleContext>({
    mapToFontFamily: mapToGoogleFontKey,
    mapToLineHeight: () => undefined,
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
 * A custom hook that computes the current font styles and combined styles
 * based on the provided or inherited styles.
 *
 * @param mapToFontFamily - The function that maps logical font family to the final font family.
 * @param mapToLineHeight - The function that maps fontSize to lineHeight.
 * @param style - The incoming style to be flattened and processed.
 * @param parentStyles - The parent styles inherited from the context.
 * @returns The current font styles and the combined styles to be applied to the Text component.
 */
const useFontStyles = (
    mapToFontFamily: FontFamilyMapper,
    mapToLineHeight: LineHeightMapper,
    style: StyleProp<TextStyle>,
    parentStyles: FontStyleContext
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
        currentFontStyles.fontStyle
    );

    const mappedLineHeight = flattenedStyle.lineHeight ?? mapperToLineHeight(flattenedStyle.fontSize);

    const combinedStyle: TextStyle = {
        ...flattenedStyle,
        fontFamily: mappedFontFamily ?? currentFontStyles.fontFamily, // Fallback to original fontFamily if mapping fails
        fontStyle: mappedFontFamily ? undefined : currentFontStyles.fontStyle, // Fallback to original fontStyle if mapping fails
        fontWeight: mappedFontFamily ? undefined : currentFontStyles.fontWeight, // Fallback to original fontWeight if mapping fails
        lineHeight: mappedLineHeight,
    };

    return { currentFontStyles, combinedStyle };
};

/**
 * A factory function that creates a custom Text component that inherits font styles
 * (fontFamily, fontStyle, fontWeight) from its parent MyText components unless explicitly overridden.
 *
 * @param defaultMapToFontFamily - The default function to map the font family.
 * @returns A React component that renders a Text element with inherited font styles.
 */
const createMyTextComponent = (defaultMapToFontFamily: FontFamilyMapper) =>
    forwardRef<Text, MyTextProps>(({ children, mapToFontFamily, mapToLineHeight, style, ...props }, ref) => {
        const parentStyles = useContext(MyTextContext);
        const { currentFontStyles, combinedStyle } = useFontStyles(
            mapToFontFamily ?? defaultMapToFontFamily,
            mapToLineHeight ?? (() => undefined),
            style,
            parentStyles
        );

        return (
            <MyTextContext.Provider value={currentFontStyles}>
                <Text ref={ref} style={combinedStyle} {...props}>
                    {children}
                </Text>
            </MyTextContext.Provider>
        );
    });

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
