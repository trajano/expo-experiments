import { Button, ScrollView, StyleSheet, Text } from 'react-native';
import { NfcEvents, NfcTech, TagEvent } from 'react-native-nfc-manager';
import { FC, useCallback, useEffect, useReducer, useState } from 'react';
import { useNfc, WithNfc } from '@/nfc';

export const NfcScreen: FC = () => {
  const [scanning, setScanning] = useState(false);
  const [tag, setTag] = useState('');
  const [discoverBackgroundEvents, pushDiscoverBackgroundEvent] = useReducer(
    (prev: TagEvent[], tagEvent: TagEvent) => [...prev, tagEvent],
    [],
  );
  const [discoverEvents, pushDiscoverEvent] = useReducer(
    (prev: TagEvent[], tagEvent: TagEvent) => [...prev, tagEvent],
    [],
  );
  const nfc = useNfc();

  const scan = useCallback(() => {
    setScanning(true);
    (async () => {
      try {
        const nextTag = await nfc.getTagAsync('', NfcTech.Ndef);
        setTag(JSON.stringify(nextTag, null, 2));
      } catch (e: unknown) {
        console.debug('no result', e);
      } finally {
        setScanning(false);
      }
    })();
  }, [nfc]);

  useEffect(() => {
    if (nfc.nfcManager) {
      nfc.nfcManager.setEventListener(
        NfcEvents.DiscoverTag,
        (event: TagEvent) => {
          pushDiscoverEvent(event);
        },
      );
      nfc.nfcManager.setEventListener(
        NfcEvents.DiscoverBackgroundTag,
        (event: TagEvent) => {
          pushDiscoverBackgroundEvent(event);
        },
      );
    }
    return () => {
      if (nfc.nfcManager) {
        nfc.nfcManager.setEventListener(NfcEvents.DiscoverBackgroundTag, null);
        nfc.nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      }
    };
  }, [nfc]);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Button onPress={scan} disabled={scanning} title="Scan a tag" />
      <Text>{tag}</Text>
      <Text>{JSON.stringify(discoverEvents)}</Text>
      <Text>{JSON.stringify(discoverBackgroundEvents)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default WithNfc(NfcScreen);
