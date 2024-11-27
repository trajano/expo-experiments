import { Dispatch, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';

export type ViewDimensionsProps = {
  /** initial height defaults to 1 */
  initialHeight?: number;
};
export type ViewDimensionsRect = {
  width: number;
  height: number;
};

interface ViewDimensions {
  setHeight: Dispatch<number>;
  setWidth: Dispatch<number>;
  dimensions: ViewDimensionsRect;
}

export const useViewDimensions = (
  initialHeight: number = 1,
): ViewDimensions => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const dimensions = useMemo<ViewDimensionsRect>(() => {
    const windowWidth = Dimensions.get('window').width;
    if (height === 0 || width === 0) {
      return {
        width: windowWidth,
        height: initialHeight,
      };
    } else {
      return {
        width: windowWidth,
        height: (windowWidth / width) * height,
      };
    }
  }, [width, height]);
  return {
    setHeight,
    setWidth,
    dimensions,
  };
};
