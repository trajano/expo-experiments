import { act, render, renderHook, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { NfcContext, NfcProvider, useNfc, WithNfc } from './Nfc';
import { FC, PropsWithChildren } from 'react';

const TestComponent: FC = () => {
  const NfcProps = useNfc();

  return <Text testID="props">{JSON.stringify(NfcProps)}</Text>;
};

describe('Nfc', () => {
  it('Use provider', async () => {
    render(
      <NfcProvider>
        <TestComponent />
      </NfcProvider>,
    );
    await act(() => Promise.resolve());

    expect(screen.getByTestId('props').props.children).toStrictEqual(
      JSON.stringify({ nfcManager: {} }),
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('Use Hook', async () => {
    const nfcManager = jest.fn() as any;
    let value = {
      nfcManager: nfcManager,
      getTagAsync: jest.fn(),
    };
    const wrapper = ({ children }: PropsWithChildren) => {
      return (
        <NfcContext.Provider value={value}>{children}</NfcContext.Provider>
      );
    };
    const { result } = renderHook(() => useNfc(), { wrapper });
    expect(result.current).toEqual(value);
  });

  it('Use HoC', async () => {
    const TestedComponent = WithNfc(TestComponent);
    render(<TestedComponent />);
    await act(() => Promise.resolve());

    expect(screen.getByTestId('props').props.children).toStrictEqual(
      JSON.stringify({ nfcManager: {} }),
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
