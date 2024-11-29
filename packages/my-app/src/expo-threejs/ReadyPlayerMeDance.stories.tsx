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
    fbxAnimationUri: 'https://threejs.org/examples/models/fbx/mixamo.fbx',
    testID: 'webview',
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const SelectableSamples: Story = {
  name: 'Selectable samples',
  args: {
    avatarId: '673053f10e05f44f8d84fe69',
    animationResource: require('@/assets/animations/Talking-On-Phone.fbx'),
  },
  argTypes: {
    avatarId: {
      options: [
        '673053f10e05f44f8d84fe69',
        '64c02a3ac2b4fb476a30913e',
        '64e3055495439dfcf3f0b665',
        '65a8dba831b23abb4f401bae',
      ],
      control: {
        type: 'select',
      },
    },
    animationResource: {
      options: [
        require('@/assets/animations/Breakdance-Footwork-1.fbx'),
        require('@/assets/animations/Hip-Hop-Dancing.fbx'),
        require('@/assets/animations/Rumba-Dancing.fbx'),
        require('@/assets/animations/Talking-On-Phone.fbx'),
      ],
      control: {
        type: 'select',
        labels: {
          [require('@/assets/animations/Breakdance-Footwork-1.fbx')]:
            'Breakdancing',
          [require('@/assets/animations/Hip-Hop-Dancing.fbx')]: 'Hip hop',
          [require('@/assets/animations/Rumba-Dancing.fbx')]: 'Rumba',
          [require('@/assets/animations/Talking-On-Phone.fbx')]: 'OTP',
        },
      },
    },
  },
  parameters: {
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
