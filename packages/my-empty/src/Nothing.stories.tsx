import type { Meta, StoryObj } from '@storybook/react';
import { Nothing } from './Nothing';

const meta: Meta<typeof Nothing> = {
  title: 'Nothing',
  component: Nothing,
  parameters: {
    notes: 'Nothing.',
  },
};

export default meta;

type Story = StoryObj<typeof Nothing>;

export const Default: Story = {
  args: {},
  parameters: {},
};
