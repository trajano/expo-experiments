import type { Meta, StoryObj } from '@storybook/react';

import { FC, useCallback, useMemo } from 'react';
import { Button, StyleSheet } from 'react-native';
import { MyText } from 'react-native-my-text';
import { useUserPreferences } from '../UserPreferences';
import { MyAppUserPreferences } from '../app/_layout';
const UserPreferencesView: FC = () => {
  const { preferences, setAsync } = useUserPreferences<MyAppUserPreferences>();
  const incrementCount = useCallback(async () => {
    await setAsync('count', preferences.count + 1);
  }, [preferences, setAsync]);

  const storedJSON = useMemo(
    () => JSON.stringify(preferences, null, 2),
    [preferences],
  );

  return (
    <>
      <MyText style={styles.text}>{storedJSON}</MyText>
      <Button onPress={incrementCount} title="IncrementCount" />
    </>
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

const meta: Meta<typeof UserPreferencesView> = {
  title: 'User Preferences',
  component: UserPreferencesView,
  parameters: {
    notes: 'This checks UserPreferences information.',
  },
};

export default meta;

type Story = StoryObj<typeof UserPreferencesView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
