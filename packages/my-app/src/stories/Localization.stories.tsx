import type { Meta, StoryObj } from '@storybook/react';
import * as Localization from 'expo-localization';
import { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import JSONTree, { JSONTreeProps } from 'react-native-json-tree';
import { MyText, Strong } from 'react-native-my-text';

const labelRenderer: JSONTreeProps['labelRenderer'] = (keypath) => (
  <MyText style={{ fontSize: 20 }}>{keypath[0]}</MyText>
);
const valueRenderer: JSONTreeProps['valueRenderer'] = (raw) => (
  <MyText style={{ fontSize: 16 }}>
    {typeof raw === 'string' ? raw : JSON.stringify(raw)}
  </MyText>
);
const ExpoLocalizationView: FC = () => {
  const locales = Localization.useLocales();
  const calendars = Localization.useCalendars();
  const localesFromGet = useMemo(() => Localization.getLocales(), []);
  const calendarsFromGet = useMemo(() => Localization.getCalendars(), []);
  return (
    <View style={styles.container}>
      <MyText>
        <Strong>Timezone:</Strong>
        {calendars[0].timeZone}
      </MyText>
      <MyText>
        <Strong>useCalendars</Strong>
      </MyText>
      <JSONTree
        data={calendars}
        shouldExpandNode={() => true}
        hideRoot={true}
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
      />
      <MyText>
        <Strong>useLocales</Strong>
      </MyText>
      <JSONTree
        data={locales}
        shouldExpandNode={() => true}
        hideRoot={true}
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
      />
      <MyText>
        <Strong>getCalendars</Strong>
      </MyText>
      <JSONTree
        data={calendarsFromGet}
        shouldExpandNode={() => true}
        hideRoot={true}
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
      />
      <MyText>
        <Strong>getLocales</Strong>
      </MyText>
      <JSONTree
        data={localesFromGet}
        shouldExpandNode={() => true}
        hideRoot={true}
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
      />
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

const meta: Meta<typeof ExpoLocalizationView> = {
  title: 'Expo Localization',
  component: ExpoLocalizationView,
  parameters: {
    notes: 'This checks expo-localization information.',
  },
};

export default meta;

type Story = StoryObj<typeof ExpoLocalizationView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
