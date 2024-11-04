import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react-native';
import * as stories from './Constants.stories';

const { Constants } = composeStories(stories);
test('renders default story', () => {
  render(<Constants />);
});
