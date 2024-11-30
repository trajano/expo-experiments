import { act, render, renderHook } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  MyBackgroundFetchContext,
  MyBackgroundFetchProvider,
  useMyBackgroundFetch,
  WithMyBackgroundFetch,
} from './MyBackgroundFetch';
import { BackgroundFetchStatus } from 'expo-background-fetch';
import { FC, PropsWithChildren } from 'react';

const TestComponent: FC = () => {
  const MyBackgroundFetchProps = useMyBackgroundFetch();

  return <Text testID="props">{JSON.stringify(MyBackgroundFetchProps)}</Text>;
};

jest.mock('expo-task-manager', () => ({
  getRegisteredTasksAsync: jest.fn(() => Promise.resolve([])),
}));

describe('MyBackgroundFetch', () => {
  it('Use provider', async () => {
    const { getByTestId, toJSON } = render(
      <MyBackgroundFetchProvider backgroundFetchTaskNames="taskName">
        <TestComponent />
      </MyBackgroundFetchProvider>,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('props').props.children).toBe('{"registrations":[]}');
    expect(toJSON()).toMatchSnapshot();
  });

  it('Use Hook', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MyBackgroundFetchContext.Provider
        value={{
          registrations: [
            {
              taskName: 'foo',
              registered: true,
            },
          ],
          status: BackgroundFetchStatus.Available,
        }}
      >
        {children}
      </MyBackgroundFetchContext.Provider>
    );
    const { result } = renderHook(() => useMyBackgroundFetch(), { wrapper });
    await act(() => Promise.resolve());
    expect(result.current).toStrictEqual({
      registrations: [{ registered: true, taskName: 'foo' }],
      status: BackgroundFetchStatus.Available,
    });
  });

  it('Use HoC', async () => {
    const TestedComponent = WithMyBackgroundFetch(TestComponent);
    const { getByTestId, toJSON } = render(
      <TestedComponent backgroundFetchTaskNames="taskName" />,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('props').props.children).toBe('{"registrations":[]}');
    expect(toJSON()).toMatchSnapshot();
  });
});
