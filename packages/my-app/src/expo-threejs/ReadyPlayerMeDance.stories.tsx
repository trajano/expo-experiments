import type { Meta, StoryObj } from '@storybook/react';
import { PreviewViewMode } from '@sb/preview';
import { ReadyPlayerMeDance } from './ReadyPlayerMeDance';

const meta: Meta<typeof ReadyPlayerMeDance> = {
  title: 'Ready.Player.Me Dance',
  component: ReadyPlayerMeDance,
  parameters: {
    notes: 'three.js demo showing Ready.Player.Me avatars dancing.',
  },
};

export default meta;

type Story = StoryObj<typeof ReadyPlayerMeDance>;

export const ThreeJsReadyPlayerMeSample: Story = {
  args: {
    modelUri: 'https://threejs.org/examples/models/gltf/readyplayer.me.glb',
    fbxAnimationUri: 'models/fbx/mixamo.fbx',
    useLocalUri: false,
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const ReadyPlayerMe: Story = {
  args: {
    avatarId: '65a8dba831b23abb4f401bae',
    fbxAnimationUri: 'models/fbx/mixamo.fbx',
    useLocalUri: false,
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const ReadyPlayerMe2: Story = {
  args: {
    avatarId: '64e3055495439dfcf3f0b665',
    fbxAnimationUri: 'models/fbx/mixamo.fbx',
    useLocalUri: false,
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const ReadyPlayerMe3: Story = {
  args: {
    avatarId: '64c02a3ac2b4fb476a30913e',
    fbxAnimationUri: 'models/fbx/mixamo.fbx',
    useLocalUri: false,
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
