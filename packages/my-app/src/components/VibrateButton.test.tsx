import { fireEvent, render } from '@testing-library/react-native';
import { Vibration } from 'react-native';
import { VibrateButton } from './VibrateButton';

describe('VibrateButton', () => {
  it('should call Vibration.cancel and Vibration.vibrate with the correct pattern when pressed', () => {
    const pattern = [100, 200, 300];
    const { getByRole } = render(
      <VibrateButton pattern={pattern} title="Test Button" />,
    );

    fireEvent.press(getByRole('button'));

    expect(Vibration.cancel).toHaveBeenCalled();
    expect(Vibration.vibrate).toHaveBeenCalledWith(pattern, false);
  });
});
