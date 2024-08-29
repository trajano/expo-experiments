import { render } from '@testing-library/react-native';
import { Text, Image } from 'react-native';
import { UnstyledButton } from './UnstyledButton'; // Adjust the import path as necessary

describe('UnstyledButton Component', () => {
  it('should render the wrapper, start icon, main content, and end icon correctly', () => {
    const { getByTestId, getByText, toJSON } = render(
      <UnstyledButton
        style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
        contentContainerStyle={{ justifyContent: 'center' }}
        testID="test-id"
      >
        <UnstyledButton.StartIcon style={{ marginRight: 5 }}>
          <Image source={{ uri: 'startImage' }} style={{ width: 20, height: 20 }} />
        </UnstyledButton.StartIcon>
        <Text>Hello world</Text>
        <Text>Stinky Tofu</Text>
        <UnstyledButton.EndIcon style={{ marginLeft: 5 }}>
          <Text>✓</Text>
        </UnstyledButton.EndIcon>
      </UnstyledButton>
    );

    // Check for wrapper
    const wrapper = getByTestId('test-id_wrapper');
    expect(wrapper).toBeTruthy();

    // Check for start icon
    const startIcon = getByTestId('test-id_startIcon');
    expect(startIcon).toBeTruthy();

    // Check for main content (Text elements)
    const mainContent = getByTestId('test-id');
    expect(mainContent).toBeTruthy();

    // Verify presence of specific texts
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('Stinky Tofu')).toBeTruthy();

    // Check for end icon
    const endIcon = getByTestId('test-id_endIcon');
    expect(endIcon).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render without start and end icons if they are not provided', () => {
    const { getByTestId, queryByTestId, getByText, toJSON } = render(
      <UnstyledButton
        testID="test-id"
      >
        <Text>Hello world</Text>
      </UnstyledButton>
    );

    // Check for wrapper
    const wrapper = getByTestId('test-id_wrapper');
    expect(wrapper).toBeTruthy();

    // Check for main content (Text elements)
    const mainContent = getByTestId('test-id');
    expect(mainContent).toBeTruthy();

    // Verify presence of specific texts
    expect(getByText('Hello world')).toBeTruthy();

    // Check that start and end icons are not rendered
    expect(queryByTestId('test-id_startIcon')).toBeNull();
    expect(queryByTestId('test-id_endIcon')).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });
});
