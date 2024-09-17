import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { whyEffect } from './whyEffect';

/**
 * Custom hook that triggers an effect function and provides a callback
 * with the indices of changed dependencies.
 *
 * @param effect - The effect function to be executed when dependencies change.
 * @param onChange - Callback that receives the indices of the dependencies that have changed.
 * @param dependencies - Dependency array for the effect function.
 */
export const useWhyEffect = (
  effect: EffectCallback,
  onChange: (changedIndices: number[]) => void,
  dependencies: DependencyList,
) => {
  const previousDepsRef = useRef<DependencyList>();

  useEffect(
    () => {
      // Use the pure `whyEffect` function to determine changed dependencies
      const changedDependencies = whyEffect(
        dependencies,
        previousDepsRef.current,
      );

      if (changedDependencies.length > 0) {
        onChange(changedDependencies);
      }

      // Store the current dependencies for the next render
      previousDepsRef.current = dependencies;

      return effect(); // Execute the provided effect function
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  ); // Dependency array for the effect
};
