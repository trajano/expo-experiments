import type { Meta, StoryObj } from '@storybook/react';
import { ThreeJsWebView } from './ThreeJsWebView';

const meta: Meta<typeof ThreeJsWebView> = {
  title: 'ThreeJsWebView',
  component: ThreeJsWebView,
  parameters: {
    notes: 'ThreeJsWebView.',
  },
};

export default meta;

type Story = StoryObj<typeof ThreeJsWebView>;

export const Default: Story = {
  args: {},
  parameters: {},
};
