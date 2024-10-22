import { FC, useCallback } from 'react';
import { Button, ButtonProps, Vibration } from 'react-native';

export type VibrateButtonProps = Omit<ButtonProps, 'onPress'> & {
  pattern: number[];
};
export const VibrateButton: FC<VibrateButtonProps> = ({
  pattern,
  ...props
}) => {
  const onPress = useCallback(() => {
    Vibration.cancel();
    Vibration.vibrate(pattern, false);
  }, [pattern]);
  return <Button onPress={onPress} {...props} />;
};
