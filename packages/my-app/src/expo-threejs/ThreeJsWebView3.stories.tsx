import type { Meta, StoryObj } from '@storybook/react';
import { PreviewViewMode } from '@sb/preview';
import { ThreeJsWebView3 } from './ThreeJsWebView3';

const meta: Meta<typeof ThreeJsWebView3> = {
  title: 'ThreeJsWebView3',
  component: ThreeJsWebView3,
  parameters: {
    notes: 'PhaserWebView.',
  },
};

export default meta;

type Story = StoryObj<typeof ThreeJsWebView3>;

export const ThreeJsReadyPlayerMe: Story = {
  args: {
    modelUri: 'models/gltf/readyplayer.me.glb',
    fbxAnimationUri: 'models/fbx/mixamo.fbx',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const ReadyPlayerMe: Story = {
  args: {
    // modelUri: 'models/gltf/Soldier.glb',

    modelUri: 'https://models.readyplayer.me/65a8dba831b23abb4f401bae.glb',
    fbxAnimationUri: 'models/fbx/mixamo.fbx',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Xbot: Story = {
  args: {
    modelUri: 'models/gltf/Xbot.glb',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
