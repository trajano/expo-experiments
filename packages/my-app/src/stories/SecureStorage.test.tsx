import { composeStories } from '@storybook/react';
import { act, render, screen } from '@testing-library/react-native';
import * as stories from './SecureStorage.stories';

const { Default } = composeStories(stories);
test('only show minimal fonts', async () => {
  render(<Default />);
  await act(() => Promise.resolve());
  expect(screen.toJSON()).toMatchSnapshot();
});
