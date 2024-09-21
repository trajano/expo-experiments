import type { Meta, StoryObj } from '@storybook/react';
import { HelloWave } from './HelloWave';

const meta: Meta<typeof HelloWave> = {
  title: 'HelloWave',
  component: HelloWave,
};

export default meta;

type Story = StoryObj<typeof HelloWave>;

export const Default: Story = {
  args: {},
};
