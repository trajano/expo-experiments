import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react-native';
import * as stories from './Fonts.stories';

jest.mock('expo-constants', () => ({
  ...jest.requireActual('expo-constants'),
  systemFonts: ['Arial', 'another font'],
}));
const { AlexJones } = composeStories(stories);
test('only show minimal fonts', async () => {
  const { getAllByTestId } = render(<AlexJones />);
  const headings = getAllByTestId('rowheader');
  expect(headings.length).toBe(1);
});
