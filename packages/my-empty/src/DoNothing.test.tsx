import { render, renderHook, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  DoNothingContext,
  DoNothingProvider,
  useDoNothing,
  WithDoNothing,
} from './DoNothing';
import { FC, PropsWithChildren } from 'react';

const TestComponent: FC = () => {
  const doNothingProps = useDoNothing();

  return <Text testID="props">{JSON.stringify(doNothingProps)}</Text>;
};

describe('DoNothing', () => {
  it('Use provider', async () => {
    render(
      <DoNothingProvider>
        <TestComponent />
      </DoNothingProvider>,
    );
    expect(screen.getByTestId('props').props.children).toBe('{}');
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('Use Hook', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
    render(<TestedComponent />);
    expect(screen.getByTestId('props').props.children).toBe('{}');
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
