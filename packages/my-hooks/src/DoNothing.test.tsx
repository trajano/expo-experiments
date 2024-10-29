import { render, renderHook } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  DoNothingContext,
  DoNothingProvider,
  useDoNothing,
  WithDoNothing,
} from './DoNothing';
import { PropsWithChildren } from 'react';

const TestComponent: React.FC = () => {
  const doNothingProps = useDoNothing();

  return <Text testID="props">{JSON.stringify(doNothingProps)}</Text>;
};

describe('DoNothing', () => {
  it('Use provider', async () => {
    const { getByTestId, toJSON } = render(
      <DoNothingProvider>
        <TestComponent />
      </DoNothingProvider>,
    );
    expect(getByTestId('props').props.children).toBe('{}');
    expect(toJSON()).toMatchSnapshot();
  });

  it('Use Hook', async () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <DoNothingContext.Provider value={{}}>
        {children}
      </DoNothingContext.Provider>
    );
    const { result } = renderHook(() => useDoNothing(), { wrapper });
    expect(result.current).toEqual({});
  });

  it('Use HoC', async () => {
    const TestedComponent = WithDoNothing(TestComponent);
    const { getByTestId, toJSON } = render(<TestedComponent />);
    expect(getByTestId('props').props.children).toBe('{}');
    expect(toJSON()).toMatchSnapshot();
  });
});
