import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Storable = string | boolean | number;
export interface UserPreferences<
  Q extends Record<string, Storable> = Record<string, Storable>,
> {
  preferences: Q;
  setAsync(key: string, value: Storable | null): Promise<void>;
}

/**
 * The UserPreferencesContext provides an empty context value. It can be used as a placeholder
 * or template when creating new React contexts.
 */
const UserPreferencesContext = createContext<UserPreferences>({
  preferences: {},
  setAsync: () => Promise.resolve(),
});

/**
 * Props type for the UserPreferencesProvider component, which wraps its children in the UserPreferencesContext.
 */
export type UserPreferencesProps<
  Q extends Record<string, Storable> = Record<string, Storable>,
> = PropsWithChildren<{
  userPreferencesStorageKey: string;
  userPreferencesInitial: Q;
}>;

/**
 * A provider component for the UserPreferencesContext.
 *
 * @param children The child components that will have access to the context.
 * @returns A provider that passes an empty value to all of its children.
 */
export const UserPreferencesProvider: FC<UserPreferencesProps> = ({
  userPreferencesStorageKey,
  userPreferencesInitial = {},
  children,
}) => {
  const [preferencesJSON, setPreferencesJSON] = useState(
    JSON.stringify(userPreferencesInitial),
  );

  const setAsync = useCallback(
    async (key: string, value: Storable | null) => {
      let nextPreferences = JSON.parse(preferencesJSON);
      if (value === null) {
        delete nextPreferences[key];
      } else {
        nextPreferences[key] = value;
      }
      const nextPreferencesJSON = JSON.stringify(nextPreferences);
      await AsyncStorage.setItem(
        userPreferencesStorageKey,
        nextPreferencesJSON,
      );
      setPreferencesJSON(nextPreferencesJSON);
    },
    [userPreferencesStorageKey, preferencesJSON],
  );
  useEffect(() => {
    let mounted = true;
    (async () => {
      let nextPreferencesJSON = await AsyncStorage.getItem(
        userPreferencesStorageKey,
      );
      if (nextPreferencesJSON === null) {
        await AsyncStorage.setItem(userPreferencesStorageKey, preferencesJSON);
      }
      if (mounted && nextPreferencesJSON !== null) {
        setPreferencesJSON(nextPreferencesJSON);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [userPreferencesStorageKey, preferencesJSON]);

  const value = useMemo<UserPreferences>(
    () => ({
      preferences: JSON.parse(preferencesJSON),
      setAsync,
    }),
    [preferencesJSON, setAsync],
  );

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

/**
 * Hook to consume the UserPreferencesContext. This hook allows components to access the empty context value.
 *
 * @returns The current context value, which is an empty object.
 */
export const useUserPreferences = <Q extends Record<string, Storable>>() =>
  useContext(UserPreferencesContext) as UserPreferences<Q>;

/**
 * A higher-order component (HOC) that wraps a given component with the UserPreferencesProvider,
 * allowing the wrapped component to access the UserPreferencesContext.
 *
 * @param Component The component to be wrapped.
 * @returns A new component wrapped with the UserPreferencesProvider.
 */
export const WithUserPreferences = <
  P extends object,
  Q extends Record<string, Storable>,
>(
  Component: ComponentType<P>,
): FC<P & UserPreferencesProps<Q>> => {
  const WrappedComponent = ({
    userPreferencesStorageKey,
    userPreferencesInitial,
    ...props
  }: P & UserPreferencesProps<Q>) => (
    <UserPreferencesProvider
      userPreferencesStorageKey={userPreferencesStorageKey}
      userPreferencesInitial={userPreferencesInitial}
    >
      <Component {...(props as P)} />
    </UserPreferencesProvider>
  );

  WrappedComponent.displayName = `WithUserPreferences(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};
