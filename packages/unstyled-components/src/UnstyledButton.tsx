import { Children, FC, isValidElement, ReactElement } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  I18nManager,
  Animated,

} from 'react-native';

/**
 * Props for the UnstyledButton component.
 * Extends from ViewProps to include all standard View properties.
 *
 * @property {StyleProp<ViewStyle>} contentContainerStyle - Optional style for the main content container.
 */
type UnstyledButtonProps = ViewProps & {
  contentContainerStyle?: StyleProp<ViewStyle>;
};

/**
 * UnstyledButton Component
 *
 * This component serves as a customizable button that provides "slots" for a start icon, end icon,
 * and main content. It respects RTL (Right-To-Left) layout settings automatically using `I18nManager`.
 *
 * @example
 * <UnstyledButton testID="test-id" style={{ padding: 10 }}>
 *   <UnstyledButton.StartIcon>
 *     <Image source={{ uri: 'startImage' }} style={{ width: 20, height: 20 }} />
 *   </UnstyledButton.StartIcon>
 *   <Text>Hello world</Text>
 *   <Text>Stinky Tofu</Text>
 *   <UnstyledButton.EndIcon>
 *     <Text>✓</Text>
 *   </UnstyledButton.EndIcon>
 * </UnstyledButton>
 */
export const UnstyledButton: FC<UnstyledButtonProps> & {
  StartIcon: FC<ViewProps>;
  EndIcon: FC<ViewProps>;
} = ({ style, contentContainerStyle, children, testID, ...rest }) => {
  const startIcon = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === UnstyledButton.StartIcon,
  );

  const endIcon = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === UnstyledButton.EndIcon,
  );

  const mainContent = Children.toArray(children).filter(
    (child) => !(isValidElement(child) && (child.type === UnstyledButton.StartIcon || child.type === UnstyledButton.EndIcon)),
  );

  return (
    <View
      testID={testID}
      style={style ? [styles.buttonStyle, style] : styles.buttonStyle}
      {...rest}
    >
      {startIcon}
      <View style={contentContainerStyle}>
        {mainContent}
      </View>
      {endIcon}

    </View>
  );
};

/**
 * StartIcon Component
 *
 * A slot for placing an icon at the start of the UnstyledButton. Can be styled and customized
 * as needed. Typically used for leading icons.
 */
const StartIcon: FC<ViewProps> = ({ children, ...props }) => (
  <View {...props}>{children}</View>
);

/**
 * EndIcon Component
 *
 * A slot for placing an icon at the end of the UnstyledButton. Can be styled and customized
 * as needed. Typically used for trailing icons.
 */
const EndIcon: FC<ViewProps> = ({ children, ...props }) => (
  <View {...props}>{children}</View>
);

// Assign display names for better debugging and visibility in React DevTools
StartIcon.displayName = 'UnstyledButton.StartIcon';
EndIcon.displayName = 'UnstyledButton.EndIcon';

// Attach StartIcon and EndIcon as static properties to the main component
UnstyledButton.StartIcon = StartIcon;
UnstyledButton.EndIcon = EndIcon;

// Styles for the UnstyledButton component
const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', // Adjust layout direction based on RTL setting
    alignItems: 'center', // Vertically center all children
    justifyContent: 'center', // Horizontally center if space available
  },
});

export const AnimatedUnstyledButton = Animated.createAnimatedComponent(UnstyledButton);