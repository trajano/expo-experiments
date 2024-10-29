import { useMyBackgroundFetch } from '@/hooks/MyBackgroundFetch';
import { useUserPreferences } from '@/hooks/UserPreferences';
import type { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNotifications } from 'react-native-my-hooks';
import { MyText } from 'react-native-my-text';
const ContextsView: FC = () => {
  const myBackgroundFetch = useMyBackgroundFetch();
  const notifications = useNotifications();
  const userPreferences = useUserPreferences();
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>useMyBackgroundFetch</MyText>
      </View>
      <MyText style={styles.text}>
        {JSON.stringify(myBackgroundFetch, null, 2)}
      </MyText>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>useNotifications</MyText>
      </View>
      <MyText style={styles.text}>
        {JSON.stringify(notifications, null, 2)}
      </MyText>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>useUserPreferences</MyText>
      </View>
      <MyText style={styles.text}>
        {JSON.stringify(userPreferences, null, 2)}
      </MyText>
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
const meta: Meta<typeof ContextsView> = {
  title: 'Contexts',
  component: ContextsView,
  parameters: {
    notes: 'This checks the value of custom contexts that have been used.',
  },
};

export default meta;

type Story = StoryObj<typeof ContextsView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
