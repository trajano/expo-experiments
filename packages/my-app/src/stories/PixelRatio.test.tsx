import { composeStories } from '@storybook/react';
import { act, render, screen } from '@testing-library/react-native';
import * as stories from './PixelRatio.stories';

const { Default } = composeStories(stories);
test('simple story test', async () => {
  render(<Default />);
  await act(() => Promise.resolve());
  expect(screen.toJSON()).toMatchSnapshot();
});
