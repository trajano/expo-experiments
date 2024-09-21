import { FC, PropsWithChildren, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

type State = 'default' | 'pressed' | 'focused';

type UnstyledPressableProps = PropsWithChildren<
  {
    children: React.ReactNode;
    contentContainerStyle?: StyleProp<ViewStyle>;
  } & Omit<ViewProps, 'style'>
>;

interface SubComponentProps {
  children: React.ReactNode;
  when?: State;
  style?: ViewStyle;
}

const UnstyledPressable: FC<UnstyledPressableProps> & {
  StartIcon: FC<SubComponentProps>;
  Content: FC<SubComponentProps>;
  EndIcon: FC<SubComponentProps>;
} = ({ children, contentContainerStyle }) => {
  const [state, setState] = useState<State>('default');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setState('pressed');
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const handlePressOut = () => {
    setState('default');
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const handleFocus = () => setState('focused');
  const handleBlur = () => setState('default');

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={contentContainerStyle}
    >
      <View style={styles.content}>{children}</View>
    </Pressable>
  );
};

const SubComponent: FC<SubComponentProps> = ({ children, when, style }) => {
  return <View style={style}>{children}</View>;
};

UnstyledPressable.StartIcon = ({ children, when, style }) => (
  <SubComponent when={when} style={style}>
    {children}
  </SubComponent>
);
UnstyledPressable.StartIcon.displayName = 'StartIcon';

UnstyledPressable.Content = ({ children, when, style }) => (
  <SubComponent when={when} style={style}>
    {children}
  </SubComponent>
);
UnstyledPressable.Content.displayName = 'Content';

UnstyledPressable.EndIcon = ({ children, when, style }) => (
  <SubComponent when={when} style={style}>
    {children}
  </SubComponent>
);
UnstyledPressable.EndIcon.displayName = 'StartIcon';

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UnstyledPressable;
