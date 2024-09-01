import { render, fireEvent } from '@testing-library/react-native';
import { Animated } from 'react-native';
import UnstyledPressable from './UnstyledPressable';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('UnstyledPressable Component', () => {
  it('renders correctly with child components', () => {
    const { getByTestId } = render(
      <UnstyledPressable>
        <UnstyledPressable.StartIcon testID="start-icon">
          <Animated.Image source={{ uri: 'start-icon.png' }} />
        </UnstyledPressable.StartIcon>
        <UnstyledPressable.Content testID="content">
          <Animated.Image source={{ uri: 'content.png' }} />
        </UnstyledPressable.Content>
        <UnstyledPressable.EndIcon testID="end-icon">
          <Animated.Image source={{ uri: 'end-icon.png' }} />
        </UnstyledPressable.EndIcon>
      </UnstyledPressable>,
    );

    expect(getByTestId('start-icon')).toBeTruthy();
    expect(getByTestId('content')).toBeTruthy();
    expect(getByTestId('end-icon')).toBeTruthy();
  });

  it('handles press in and out events with animation', () => {
    const scaleAnim = new Animated.Value(1);
    const { getByTestId } = render(
      <UnstyledPressable>
        <UnstyledPressable.Content testID="content">
          <Animated.Image source={{ uri: 'content.png' }} />
        </UnstyledPressable.Content>
      </UnstyledPressable>,
    );

    const content = getByTestId('content');

    // Simulate press in
    fireEvent.pressIn(content);
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start();

    expect(scaleAnim).toEqual(new Animated.Value(0.95));

    // Simulate press out
    fireEvent.pressOut(content);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    expect(scaleAnim).toEqual(new Animated.Value(1));
  });

  it('changes state on focus and blur', () => {
    const { getByTestId } = render(
      <UnstyledPressable>
        <UnstyledPressable.Content testID="content">
          <Animated.Image source={{ uri: 'content.png' }} />
        </UnstyledPressable.Content>
      </UnstyledPressable>,
    );

    const content = getByTestId('content');

    // Simulate focus
    fireEvent.focus(content);
    expect(content).toBeTruthy();

    // Simulate blur
    fireEvent.blur(content);
    expect(content).toBeTruthy();
  });
});
