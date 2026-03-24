import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "expo-sqlite/localStorage/install";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useStorage } from "@/hooks/use-storage";
import { UserProvider, useUser } from "@/contexts/user-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const colorScheme = useColorScheme();
  const [hasSeenOnboarding] = useStorage("onboarding_seen", false);
  const router = useRouter();
  const segments = useSegments();
  const { user, isLoading } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isMounted) {
      SplashScreen.hideAsync();
    }
  }, [isLoading, isMounted]);

  useEffect(() => {
    if (!isMounted || isLoading) return;

    const segment = segments[0];

    // Root routing logic based on user status
    if (!hasSeenOnboarding) {
      if (segment !== "onboarding") {
        router.replace("/onboarding");
      }
      return;
    }

    if (!user) {
      if (segment !== "(auth)") {
        router.replace("/(auth)");
      }
      return;
    }

    // User is authenticated, check onboarding status
    const status = user.onboardingStatus;
    
    if (status === 'AUTH' || status === 'ROLE_SELECTION') {
      if (segment !== "onboarding") {
        router.replace("/onboarding/role");
      }
    } else if (status === 'PROFILE_INFO') {
      if (segments.join('/') !== "onboarding/profile") {
        router.replace("/onboarding/profile");
      }
    } else if (status === 'IDENTITY_VERIFICATION') {
      if (segments.join('/') !== "onboarding/verify") {
        router.replace("/onboarding/verify");
      }
    } else if (status === 'COMPLETE') {
      if (segment !== "(main)") {
        router.replace("/(main)");
      }
    }
  }, [hasSeenOnboarding, user, isMounted, segments, router, isLoading]);

  if (!isMounted || isLoading) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </QueryClientProvider>
  );
}
