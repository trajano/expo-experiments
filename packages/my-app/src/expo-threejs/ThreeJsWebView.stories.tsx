import type { Meta, StoryObj } from '@storybook/react';
import { ThreeJsWebView } from './ThreeJsWebView';
import { PreviewViewMode } from '@sb/preview';

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
    headNodeName: 'head',
    bodyNodeName: 'Kira_Shirt_left',
    leftHandNodeName: 'hand_l',
    ballNodeName: 'boule',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const ReadyPlayerMe: Story = {
  args: {
    // modelUri: 'models/gltf/Soldier.glb',

    modelUri: 'https://models.readyplayer.me/65a8dba831b23abb4f401bae.glb',
    headNodeName: 'Head',
    bodyNodeName: 'Wolf3D_Body',
    leftHandNodeName: 'LeftHand',
    ballNodeName: 'RightEye',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const Soldier: Story = {
  args: {
    modelUri: 'models/gltf/Soldier.glb',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};