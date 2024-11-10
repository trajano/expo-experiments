import { PreviewViewMode } from '@sb/preview';
import type { Meta, StoryObj } from '@storybook/react';
import QrCode from 'react-native-qrcode-svg';

const meta: Meta<typeof QrCode> = {
  title: 'QR Code',
  component: QrCode,
  parameters: {
    notes: 'QR code generation.',
  },
};

export default meta;

type Story = StoryObj<typeof QrCode>;

export const Default: Story = {
  args: {
    value: 'https://trajano.net',
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
    value: 'https://trajano.net',
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
    value: 'https://trajano.net',
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
