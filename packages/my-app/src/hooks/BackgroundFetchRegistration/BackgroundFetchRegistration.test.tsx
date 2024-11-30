import { act, render, renderHook } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  BackgroundFetchRegistrationContext,
  BackgroundFetchRegistrationProvider,
  useBackgroundFetchRegistration,
  WithBackgroundFetchRegistration,
} from './BackgroundFetchRegistration';
import { BackgroundFetchStatus } from 'expo-background-fetch';
import { FC, PropsWithChildren } from 'react';

const TestComponent: FC = () => {
  const MyBackgroundFetchProps = useBackgroundFetchRegistration();

  return <Text testID="props">{JSON.stringify(MyBackgroundFetchProps)}</Text>;
};

jest.mock('expo-task-manager', () => ({
  getRegisteredTasksAsync: jest.fn(() => Promise.resolve([])),
}));

describe('MyBackgroundFetch', () => {
  it('Use provider', async () => {
    const { getByTestId, toJSON } = render(
      <BackgroundFetchRegistrationProvider backgroundFetchTaskNames="taskName">
        <TestComponent />
      </BackgroundFetchRegistrationProvider>,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('props').props.children).toBe('{"registrations":[]}');
    expect(toJSON()).toMatchSnapshot();
  });

  it('Use Hook', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <BackgroundFetchRegistrationContext.Provider
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
      </BackgroundFetchRegistrationContext.Provider>
    );
    const { result } = renderHook(() => useBackgroundFetchRegistration(), {
      wrapper,
    });
    await act(() => Promise.resolve());
    expect(result.current).toStrictEqual({
      registrations: [{ registered: true, taskName: 'foo' }],
      status: BackgroundFetchStatus.Available,
    });
  });

  it('Use HoC', async () => {
    const TestedComponent = WithBackgroundFetchRegistration(TestComponent);
    const { getByTestId, toJSON } = render(
      <TestedComponent backgroundFetchTaskNames="taskName" />,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('props').props.children).toBe('{"registrations":[]}');
    expect(toJSON()).toMatchSnapshot();
  });
});
