import { Stack } from 'expo-router';
import { Brand } from '@/constants/theme';

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Brand.navy,
        },
      }}
    >
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="preferences" />
    </Stack>
  );
}
