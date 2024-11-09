import type { Meta, StoryObj } from '@storybook/react';
import { useAssets } from 'expo-asset';
import * as Notifications from 'expo-notifications';
import { FC, useCallback, useMemo } from 'react';
import { Button, StyleSheet, View } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    console.debug(notification.request);
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

const ExpoNotificationsView: FC<
  Notifications.NotificationContentInput & {
    localAttachments: number | number[];
  }
> = ({ localAttachments, ...notificationPayload }) => {
  const [assets] = useAssets(localAttachments ?? []);
  const attachments = useMemo<
    Notifications.NotificationContentAttachmentIos[]
  >(() => {
    if (!assets) {
      return [];
    }
    return assets
      .filter((it) => it)
      .map((it) => ({
        identifier: it.hash,
        type: `public.${it.type}`,
        typeHint: it.type,
        url: it.localUri,
        hideThumbnail: false,
      }));
  }, [assets]);
  const content = useMemo<Notifications.NotificationContentInput>(
    () => ({
      ...notificationPayload,
      attachments: attachments,
    }),
    [notificationPayload, attachments],
  );
  console.log('attachments', content);

  const onSendNotification = useCallback(() => {
    (async () => {
      const request: Notifications.NotificationRequestInput = {
        content: content,
        trigger: {
          date: Date.now() + 2_000,
        },
      };
      await Notifications.scheduleNotificationAsync(request);
    })();
  }, [content]);
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

const meta: Meta<typeof ExpoNotificationsView> = {
  title: 'Notifications',
  component: ExpoNotificationsView,
  parameters: {
    notes: 'This checks expo-updates information.',
  },
};

export default meta;

type Story = StoryObj<typeof ExpoNotificationsView>;

export const Default: Story = {
  args: {
    body: 'Foo body',
    title: 'delivery has arrived',
    subtitle: 'foo sub',
    data: {},
    interruptionLevel: 'critical',
    sound: 'default',
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const Badge: Story = {
  args: {
    body: 'Foo body',
    title: 'delivery has arrived',
    subtitle: 'foo sub',
    data: {},
    badge: 44,
    interruptionLevel: 'critical',
    sound: 'default',
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const WithContentAttachment: Story = {
  args: {
    body: 'Foo body',
    title: 'delivery has arrived',
    subtitle: 'foo sub',
    data: {},
    badge: 44,
    interruptionLevel: 'critical',
    sound: 'default',
    localAttachments: [require('@/assets/images/react-logo.png')],
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
