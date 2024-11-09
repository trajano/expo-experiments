import type { Meta, StoryObj } from '@storybook/react';
import { Asset, useAssets } from 'expo-asset';
import * as Notifications from 'expo-notifications';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import notifee from '@notifee/react-native';
import { IOSNotificationAttachment } from '@notifee/react-native/src/types/NotificationIOS';
import * as FileSystem from 'expo-file-system';
import * as RNFS from 'react-native-fs';
import _ from 'lodash';

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
  const [localAssets] = useAssets(localAttachments ?? []);
  const [assets, setAssets] = useState<Asset[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!localAssets) {
        return;
      }
      const nextAssets = _.cloneDeep(localAssets.filter((it) => it.downloaded));
      for (const asset of nextAssets) {
        const tempLocalUri = `${RNFS.TemporaryDirectoryPath + asset.hash}.${asset.type}`;
        await FileSystem.copyAsync({
          from: asset.localUri!,
          to: tempLocalUri,
        });
        asset.localUri = tempLocalUri;
      }
      if (mounted) {
        setAssets(nextAssets);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [localAssets]);

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
        typeHint: `public.${it.type}`,
        url: it.localUri,
        hideThumbnail: false,
      }));
  }, [assets]);
  const notifeeAttachments = useMemo<IOSNotificationAttachment[]>(() => {
    if (!assets) {
      return [];
    }
    return assets
      .filter((it) => it)
      .map((it) => ({
        id: it.hash!,
        thumbnailTime: 0,
        thumbnailHidden: false,
        typeHint: `public.${it.type}`,
        url: it.localUri!,
      }));
  }, [assets]);
  const content = useMemo<Notifications.NotificationContentInput>(
    () => ({
      ...notificationPayload,
      attachments: attachments,
    }),
    [notificationPayload, attachments],
  );

  const onSendNotification = useCallback(() => {
    (async () => {
      const request: Notifications.NotificationRequestInput = {
        content: content,
        trigger: {
          date: Date.now() + 2_000,
        },
      };
      try {
        await Notifications.scheduleNotificationAsync(request);
      } catch (error) {
        console.error(error);
        console.log(content);
      }
    })();
  }, [content]);

  const onSendNotificationNotifee = useCallback(() => {
    (async () => {
      await notifee.displayNotification({
        title: content.title!,
        body: content.body!,
        ios: {
          attachments: [
            ...notifeeAttachments,
            // { url: require('@/assets/images/react-logo.png') },
          ],
          badgeCount: content.badge,
          communicationInfo: {
            conversationId: 'convo',
            body: 'convo body',
            sender: {
              id: 'gg',
              displayName: 'nyah',
            },
          },
          // attachments: [{ url: require('@/assets/images/react-logo.png') }],
        },
      });
    })();
  }, [content, notifeeAttachments]);
  return (
    <View style={styles.container}>
      <Button title="send notification" onPress={onSendNotification} />
      <Button title="send via notifee" onPress={onSendNotificationNotifee} />
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
