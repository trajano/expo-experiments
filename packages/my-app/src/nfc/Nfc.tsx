/**
 * A context that provides NFC functionality. This starts up the NfcManager and provides a getTag function
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
  useState,
} from 'react';
import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager';

/**
 * Interface representing an empty context value for the Nfc context.
 * This interface can be expanded to include any values needed by the context.
 */
export interface Nfc {
  nfcManager: typeof NfcManager | null;
  getTagAsync: (
    /**
     * Alert message, set it to an empty string to use the default
     */
    alertMessage: string,
    ...tech: NfcTech[]
  ) => Promise<TagEvent | null>;
}

/**
 * The NfcContext provides an empty context value. This is exported
 * so that it can be used by tests, but generally the {@link NfcProvider}
 * is used.
 */
export const NfcContext = createContext<Nfc>({
  nfcManager: null,
  getTagAsync: () => Promise.reject(new Error('uninitialized context')),
});

/**
 * Props type for the NfcProvider component, which wraps its children in the NfcContext.
 */
export type NfcProps = PropsWithChildren;

/**
 * A provider component for the NfcContext.
 *
 * @param children The child components that will have access to the context.
 * @returns A provider that passes an empty value to all of its children.
 */
export const NfcProvider: FC<NfcProps> = ({ children }) => {
  const [nfcManager, setNfcManager] = useState<typeof NfcManager | null>(null);
  const getTagAsync = useCallback(
    async (alertMessage = '', ...nfcTechs: NfcTech[]) => {
      if (!nfcManager) {
        throw new Error('NFC not available');
      }
      try {
        await nfcManager.requestTechnology(
          nfcTechs,
          alertMessage ? { alertMessage } : {},
        );
        return nfcManager.getTag();
      } finally {
        await nfcManager.cancelTechnologyRequest();
      }
    },
    [nfcManager],
  );
  const value = useMemo<Nfc>(
    () => ({
      nfcManager,
      getTagAsync,
    }),
    [getTagAsync, nfcManager],
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      if (deviceIsSupported) {
        await NfcManager.start();
        if (mounted) {
          setNfcManager(NfcManager);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return <NfcContext.Provider value={value}>{children}</NfcContext.Provider>;
};

/**
 * Hook to consume the NfcContext. This hook allows components to access the empty context value.
 *
 * @returns The current context value, which is an empty object.
 */
export const useNfc = () => useContext(NfcContext);

/**
 * A higher-order component (HOC) that wraps a given component with the NfcProvider,
 * allowing the wrapped component to access the NfcContext.
 *
 * @param Component The component to be wrapped.
 * @returns A new component wrapped with the NfcProvider.
 */
export const WithNfc = <P extends object>(
  Component: ComponentType<P>,
): FC<P & NfcProps> => {
  const WrappedComponent = ({ ...props }: P & NfcProps) => (
    <NfcProvider>
      <Component {...(props as P)} />
    </NfcProvider>
  );

  WrappedComponent.displayName = `WithNfc(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};
