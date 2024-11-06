import { render, screen } from '@testing-library/react-native';
import { Nothing } from './Nothing';
describe('nothing', () => {
  it('renders nothing', async () => {
    render(<Nothing />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
