import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { Meta, StoryObj } from '@storybook/react';

import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { PreviewViewMode } from '@sb/preview';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { MyText } from 'react-native-my-text';
import { useUserPreferences } from './UserPreferences';
import { MyAppUserPreferences } from './app/_layout';
const fetchAsyncStorageAsync = async (): Promise<string> => {
  const keys = await AsyncStorage.getAllKeys();
  const kvp = await AsyncStorage.multiGet(keys);
  return JSON.stringify(kvp);
};
const StorageRowView: FC<{ item: KeyValuePair }> = ({ item }) => {
  const valueText = useMemo(() => {
    if (item[1] === null) {
      return '<no data>';
    } else {
      try {
        return JSON.stringify(JSON.parse(item[1]), null, 2);
      } catch (e: unknown) {
        return item[1];
      }
    }
  }, [item]);
  return (
    <>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>{item[0]}</MyText>
      </View>
      <MyText style={styles.text}>{valueText}</MyText>
    </>
  );
};
const AsyncStorageView: FC = () => {
  const [storedJSON, setStoredJSON] = useState('[]');
  const refreshState = useCallback(async () => {
    const nextStoredJSON = await fetchAsyncStorageAsync();
    setStoredJSON(nextStoredJSON);
  }, []);
  const { preferences, setAsync } = useUserPreferences<MyAppUserPreferences>();
  const incrementCount = useCallback(async () => {
    await setAsync('count', preferences.count + 1);
  }, [preferences, setAsync]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const nextStoredJSON = await fetchAsyncStorageAsync();
      if (mounted) {
        setStoredJSON(nextStoredJSON);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const kvps = useMemo<KeyValuePair[]>(
    () => JSON.parse(storedJSON),
    [storedJSON],
  );
  const renderItem = useCallback<ListRenderItem<KeyValuePair>>(
    ({ item }) => <StorageRowView item={item} />,
    [],
  );

  const ListFooterComponent = useCallback(() => {
    return (
      <View>
        <Button onPress={refreshState} title="Refresh" />
        <Button onPress={incrementCount} title="IncrementCount" />
      </View>
    );
  }, [refreshState, incrementCount]);

  return (
    <FlashList
      contentContainerStyle={styles.container}
      data={kvps}
      estimatedItemSize={100}
      ListFooterComponent={ListFooterComponent}
      renderItem={renderItem}
    />
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

const meta: Meta<typeof AsyncStorageView> = {
  title: 'AsyncStorage',
  component: AsyncStorageView,
  parameters: {
    notes: 'This checks AsyncStorage information.',
  },
};

export default meta;

type Story = StoryObj<typeof AsyncStorageView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
