import { PreviewViewMode } from '@sb/preview';
import type { Meta, StoryObj } from '@storybook/react';
import { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useClockState } from 'react-native-my-hooks';
import { MyText } from 'react-native-my-text';
import QrCode, { QRCodeProps } from 'react-native-qrcode-svg';

const EpochConverterQrCode: FC<
  Omit<QRCodeProps, 'value'> & { frequency: number }
> = ({ frequency, ...props }) => {
  const now = useClockState(frequency);
  const epochConverterUrl = useMemo(
    () => `https://www.epochconverter.com/?timestamp=${now.getTime() / 1000}`,
    [now],
  );
  const nowString = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
      }).format(now),
    [now],
  );
  return (
    <View>
      <QrCode {...props} value={epochConverterUrl} />
      <MyText>{nowString}</MyText>
    </View>
  );
};

const meta: Meta<typeof EpochConverterQrCode> = {
  title: 'Epoch Converter QR Code',
  component: EpochConverterQrCode,
  parameters: {
    notes: 'QR code generation that changes per second',
  },
};

export default meta;

type Story = StoryObj<typeof EpochConverterQrCode>;

export const Default: Story = {
  args: {
    frequency: 10_000,
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
