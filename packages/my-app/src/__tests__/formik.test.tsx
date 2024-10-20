import { render } from '@testing-library/react-native';
import FormikScreen from '@/app/(tabs)/formik';

jest.mock('react-native-my-components', () => {
  return {
    ParallaxScrollView: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    ThemedView: ({
      children,
      style,
    }: {
      children: React.ReactNode;
      style?: any;
    }) => <div style={style}>{children}</div>,
  };
});

jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

describe('FormikScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form inputs and submit button', () => {
    const { getByPlaceholderText, getByText } = render(<FormikScreen />);

    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Type your message here')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });
});
