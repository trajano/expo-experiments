import type { Meta, StoryObj } from '@storybook/react';
import { PdfView } from './PdfView';

const meta: Meta<typeof PdfView> = {
  title: 'Nothing',
  component: PdfView,
  parameters: {
    notes: 'PdfView.',
  },
};

export default meta;

type Story = StoryObj<typeof PdfView>;

export const MyResume: Story = {
  args: {
    uri: "https:///trajano.net/assets/Archimedes%20Trajano.pdf"
  },
  parameters: {},
};
