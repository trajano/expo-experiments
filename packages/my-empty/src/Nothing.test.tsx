import { render, screen } from '@testing-library/react-native';
import { Nothing } from './Nothing';
import { composeStories } from '@storybook/react';
import * as stories from './Nothing.stories';

const { Default } = composeStories(stories);
describe('nothing', () => {
  it('renders nothing', async () => {
    render(<Nothing />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('renders nothing story', async () => {
    render(<Default />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
