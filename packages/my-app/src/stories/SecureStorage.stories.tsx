import type { Meta, StoryObj } from '@storybook/react';
import * as SecureStore from 'expo-secure-store';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { MyText, Strong } from 'react-native-my-text';

const SecureStorageView: FC<{
  itemKey: string;
  requireAuthentication: boolean;
  authenticationPrompt: string;
}> = ({ itemKey, requireAuthentication, authenticationPrompt }) => {
  const secureStoreOptions = useMemo<SecureStore.SecureStoreOptions>(
    () => ({
      requireAuthentication,
      authenticationPrompt,
    }),
    [requireAuthentication, authenticationPrompt],
  );
  const [error, setError] = useState<string | null>(null);
  const [storedJSON, setStoredJSON] = useState<string | null>(null);
  const refreshState = useCallback(async () => {
    try {
      const nextStoredJSON = await SecureStore.getItemAsync(
        itemKey,
        secureStoreOptions,
      );
      setStoredJSON(nextStoredJSON);
    } catch (e: unknown) {
      setError(`${e}`);
    }
  }, [itemKey, secureStoreOptions]);

  const clearValue = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync(itemKey, secureStoreOptions);
    } catch (e: unknown) {
      setError(`${e}`);
    }
  }, [itemKey, secureStoreOptions]);

  const clearError = useCallback(async () => {
    setError(null);
  }, []);

  const incrementValue = useCallback(async () => {
    try {
      const nextStoredJSON =
        (await SecureStore.getItemAsync(itemKey, secureStoreOptions)) ??
        JSON.stringify({ foo: 1 });
      const json = JSON.parse(nextStoredJSON);
      json.foo = json.foo + 1;
      await SecureStore.setItemAsync(
        itemKey,
        JSON.stringify(json),
        secureStoreOptions,
      );
    } catch (e: unknown) {
      setError(`${e}`);
    }
  }, [itemKey, secureStoreOptions]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (itemKey) {
        try {
          const nextStoredJSON = await SecureStore.getItemAsync(itemKey, {});
          if (mounted) {
            setStoredJSON(nextStoredJSON);
          }
        } catch (e: unknown) {
          if (mounted) {
            setError(`${e}`);
          }
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [itemKey]);
  const valueText = useMemo(() => {
    if (storedJSON === null) {
      return '<no data>';
    } else {
      try {
        return JSON.stringify(JSON.parse(storedJSON), null, 2);
      } catch (e: unknown) {
        return storedJSON;
      }
    }
  }, [storedJSON]);

  return (
    <View>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>{itemKey ?? 'no key'}</MyText>
      </View>
      <MyText>{valueText}</MyText>
      <MyText>
        <Strong>{error}</Strong>
      </MyText>
      <Button
        onPress={refreshState}
        disabled={!itemKey}
        title="refresh state"
      />
      <Button onPress={clearValue} disabled={!itemKey} title="clear value" />
      <Button
        onPress={incrementValue}
        disabled={!itemKey}
        title="increment value"
      />
      <Button onPress={clearError} disabled={!error} title="clear error" />
    </View>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    borderWidth: 1,
    borderColor: 'red',
  },
  container: {
    padding: 20,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: 'black',
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito',
  },
});

const meta: Meta<typeof SecureStorageView> = {
  title: 'Secure Storage',
  component: SecureStorageView,
  parameters: {
    notes: 'This checks SecureStorage information.',
  },
};

export default meta;

type Story = StoryObj<typeof SecureStorageView>;

export const Default: Story = {
  args: {
    itemKey: 'secure',
    requireAuthentication: false,
    authenticationPrompt: 'authentication prompt',
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
