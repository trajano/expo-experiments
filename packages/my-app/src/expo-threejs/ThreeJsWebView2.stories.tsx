import type { Meta, StoryObj } from '@storybook/react';
import { PreviewViewMode } from '@sb/preview';
import { ThreeJsWebView2 } from './ThreeJsWebView2';

const meta: Meta<typeof ThreeJsWebView2> = {
  title: 'ThreeJsWebView2',
  component: ThreeJsWebView2,
  parameters: {
    notes: 'PhaserWebView.',
  },
};

export default meta;

type Story = StoryObj<typeof ThreeJsWebView2>;

export const Soldier: Story = {
  args: {
    modelUri: 'models/gltf/Soldier.glb',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const ReadyPlayerMe: Story = {
  args: {
    // modelUri: 'models/gltf/Soldier.glb',

    modelUri: 'https://models.readyplayer.me/65a8dba831b23abb4f401bae.glb',
    fbxAnimationUri:
      'https://media.githubusercontent.com/media/readyplayerme/animation-library/refs/heads/master/masculine/fbx/dance/F_Dances_001.fbx?download=true',
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
