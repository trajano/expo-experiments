/**
 * A context that provides no specific functionality. This serves as a template for developers
 * to create React Context-based implementations and includes a higher-order component (HOC) version.
 */
import {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { EventSubscription } from 'react-native';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';

/**
 * Interface representing an empty context value for the ShakeDetection context.
 * This interface can be expanded to include any values needed by the context.
 */
export interface ShakeDetection {
  addListener(callback: () => void): EventSubscription;
}

/**
 * The ShakeDetectionContext provides an empty context value. This is exported
 * so that it can be used by tests, but generally the {@link ShakeDetectionProvider}
 * is used.
 */
export const ShakeDetectionContext = createContext<ShakeDetection>({
  addListener: () =>
    ({
      eventType: 'shake',
      remove: () => {},
    }) as EventSubscription,
});

const hasDirectionChanged = (
  a: NonNullable<DeviceMotionMeasurement['acceleration']>,
  b: NonNullable<DeviceMotionMeasurement['acceleration']>,
  shakeThreshold: number,
): boolean => {
  const { x: lastX, y: lastY, z: lastZ } = a;

  return (
    (Math.sign(b.x) !== Math.sign(lastX) && Math.abs(b.x) > shakeThreshold) ||
    (Math.sign(b.y) !== Math.sign(lastY) && Math.abs(b.y) > shakeThreshold) ||
    (Math.sign(b.z) !== Math.sign(lastZ) && Math.abs(b.z) > shakeThreshold)
  );
};

/**
 * Props type for the ShakeDetectionProvider component, which wraps its children in the ShakeDetectionContext.
 */
export type ShakeDetectionProps = PropsWithChildren<{
  /**
   * Defaults to 4.0
   */
  shakeThreshold?: number;
  /**
   * Number of direction changes before a shake is considered.  Defaults to 3.
   */
  shakeDirectionChangesForDetection?: number;
  /**
   * Number of milliseconds per shake direction before timing out.  The shake will not fire more than once within
   * this timeout.
   */
  shakeDetectionTimeout?: number;
  /**
   * This turns shake detection off.  Primarily passed in with __DEV__ so that Dev Client will allow shake to bring
   * up the dev menu.
   */
  shakeDetectionDisabled?: boolean;
}>;

/**
 * A provider component for the ShakeDetectionContext.
 *
 * @param shakeThreshold acceleration without gravity to trigger the shake
 * @param shakeDetectionDisabled This turns shake detection off.  Primarily passed in with __DEV__ so that Dev Client will allow shake to bring
 * up the dev menu.
 * @param shakeDirectionChangesForDetection Number of direction changes before a shake is considered.  Defaults to 3.
 * @param shakeDetectionTimeout Number of milliseconds per shake direction before timing out.
 * @param children The child components that will have access to the context.
 * @returns A provider that passes an empty value to all of its children.
 */
export const ShakeDetectionProvider: FC<ShakeDetectionProps> = ({
  shakeThreshold = 10.0,
  shakeDetectionDisabled = false,
  shakeDirectionChangesForDetection = 3,
  shakeDetectionTimeout = 1000,
  children,
}) => {
  // on Expo 52 this may use the one from "expo" package
  const emitterRef = useRef(new EventEmitter());
  const addListener = useCallback((listener: () => void) => {
    return emitterRef.current?.addListener('shake', listener);
  }, []);
  const lastMotionRef = useRef<DeviceMotionMeasurement['acceleration']>(null);
  const firedRef = useRef(false);
  const countRef = useRef(0);
  const timeoutRef = useRef<number>(0);
  useEffect(() => {
    if (shakeDetectionDisabled) {
      return () => {};
    }
    const emitter = emitterRef.current;
    const subscription = DeviceMotion.addListener((motionData) => {
      const { acceleration } = motionData;
      if (acceleration) {
        const { x, y, z } = acceleration;
        const magnitude = Math.sqrt(x * x + y * y + z * z);

        // Check if magnitude exceeds the threshold
        if (
          magnitude > shakeThreshold &&
          (!lastMotionRef.current ||
            hasDirectionChanged(
              lastMotionRef.current,
              acceleration,
              shakeThreshold,
            ))
        ) {
          if (!lastMotionRef.current) {
            // @ts-ignore
            timeoutRef.current = setTimeout(() => {
              lastMotionRef.current = null;
              firedRef.current = false;
              countRef.current = 0;
            }, shakeDetectionTimeout);
          }
          lastMotionRef.current = acceleration;
          ++countRef.current;
          if (
            !firedRef.current &&
            countRef.current > shakeDirectionChangesForDetection
          ) {
            emitter.emit('shake');
            firedRef.current = true;
          }
        }
      }
    });

    return () => {
      emitter.removeAllListeners('shake');
      clearTimeout(timeoutRef.current);
      subscription.remove();
    };
  }, [
    shakeThreshold,
    shakeDetectionDisabled,
    shakeDetectionTimeout,
    shakeDirectionChangesForDetection,
  ]);
  const value = useMemo<ShakeDetection>(
    () => ({
      addListener,
    }),
    [addListener],
  );
  return (
    <ShakeDetectionContext.Provider value={value}>
      {children}
    </ShakeDetectionContext.Provider>
  );
};

/**
 * Hook to consume the ShakeDetectionContext. This hook allows components to access the empty context value.
 *
 * @returns The current context value, which is an empty object.
 */
export const useShakeDetection = () => useContext(ShakeDetectionContext);

/**
 * A higher-order component (HOC) that wraps a given component with the ShakeDetectionProvider,
 * allowing the wrapped component to access the ShakeDetectionContext.
 *
 * @param Component The component to be wrapped.
 * @returns A new component wrapped with the ShakeDetectionProvider.
 */
export const WithShakeDetection = <P extends object>(
  Component: ComponentType<P>,
): FC<P & ShakeDetectionProps> => {
  const WrappedComponent = ({
    shakeThreshold,
    shakeDetectionDisabled,
    shakeDirectionChangesForDetection,
    shakeDetectionTimeout,
    ...props
  }: P & ShakeDetectionProps) => (
    <ShakeDetectionProvider
      shakeThreshold={shakeThreshold}
      shakeDetectionDisabled={shakeDetectionDisabled}
      shakeDirectionChangesForDetection={shakeDirectionChangesForDetection}
      shakeDetectionTimeout={shakeDetectionTimeout}
    >
      <Component {...(props as P)} />
    </ShakeDetectionProvider>
  );

  WrappedComponent.displayName = `WithShakeDetection(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};
