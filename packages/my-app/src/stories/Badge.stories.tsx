import type { Meta, StoryObj } from '@storybook/react';
import * as Notifications from 'expo-notifications';
import { FC, useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { MyText, MyTextInput, Strong } from 'react-native-my-text';

const NotificationBadgesView: FC = () => {
  const [currentBadgeCount, setCurrentBadgeCount] = useState(0);
  const [nextBadgeCountData, setNextBadgeCountData] = useState(0);
  const [badgeCountUpdated, setBadgeCountUpdated] = useState(false);
  const onRefreshBadgeCount = useCallback(() => {
    (async () => {
      const nextBadgeCount = await Notifications.getBadgeCountAsync();
      setCurrentBadgeCount(nextBadgeCount);
    })();
  }, []);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const nextBadgeCount = await Notifications.getBadgeCountAsync();
      if (mounted) {
        setCurrentBadgeCount(nextBadgeCount);
        setNextBadgeCountData(nextBadgeCount);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onSetBadgeCount = useCallback(() => {
    (async () => {
      const nextUpdated =
        await Notifications.setBadgeCountAsync(nextBadgeCountData);
      setBadgeCountUpdated(nextUpdated);
    })();
  }, [nextBadgeCountData]);

  return (
    <View style={styles.container}>
      <MyText>
        <Strong>Current badge count:</Strong> {currentBadgeCount}
      </MyText>
      <MyText>
        <Strong>Badge count updated:</Strong> {badgeCountUpdated ? 'yes' : 'no'}
      </MyText>
      <MyText>
        <Strong>Next badge count:</Strong>
      </MyText>
      <MyTextInput
        style={{ fontSize: 48 }}
        keyboardType="numeric"
        onChangeText={(nextText) => {
          try {
            const nextBadgeCount = parseInt(nextText);
            if (isNaN(nextBadgeCount) || nextBadgeCount < 0) {
              setNextBadgeCountData(0);
            } else {
              setNextBadgeCountData(nextBadgeCount);
            }
          } catch (e: unknown) {
            setNextBadgeCountData(0);
          }
        }}
        defaultValue={nextBadgeCountData.toString(10)}
      />
      <Button title="set badge count" onPress={onSetBadgeCount} />
      <Button title="refresh badge count" onPress={onRefreshBadgeCount} />
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

const meta: Meta<typeof NotificationBadgesView> = {
  title: 'Badges',
  component: NotificationBadgesView,
  parameters: {
    notes: 'This set badges.',
  },
};

export default meta;

type Story = StoryObj<typeof NotificationBadgesView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
