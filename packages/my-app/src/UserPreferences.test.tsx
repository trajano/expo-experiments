import { act, fireEvent, render } from '@testing-library/react-native';
import { useCallback } from 'react';
import { Button, Text } from 'react-native';
import {
  UserPreferencesProvider,
  useUserPreferences,
  WithUserPreferences,
} from './UserPreferences';
import AsyncStorage from '@react-native-async-storage/async-storage';
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
const TestComponent: React.FC = () => {
  const { preferences, setAsync } = useUserPreferences();
  const setSomething = useCallback(async () => {
    await setAsync('foo', 'bar');
  }, [setAsync]);
  const setSomethingElse = useCallback(async () => {
    await setAsync('foo', 'baz');
  }, [setAsync]);
  const setSomethingNull = useCallback(async () => {
    await setAsync('foo', null);
  }, [setAsync]);
  return (
    <>
      <Text testID="props">{JSON.stringify(preferences)}</Text>
      <Button
        onPress={setSomething}
        title="setSomething"
        testID="setSomething"
      />
      <Button
        onPress={setSomethingElse}
        title="setSomethingElse"
        testID="setSomethingElse"
      />
      <Button
        onPress={setSomethingNull}
        title="setSomethingNull"
        testID="setSomethingNull"
      />
    </>
  );
};

describe('UserPreferences', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });
  it('Use provider and update', async () => {
    const { getByTestId, toJSON } = render(
      <UserPreferencesProvider
        userPreferencesInitial={{}}
        userPreferencesStorageKey="storage"
      >
        <TestComponent />
      </UserPreferencesProvider>,
    );
    expect(await AsyncStorage.getItem('storage')).toBeNull();
    await act(() => Promise.resolve());
    expect(await AsyncStorage.getItem('storage')).toEqual('{}');
    expect(getByTestId('props').props.children).toBe(JSON.stringify({}));
    await act(() => fireEvent.press(getByTestId('setSomething')));
    expect(getByTestId('props').props.children).toBe(
      JSON.stringify({ foo: 'bar' }),
    );
    expect(await AsyncStorage.getItem('storage')).toBe(
      JSON.stringify({ foo: 'bar' }),
    );
    await act(() => fireEvent.press(getByTestId('setSomethingElse')));
    expect(await AsyncStorage.getItem('storage')).toBe(
      JSON.stringify({ foo: 'baz' }),
    );
    await act(() => fireEvent.press(getByTestId('setSomethingNull')));
    expect(await AsyncStorage.getItem('storage')).toBe(JSON.stringify({}));
    expect(toJSON()).toMatchSnapshot();
  }, 10_000);

  it('Use provider with initial state and update', async () => {
    const initialState = { foo: 'abc' };
    const { getByTestId, toJSON } = render(
      <UserPreferencesProvider
        userPreferencesInitial={initialState}
        userPreferencesStorageKey="storage"
      >
        <TestComponent />
      </UserPreferencesProvider>,
    );
    expect(await AsyncStorage.getItem('storage')).toBeNull();
    await act(() => Promise.resolve());
    expect(await AsyncStorage.getItem('storage')).toEqual(
      JSON.stringify(initialState),
    );
    expect(getByTestId('props').props.children).toBe(
      JSON.stringify(initialState),
    );
    await act(() => fireEvent.press(getByTestId('setSomething')));
    expect(getByTestId('props').props.children).toBe(
      JSON.stringify({ foo: 'bar' }),
    );
    expect(await AsyncStorage.getItem('storage')).toBe(
      JSON.stringify({ foo: 'bar' }),
    );
    await act(() => fireEvent.press(getByTestId('setSomethingElse')));
    expect(await AsyncStorage.getItem('storage')).toBe(
      JSON.stringify({ foo: 'baz' }),
    );
    await act(() => fireEvent.press(getByTestId('setSomethingNull')));
    expect(await AsyncStorage.getItem('storage')).toBe(
      JSON.stringify(initialState),
    );
    expect(toJSON()).toMatchSnapshot();
  }, 10_000);

  it('Use HoC', async () => {
    const TestedComponent = WithUserPreferences(TestComponent);
    const { getByTestId, toJSON } = render(
      <TestedComponent
        userPreferencesInitial={{}}
        userPreferencesStorageKey="storage"
      />,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('props').props.children).toBe(JSON.stringify({}));
    expect(toJSON()).toMatchSnapshot();
  });
});
