import { FC } from 'react';
import { Stack } from 'expo-router';

const PublicLayout: FC = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="flatlist" options={{ headerShown: false }} />
    </Stack>
  );
};
export default PublicLayout;
