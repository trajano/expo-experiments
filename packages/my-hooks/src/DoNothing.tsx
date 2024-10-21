/**
 * A context that provides no specific functionality. This serves as a template for developers
 * to create React Context-based implementations and includes a higher-order component (HOC) version.
 */
import {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

/**
 * Interface representing an empty context value for the DoNothing context.
 * This interface can be expanded to include any values needed by the context.
 */
export interface DoNothing {}

/**
 * The DoNothingContext provides an empty context value. It can be used as a placeholder
 * or template when creating new React contexts.
 */
const DoNothingContext = createContext<DoNothing>({});

/**
 * Props type for the DoNothingProvider component, which wraps its children in the DoNothingContext.
 */
export type DoNothingProps = PropsWithChildren<{}>;

/**
 * A provider component for the DoNothingContext.
 *
 * @param children The child components that will have access to the context.
 * @returns A provider that passes an empty value to all of its children.
 */
export const DoNothingProvider: FC<DoNothingProps> = ({ children }) => {
  const value = useMemo<DoNothing>(() => ({}), []);

  return (
    <DoNothingContext.Provider value={value}>
      {children}
    </DoNothingContext.Provider>
  );
};

/**
 * Hook to consume the DoNothingContext. This hook allows components to access the empty context value.
 *
 * @returns The current context value, which is an empty object.
 */
export const useDoNothing = () => useContext(DoNothingContext);

/**
 * A higher-order component (HOC) that wraps a given component with the DoNothingProvider,
 * allowing the wrapped component to access the DoNothingContext.
 *
 * @param Component The component to be wrapped.
 * @returns A new component wrapped with the DoNothingProvider.
 */
export const WithDoNothing = <P extends object>(
  Component: ComponentType<P>,
): FC<P & DoNothingProps> => {
  const WrappedComponent = ({ ...props }: P & DoNothingProps) => (
    <DoNothingProvider>
      <Component {...(props as P)} />
    </DoNothingProvider>
  );

  WrappedComponent.displayName = `WithDoNothing(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};
