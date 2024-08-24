import { useEffect, useReducer, useRef } from 'react';

/**
 * Updates a state that provides the current instant at a defined frequency. By
 * default will initially set a timeout to update to the next frequency block
 * then run intervals at the frequencyMs specified after. This can be overriden
 * so that a different delay till the interval starts.
 *
 * @param frequencyMs - Frequency to run the updates defaults to 1000ms.
 * @param delayTillIntervalStart - Number of milliseconds to wait before the next
 *   frequency block, defaults to the next block based on the frequency. Note on
 *   Android this should not go past 60 seconds.
 * @returns Current instant
 */
export function useClockState(
  frequencyMs = 1000,
  delayTillIntervalStart?: number,
): Date {
  const [now, updateNow] = useReducer<(r: number) => number>(
    () => Date.now(),
    Date.now(),
  );
  const initialTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    initialTimeoutRef.current = setTimeout(
      () => {
        updateNow();
        intervalRef.current = setInterval(updateNow, frequencyMs);
      },
      delayTillIntervalStart ?? frequencyMs - (Date.now() % frequencyMs),
    );
    return () => {
      if (initialTimeoutRef.current) {
        clearTimeout(initialTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [delayTillIntervalStart, frequencyMs]);
  return new Date(now);
}
