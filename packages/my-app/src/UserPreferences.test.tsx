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
  return (
    <>
      <Text testID="props">{JSON.stringify(preferences)}</Text>
      <Button
        onPress={setSomething}
        title="setSomething"
        testID="setSomething"
      />
    </>
  );
};

describe('UserPreferences', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });
  it('Use provider', async () => {
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
    const button = getByTestId('setSomething');
    await act(() => fireEvent.press(button));
    expect(getByTestId('props').props.children).toBe(
      JSON.stringify({ foo: 'bar' }),
    );
    expect(await AsyncStorage.getItem('storage')).toBe(
      JSON.stringify({ foo: 'bar' }),
    );
    expect(toJSON()).toMatchSnapshot();
  });

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
