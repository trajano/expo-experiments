import { useState, useEffect, useRef, useCallback } from 'react';

type DebounceOptions = {
  /**
   * The debounce delay in milliseconds before updating the state.
   * @default 300
   */
  debounceTimeout?: number;

  /**
   * The maximum wait time in milliseconds before the state is forced to update,
   * regardless of further changes.
   * @default 1000
   */
  maxWaitTimeout?: number;
};

/**
 * A React hook that manages a debounced state.
 *
 * This hook delays state updates until the debounce timeout is reached.
 * If additional updates are attempted before the timeout, the timer restarts.
 * The state will be updated at least once within the maximum wait timeout,
 * even if updates continue to occur.
 *
 * @typeParam T - The type of the state value.
 * @param initialValue - The initial state value.
 * @param options - Optional debounce configuration.
 * @returns A tuple containing the current state and a function to set the debounced state.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useDebounceState(0, { debounceTimeout: 200, maxWaitTimeout: 800 });
 *
 * // Trigger state changes with debounce and max wait timeout handling
 * setValue(1);
 * setValue(2);
 * setValue(3);
 * ```
 */
export function useDebounceState<T>(
  initialValue: T,
  { debounceTimeout = 300, maxWaitTimeout = 1000 }: DebounceOptions = {},
): [T, (value: T) => void] {
  const [state, setState] = useState(initialValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxWaitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Function to set the debounced state.
   *
   * Starts or resets the debounce timer. If the maximum wait time is reached before
   * the debounce timeout, the state is updated regardless.
   *
   * @param newValue - The new state value to be set after debounce.
   */
  const setDebouncedState = useCallback(
    (newValue: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (maxWaitTimerRef.current === null) {
        maxWaitTimerRef.current = setTimeout(() => {
          setState(newValue);
          maxWaitTimerRef.current = null;
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }, maxWaitTimeout);
      }

      timerRef.current = setTimeout(() => {
        setState(newValue);
      }, debounceTimeout);
    },
    [debounceTimeout, maxWaitTimeout],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (maxWaitTimerRef.current) {
        clearTimeout(maxWaitTimerRef.current);
      }
    };
  }, []);

  return [state, setDebouncedState];
}
