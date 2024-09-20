import { act, fireEvent, render } from '@testing-library/react-native';
import { Button, Text } from 'react-native';
import { FallbackComponentProps, Try } from './Try';

// Fallback component for error handling
const FallbackComponent = ({ error, isFatal }: FallbackComponentProps) => {
  return (
    <Text testID="fallback">
      {error instanceof Error ? error.message : String(error)} {`${isFatal}`}
    </Text>
  );
};

// Component that triggers an error
const TriggerComponent = () => {
  const triggerError = () => {
    throw new Error('message');
  };
  return (
    <Button onPress={triggerError} testID="triggerError" title="Trigger" />
  );
};

// Component under test
const TestComponent = () => {
  return (
    <Try Catch={FallbackComponent}>
      <TriggerComponent />
    </Try>
  );
};

// Mock global.ErrorUtils
beforeEach(() => {
  let errorHandler: (error: unknown, isFatal: boolean) => void = () => {};
  global.ErrorUtils = {
    getGlobalHandler: jest.fn(() => errorHandler),
    setGlobalHandler: jest.fn((nextErrorHandler) => {
      errorHandler = nextErrorHandler;
    }),
  };
});

it('should render the TriggerComponent when error is triggered', async () => {
  const { getByTestId } = render(<TestComponent />);
  await act(() => Promise.resolve());

  // Ensure the button is present
  const button = getByTestId('triggerError');
  expect(button).toBeTruthy();
});

it('should render fallback when error is triggered', async () => {
  const { getByTestId, getByText } = render(<TestComponent />);
  await act(() => Promise.resolve());

  // Ensure the button is present
  const button = getByTestId('triggerError');
  expect(button).toBeTruthy();

  // Trigger error
  await act(async () => {
    try {
      fireEvent.press(button);
    } catch (e) {
      global.ErrorUtils.getGlobalHandler()(e, true);
    }
  });

  // Check that the fallback component is displayed
  expect(getByTestId('fallback')).toBeTruthy();
  expect(getByText('message true')).toBeTruthy(); // Error message and isFatal should be displayed
});
