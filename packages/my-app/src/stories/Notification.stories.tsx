import type { Meta, StoryObj } from '@storybook/react';
import { Asset, useAssets } from 'expo-asset';
import * as Notifications from 'expo-notifications';
import { FC, useCallback, useMemo } from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import notifee from '@notifee/react-native';
import { IOSNotificationAttachment } from '@notifee/react-native/src/types/NotificationIOS';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import { Image } from 'expo-image';
import _ from 'lodash';
import { PreviewViewMode } from '@sb/preview';
import { MyText } from 'react-native-my-text';

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    console.debug('received notification', notification.request);
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

/**
 * Clone the attachment URIs to the cache folder.
 *
 * On iOS in the [UINotificationAttachment](https://developer.apple.com/documentation/usernotifications/unnotificationattachment#overview) it
 * specifies the following:
 *
 * > Once validated, the system moves the attached files into the attachment data store so that the appropriate processes can access the files.
 *
 * This will mean that the original attachment URLs won't exist once it is processed.  So a copy of the file should be made by the app prior to sending the notification.
 *
 * The `url` of the attachment is expected to be a full path at this time (no `file://` prefix) or a remote URI (starting with http or https).
 */
const cloneAttachmentsForNotifee = async (
  attachments: IOSNotificationAttachment[],
): Promise<IOSNotificationAttachment[]> => {
  const uuid = Crypto.randomUUID();
  const clonedAttachments = _.cloneDeep(attachments);
  for (const attachment of attachments) {
    if (!attachment.url.startsWith('/')) {
      continue;
    }
    const tempLocalUri = `${FileSystem.cacheDirectory}${attachment.id ?? ''}_${uuid}`;

    await FileSystem.copyAsync({
      from: `file://${attachment.url}`,
      to: tempLocalUri,
    });

    attachment.url = tempLocalUri.substring('file://'.length);
  }
  return clonedAttachments;
};

const ExpoNotificationsView: FC<
  Notifications.NotificationContentInput & {
    localAttachments: number | number[];
  }
> = ({ localAttachments, ...notificationPayload }) => {
  const [loadedAssets] = useAssets(localAttachments ?? []);
  const assets = useMemo<Asset[]>(() => loadedAssets ?? [], [loadedAssets]);

  const attachments = useMemo<
    Notifications.NotificationContentAttachmentIos[]
  >(() => {
    return assets
      .filter((it) => it)
      .map((it) => ({
        identifier: it.hash,
        type: it.type,
        typeHint: `public.${it.type}`,
        url: it.localUri!.substring('file://'.length),
        hideThumbnail: false,
      }));
  }, [assets]);

  const notifeeAttachments = useMemo<IOSNotificationAttachment[]>(() => {
    return assets
      .filter((it) => it)
      .map((it) => ({
        id: it.hash!,
        thumbnailHidden: false,
        typeHint: `public.${it.type}`,
        url: it.localUri!.substring('file://'.length),
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
      }
    })();
  }, [content]);

  const onSendNotificationNotifee = useCallback(() => {
    (async () => {
      await notifee.displayNotification({
        title: content.title!,
        body: content.body!,
        ios: {
          attachments: await cloneAttachmentsForNotifee(notifeeAttachments),
          badgeCount: content.badge,
        },
      });
    })();
  }, [content, notifeeAttachments]);
  const ListHeaderComponent = useCallback(() => {
    return (
      <>
        <Button
          title="send notification"
          testID="send-notification-button"
          onPress={onSendNotification}
        />
        <Button
          title="send via notifee"
          testID="send-notifee-button"
          onPress={onSendNotificationNotifee}
        />
        <MyText>Assets {assets.length}</MyText>
      </>
    );
  }, [onSendNotification, onSendNotificationNotifee, assets]);
  const renderAsset: ListRenderItem<Asset> = useCallback(({ item }) => {
    return (
      <View>
        <Image
          source={item.localUri}
          style={{ height: 100 }}
          contentFit="contain"
        />
        <MyText>{item.localUri}</MyText>
      </View>
    );
  }, []);
  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={ListHeaderComponent}
      data={assets}
      renderItem={renderAsset}
      keyExtractor={(it) => it.hash!}
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
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
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
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
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
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
