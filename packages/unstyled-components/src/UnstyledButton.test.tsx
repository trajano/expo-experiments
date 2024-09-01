import { render } from '@testing-library/react-native';
import { Image, Text } from 'react-native';
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
          <Image
            testID="startIcon"
            source={{ uri: 'startImage' }}
            style={{ width: 20, height: 20 }}
          />
        </UnstyledButton.StartIcon>
        <Text>Hello world</Text>
        <Text>Stinky Tofu</Text>
        <UnstyledButton.EndIcon style={{ marginLeft: 15 }}>
          <Text testID="endIcon">✓</Text>
        </UnstyledButton.EndIcon>
      </UnstyledButton>,
    );

    expect(toJSON()).toMatchSnapshot();

    // Check for start icon
    const startIcon = getByTestId('startIcon');
    expect(startIcon).toBeTruthy();

    // Check for main content (Text elements)
    const mainContent = getByTestId('test-id');
    expect(mainContent).toBeTruthy();

    // Verify presence of specific texts
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('Stinky Tofu')).toBeTruthy();

    // Check for end icon
    const endIcon = getByTestId('endIcon');
    expect(endIcon).toBeTruthy();
  });

  it('should render without start and end icons if they are not provided', () => {
    const { getByTestId, getByText, toJSON } = render(
      <UnstyledButton testID="test-id">
        <Text>Hello world</Text>
      </UnstyledButton>,
    );

    // Check for main content (Text elements)
    const mainContent = getByTestId('test-id');
    expect(mainContent).toBeTruthy();

    // Verify presence of specific texts
    expect(getByText('Hello world')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });
});
