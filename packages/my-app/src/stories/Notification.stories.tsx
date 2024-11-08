import type { Meta, StoryObj } from '@storybook/react';
import * as Notifications from 'expo-notifications';
import { FC, useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';

const ExpoUpdatesView: FC<Notifications.NotificationContentInput> = ({
  ...notificationPayload
}) => {
  const onSendNotification = useCallback(() => {
    (async () => {
      const request: Notifications.NotificationRequestInput = {
        content: notificationPayload,
        trigger: {
          date: Date.now() + 2_000,
        },
      };
      await Notifications.scheduleNotificationAsync(request);
    })();
  }, [notificationPayload]);
  return (
    <View style={styles.container}>
      <Button title="send notification" onPress={onSendNotification} />
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

const meta: Meta<typeof ExpoUpdatesView> = {
  title: 'Notifications',
  component: ExpoUpdatesView,
  parameters: {
    notes: 'This checks expo-updates information.',
  },
};

export default meta;

type Story = StoryObj<typeof ExpoUpdatesView>;

const sample: Notifications.NotificationContentInput = {
  body: 'Foo body',
  title: 'delivery has arrived',
  subtitle: 'foo sub',
  data: {},
  badge: 44,
  interruptionLevel: 'critical',
  sound: 'default',
};

export const Default: Story = {
  args: sample,
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
