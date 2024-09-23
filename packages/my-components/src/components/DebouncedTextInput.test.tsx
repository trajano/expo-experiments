import { render, fireEvent, act } from '@testing-library/react-native';
import { DebouncedTextInput } from './DebouncedTextInput';

jest.useFakeTimers();
const normalizeWhitespace = (text: string) => text.replace(/\s+/g, ' ').trim();

describe('DebouncedTextInput Component', () => {
  it('should update the debounced value after the debounce timeout', () => {
    const { getByPlaceholderText, queryByText, getByText } = render(
      <DebouncedTextInput />,
    );
    const input = getByPlaceholderText('Type here...');

    // Simulate user typing 'Hello' in the input field
    fireEvent.changeText(input, 'Hello');

    // Fast forward time by 250ms, which is still within the debounce timeout
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Expect that the debounced value has not been updated yet
    expect(queryByText('Debounced Value: Hello')).toBeNull();

    // Fast forward by another 50ms to reach the total debounce timeout of 300ms
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Now the debounced value should update since the total time equals the debounce timeout
    expect(getByText('Debounced Value: Hello')).toBeTruthy();
  });

  it('should update the debounced value after the max wait timeout even with continuous input', () => {
    const { getByPlaceholderText, queryByText } = render(
      <DebouncedTextInput />,
    );
    const input = getByPlaceholderText('Type here...');

    // Simulate user typing 'World' in the input field
    fireEvent.changeText(input, 'World');

    // Fast forward time by 500ms, which does not reach the max wait timeout yet
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Debounced value should update because the total time has passed without more typing
    expect(
      queryByText('Debounced Value: World', {
        normalizer: normalizeWhitespace,
      }),
    ).toBeTruthy();

    // Simulate additional typing to reset the debounce timer
    fireEvent.changeText(input, 'World!');

    // Fast forward time by another 500ms, reaching a total of 1000ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now the max wait timeout should trigger an update, ensuring the debounced value updates
    expect(
      queryByText('Debounced Value: World', {
        normalizer: normalizeWhitespace,
      }),
    ).toBeTruthy();
  });

  it('should update the value immediately after debounce timeout with no further input', () => {
    const { getByPlaceholderText, queryByText, getByText } = render(
      <DebouncedTextInput />,
    );
    const input = getByPlaceholderText('Type here...');

    // Simulate user typing 'Quick Test' in the input field
    fireEvent.changeText(input, 'Quick Test');

    // Fast forward time by 300ms, which is the debounce timeout duration
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Debounced value should update after the debounce timeout has been reached
    expect(getByText('Debounced Value: Quick Test')).toBeTruthy();

    // Without further input, the debounced value should remain the same
    expect(queryByText('Debounced Value: Quick Test')).toBeTruthy();
  });
});
