import { PreviewViewMode } from '@sb/preview';
import type { Meta, StoryObj } from '@storybook/react';
import * as Localization from 'expo-localization';
import { FC, useCallback, useMemo } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { useClockState } from 'react-native-my-hooks';
import { MyText } from 'react-native-my-text';
import QrCode, { QRCodeProps } from 'react-native-qrcode-svg';

const TimeBasedQrCode: FC<
  Omit<QRCodeProps, 'value'> & { frequency: number; offset: number }
> = ({ frequency, offset, ...props }) => {
  const [currentLocale] = Localization.useLocales();
  const [currentCalendar] = Localization.useCalendars();

  const now = useClockState(frequency);
  const nowWithOffset = useMemo(
    () => new Date(now.getTime() + offset),
    [now, offset],
  );
  const nowString = useMemo(
    () =>
      new Intl.DateTimeFormat(currentLocale.languageTag, {
        dateStyle: 'full',
        timeStyle: 'long',
      }).format(nowWithOffset),
    [nowWithOffset, currentLocale],
  );
  const epochConverterUrl = useMemo(
    () =>
      `https://httpbun.com/get?tz=${currentCalendar.timeZone}&timestamp=${nowWithOffset.getTime() / 1000}&now=${encodeURIComponent(nowString)}`,
    [nowWithOffset, currentCalendar, nowString],
  );
  const onPressQrCode = useCallback(() => {
    (async () => Linking.openURL(epochConverterUrl))();
  }, [epochConverterUrl]);
  return (
    <View>
      <TouchableOpacity onPress={onPressQrCode}>
        <QrCode {...props} value={epochConverterUrl} />
      </TouchableOpacity>
      <MyText>{nowString}</MyText>
    </View>
  );
};

const meta: Meta<typeof TimeBasedQrCode> = {
  title: 'Epoch Converter QR Code',
  component: TimeBasedQrCode,
  parameters: {
    notes: 'QR code generation that changes per second',
  },
};

export default meta;

type Story = StoryObj<typeof TimeBasedQrCode>;

export const Default: Story = {
  args: {
    frequency: 10_000,
    offset: 0,
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.CENTERED,
  },
};

export const WithLogo: Story = {
  args: {
    frequency: 10_000,
    offset: 0,
    logo: require('@/assets/images/favicon.png'),
    logoSize: 60,
    logoBackgroundColor: 'transparent',
    size: 300,
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.CENTERED,
  },
};
export const WithLogoAndPositiveOffset: Story = {
  args: {
    frequency: 10_000,
    offset: 3_600_000,
    logo: require('@/assets/images/favicon.png'),
    logoSize: 60,
    logoBackgroundColor: 'transparent',
    size: 300,
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.CENTERED,
  },
};

export const WithLogoBackgroundColor: Story = {
  args: {
    frequency: 10_000,
    offset: 0,
    logo: require('@/assets/images/favicon.png'),
    logoSize: 30,
    logoBackgroundColor: 'yellow',
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.CENTERED,
  },
};
