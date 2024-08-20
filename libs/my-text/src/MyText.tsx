import { createContext, forwardRef, useContext, useMemo } from 'react';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';
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
     * An optional mapper that would get the final font family given the logical font family, font weight and font style.
     * This defalts to {@link mapToGoogleFontKey}
     */
    mapToFontFamily?: FontFamilyMapper,
    /**
     * An optional mapper that would take the fontSize and translate it to a lineHeight value to ensure consistency across platforms.
     * This defalts to always return `undefined` which lets React Native handle it natively.
     */
    mapToLineHeight?: LineHeightMapper,
}
/**
 * MyText is a custom Text component that inherits font styles
 * (fontFamily, fontStyle, fontWeight) from its parent MyText components
 * unless explicitly overridden.  It presumes the use of Expo Google Fonts  https://docs.expo.dev/develop/user-interface/fonts/#use-google-fonts 
 * and are loaded using useExpoGoogleFonts hook
 *
 * @param props - Props passed to the Text component.
 * @param ref - Ref forwarded to the Text component.
 * @returns A Text component with inherited font styles.
 */
export const MyText = forwardRef<Text, MyTextProps>(({ children, mapToFontFamily, mapToLineHeight, style, ...props }, ref) => {
    // Retrieve the parent styles from context
    const parentStyles = useContext(MyTextContext);

    // Flatten the incoming style to simplify processing
    const flattenedStyle = useMemo(() => StyleSheet.flatten(style) ?? {}, [style]);

    // Use a single useMemo to compute both currentFontStyles and combinedStyle
    const { currentFontStyles, combinedStyle } = useMemo(() => {
        const mapperToFontFamily = mapToFontFamily ?? mapToGoogleFontKey;
        const mapperToLineHeight = mapToLineHeight ?? (() => undefined);
        const currentFontStyles: FontStyleContext = {
            fontFamily: flattenedStyle.fontFamily ?? parentStyles.fontFamily,
            fontStyle: flattenedStyle.fontStyle ?? parentStyles.fontStyle,
            fontWeight: flattenedStyle.fontWeight ?? parentStyles.fontWeight,
            mapToFontFamily: mapperToFontFamily,
            mapToLineHeight: mapperToLineHeight
        };

        const mappedFontFamily = mapperToFontFamily(
            currentFontStyles.fontFamily,
            currentFontStyles.fontWeight,
            currentFontStyles.fontStyle,
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
    }, [flattenedStyle, parentStyles]);

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
 * unless explicitly overridden.  It presumes the use of Expo Google Fonts  https://docs.expo.dev/develop/user-interface/fonts/#use-google-fonts 
 * and are loaded using useExpoGoogleFonts hook
 *
 * @param props - Props passed to the Text component.
 * @param ref - Ref forwarded to the Text component.
 * @returns A Text component with inherited font styles.
 */
export const MyTextE = forwardRef<Text, MyTextProps>(({ children, mapToFontFamily, mapToLineHeight, style, ...props }, ref) => {
    // Retrieve the parent styles from context
    const parentStyles = useContext(MyTextContext);

    // Flatten the incoming style to simplify processing
    const flattenedStyle = useMemo(() => StyleSheet.flatten(style) ?? {}, [style]);

    // Use a single useMemo to compute both currentFontStyles and combinedStyle
    const { currentFontStyles, combinedStyle } = useMemo(() => {
        const mapperToFontFamily = mapToFontFamily ?? mapToEmbeddedFontFamily;
        const mapperToLineHeight = mapToLineHeight ?? (() => undefined);
        const currentFontStyles: FontStyleContext = {
            fontFamily: flattenedStyle.fontFamily ?? parentStyles.fontFamily,
            fontStyle: flattenedStyle.fontStyle ?? parentStyles.fontStyle,
            fontWeight: flattenedStyle.fontWeight ?? parentStyles.fontWeight,
            mapToFontFamily: mapperToFontFamily,
            mapToLineHeight: mapperToLineHeight
        };

        const mappedFontFamily = mapperToFontFamily(
            currentFontStyles.fontFamily,
            currentFontStyles.fontWeight,
            currentFontStyles.fontStyle,
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
    }, [flattenedStyle, parentStyles]);

    return (
        <MyTextContext.Provider value={currentFontStyles}>
            <Text ref={ref} style={combinedStyle} {...props}>
                {children}
            </Text>
        </MyTextContext.Provider>
    );
});
