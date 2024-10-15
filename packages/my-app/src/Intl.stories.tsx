import type { Meta, StoryObj } from '@storybook/react';
import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText } from 'react-native-my-text';
import * as Crypto from 'expo-crypto';
const IntlEvaluationTable: FC = () => {
  const a = ['Z', 'a', 'z', 'ä'].sort(
    new Intl.Collator('de', { caseFirst: 'upper' }).compare,
  );

  const intlMethods = [
    'Collator',
    'DateTimeFormat',
    'DisplayNames',
    'ListFormat',
    'Locale',
    'NumberFormat',
    'PluralRules',
    'RelativeTimeFormat',
    'Segmenter',
    'getCanonicalLocales',
    'supportedValuesOf',
  ];

  const [aNumber, setANumber] = useState(0);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      const uint8Array = await Crypto.getRandomBytesAsync(4);
      uint8Array.forEach((byte, index) => {
        view.setUint8(index, byte);
      });
      if (mounted) {
        setANumber(view.getFloat32(0, true));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      {intlMethods.map((method) => (
        <View key={method} style={styles.row}>
          <MyText style={styles.text}>{`Intl.${method}`}</MyText>
          <MyText style={styles.text}>
            {(Intl as any)[method] ? '✅' : '❎'}
          </MyText>
        </View>
      ))}

      <View testID="outer-box" style={styles.outerBox}>
        <MyText>{JSON.stringify(a, null, 2)}</MyText>
        <MyText>{new Intl.DateTimeFormat('en-US').format(Date.now())}</MyText>
        <MyText>
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(aNumber)}
        </MyText>
        <MyText>{aNumber}</MyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    flex: 1,
    width: '100%', // Fills the width of the parent
    borderWidth: 1,
    borderColor: 'red',
  },
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

const meta: Meta<typeof IntlEvaluationTable> = {
  title: 'Intl',
  component: IntlEvaluationTable,
  parameters: {
    notes:
      'This checks the functionality of the ECMAScript Internationalization API.',
  },
};

export default meta;

type Story = StoryObj<typeof IntlEvaluationTable>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
