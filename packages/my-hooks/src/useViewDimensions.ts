import { Dispatch, useMemo, useState } from 'react';
import { Dimensions, LayoutRectangle } from 'react-native';

/**
 * Props for configuring the initial state of the view dimensions.
 */
export type ViewDimensionsProps = {
  /** Initial height of the view; defaults to 1 if not provided. */
  initialHeight?: number;
};

/**
 * Interface representing the state and actions for managing view dimensions.
 */
interface ViewDimensions {
  /** Function to update the height of the view. */
  setHeight: Dispatch<number>;
  /** Function to update the width of the view. */
  setWidth: Dispatch<number>;
  /** Calculated dimensions of the view based on current width and height. */
  dimensions: LayoutRectangle;
}

/**
 * Custom hook to calculate and manage the dimensions of a view.
 * It ensures that the view dimensions adapt to changes in width and height,
 * and fall back to the provided `initialHeight` if the height or width is not yet set.
 *
 * @param initialHeight - The default height to use if no height is set. Defaults to 1.
 * @returns {ViewDimensions} - An object containing:
 *  - `setHeight`: Function to set the height of the view.
 *  - `setWidth`: Function to set the width of the view.
 *  - `dimensions`: The calculated dimensions of the view.
 */
export const useViewDimensions = (
  initialHeight: number = 1,
): ViewDimensions => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const dimensions = useMemo<LayoutRectangle>(() => {
    const windowWidth = Dimensions.get('window').width;
    if (height === 0 || width === 0) {
      return {
        x: 0,
        y: 0,
        width: windowWidth,
        height: initialHeight,
      };
    } else {
      return {
        x: 0,
        y: 0,
        width: windowWidth,
        height: (windowWidth / width) * height,
      };
    }
  }, [initialHeight, width, height]);

  return {
    setHeight,
    setWidth,
    dimensions,
  };
};
