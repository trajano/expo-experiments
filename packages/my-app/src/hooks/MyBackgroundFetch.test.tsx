import { act, render, renderHook } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  MyBackgroundFetchContext,
  MyBackgroundFetchProvider,
  useMyBackgroundFetch,
  WithMyBackgroundFetch,
} from './MyBackgroundFetch';
import { BackgroundFetchStatus } from 'expo-background-fetch';
import { PropsWithChildren } from 'react';

const TestComponent: React.FC = () => {
  const MyBackgroundFetchProps = useMyBackgroundFetch();

  return <Text testID="props">{JSON.stringify(MyBackgroundFetchProps)}</Text>;
};

describe('MyBackgroundFetch', () => {
  it('Use provider', async () => {
    const { getByTestId, toJSON } = render(
      <MyBackgroundFetchProvider backgroundFetchTaskName="taskName">
        <TestComponent />
      </MyBackgroundFetchProvider>,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('props').props.children).toBe('{}');
    expect(toJSON()).toMatchSnapshot();
  });

  it('Use Hook', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MyBackgroundFetchContext.Provider
        value={{ registered: true, status: BackgroundFetchStatus.Available }}
      >
        {children}
      </MyBackgroundFetchContext.Provider>
    );
    const { result } = renderHook(() => useMyBackgroundFetch(), { wrapper });
    await act(() => Promise.resolve());
    expect(result.current).toEqual({
      registered: true,
      status: BackgroundFetchStatus.Available,
    });
  });

  it('Use HoC', async () => {
    const TestedComponent = WithMyBackgroundFetch(TestComponent);
    const { getByTestId, toJSON } = render(
      <TestedComponent backgroundFetchTaskName="taskName" />,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('props').props.children).toBe('{}');
    expect(toJSON()).toMatchSnapshot();
  });
});
