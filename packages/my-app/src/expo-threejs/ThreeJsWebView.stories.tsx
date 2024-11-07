import type { Meta, StoryObj } from '@storybook/react';
import { ThreeJsWebView } from './ThreeJsWebView';

const meta: Meta<typeof ThreeJsWebView> = {
  title: 'ThreeJsWebView',
  component: ThreeJsWebView,
  parameters: {
    notes: 'PhaserWebView.',
  },
};

export default meta;

type Story = StoryObj<typeof ThreeJsWebView>;

export const Kira: Story = {
  args: {
    modelUri: 'models/gltf/kira.glb',
  },
  parameters: {},
};
