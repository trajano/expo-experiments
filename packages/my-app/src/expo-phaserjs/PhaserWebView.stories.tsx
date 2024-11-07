import type { Meta, StoryObj } from '@storybook/react';
import { PhaserWebView } from './PhaserWebView';

const meta: Meta<typeof PhaserWebView> = {
  title: 'PhaserWebView',
  component: PhaserWebView,
  parameters: {
    notes: 'PhaserWebView.',
  },
};

export default meta;

type Story = StoryObj<typeof PhaserWebView>;

export const Default: Story = {
  args: {},
  parameters: {},
};
