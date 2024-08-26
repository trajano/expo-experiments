import { act, renderHook } from '@testing-library/react-native';
import { useDebounceState } from './useDebounceState';

jest.useFakeTimers();

it('should debounce state updates correctly and count state changes', () => {
  jest.setSystemTime(0);
  const renderFn = jest.fn();

  const { result } = renderHook(() => {
    const [debouncedState, setDebouncedState] = useDebounceState(0);
    renderFn();
    return [debouncedState, setDebouncedState] as const;
  });

  // do not get current[0] because the value can change over time
  const setDebouncedState = result.current[1];
  expect(renderFn).toHaveBeenCalledTimes(1); // State changed once

  setDebouncedState(1);
  jest.advanceTimersByTime(250);
  setDebouncedState(2);
  jest.advanceTimersByTime(250);
  setDebouncedState(3);
  jest.advanceTimersByTime(250);
  act(() => {
    setDebouncedState(4);
    jest.advanceTimersByTime(250);
  });

  expect(result.current[0]).toBe(1);
  expect(renderFn).toHaveBeenCalledTimes(2);

  setDebouncedState(5);
  jest.advanceTimersByTime(250);

  setDebouncedState(6);
  jest.advanceTimersByTime(250);

  act(() => {
    jest.advanceTimersToNextTimer();
  });
  expect(result.current[0]).toBe(6);
  expect(renderFn).toHaveBeenCalledTimes(3);
  expect(jest.now()).toBe(1550);
});

it('should debounce state updates correctly and count state changes up to 10', () => {
  jest.setSystemTime(0);
  const renderFn = jest.fn();

  const { result } = renderHook(() => {
    const [debouncedState, setDebouncedState] = useDebounceState(0);
    renderFn();
    return [debouncedState, setDebouncedState] as const;
  });

  // do not get current[0] because the value can change over time
  const setDebouncedState = result.current[1];
  expect(renderFn).toHaveBeenCalledTimes(1); // State changed once

  setDebouncedState(1);
  jest.advanceTimersByTime(250);
  setDebouncedState(2);
  jest.advanceTimersByTime(250);
  setDebouncedState(3);
  jest.advanceTimersByTime(250);
  act(() => {
    setDebouncedState(4);
    jest.advanceTimersByTime(250);
  });

  expect(result.current[0]).toBe(1);
  expect(renderFn).toHaveBeenCalledTimes(2);

  setDebouncedState(5);
  jest.advanceTimersByTime(250);

  setDebouncedState(6);
  jest.advanceTimersByTime(250);

  setDebouncedState(7);
  jest.advanceTimersByTime(250);

  act(() => {
    setDebouncedState(8);
    jest.advanceTimersByTime(250);
  });

  setDebouncedState(9);
  jest.advanceTimersByTime(250);
  setDebouncedState(10);

  act(() => {
    jest.advanceTimersToNextTimer();
  });

  expect(result.current[0]).toBe(10);
  expect(renderFn).toHaveBeenCalledTimes(4);
  expect(jest.now()).toBe(2550);
});

it('should update state immediately if data comes with enough delay and count state changes', () => {
  const renderFn = jest.fn();

  const { result } = renderHook(() => {
    const [debouncedState, setDebouncedState] = useDebounceState(0);
    renderFn();
    return [debouncedState, setDebouncedState] as const;
  });

  // do not get current[0] because the value can change over time
  const setDebouncedState = result.current[1];
  expect(renderFn).toHaveBeenCalledTimes(1); // State changed once

  act(() => {
    setDebouncedState(1);
    jest.advanceTimersByTime(300);
  });

  expect(result.current[0]).toBe(1);
  expect(renderFn).toHaveBeenCalledTimes(2);

  act(() => {
    setDebouncedState(2);
    jest.advanceTimersByTime(300);
  });
  expect(result.current[0]).toBe(2);
  expect(renderFn).toHaveBeenCalledTimes(3);

  act(() => {
    setDebouncedState(3);
    jest.advanceTimersByTime(300);
  });
  expect(result.current[0]).toBe(3);
  expect(renderFn).toHaveBeenCalledTimes(4);
});

it('should unmount with no issues', () => {
  const renderFn = jest.fn();

  const { result, unmount } = renderHook(() => {
    const [debouncedState, setDebouncedState] = useDebounceState(0);
    renderFn();
    return [debouncedState, setDebouncedState] as const;
  });

  // do not get current[0] because the value can change over time
  const setDebouncedState = result.current[1];
  expect(renderFn).toHaveBeenCalledTimes(1); // State changed once

  setDebouncedState(1);
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});
