import { DependencyList } from 'react';

/**
 * Utility function to detect which dependencies have changed.
 *
 * @param currentDeps - The current dependency array.
 * @param previousDeps - The previous dependency array.
 * @returns An array of indices where the values have changed.
 */
export const whyEffect = (
  currentDeps: DependencyList,
  previousDeps: DependencyList,
): number[] => {
  return currentDeps.reduce<number[]>((acc, dep, index) => {
    if (previousDeps && previousDeps[index] !== dep) {
      acc.push(index);
    }
    return acc;
  }, []);
};
