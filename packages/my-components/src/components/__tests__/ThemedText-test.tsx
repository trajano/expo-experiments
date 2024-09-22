import { render } from '@testing-library/react-native';
import { ThemedText } from 'react-native-my-components/src/components/ThemedText';

it('renders correctly', () => {
  const { toJSON } = render(<ThemedText>Snapshot test!</ThemedText>);
  expect(toJSON()).toMatchSnapshot();
});
