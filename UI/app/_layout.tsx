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

function RootNavigatorContent() {
  const [hasSeenOnboarding] = useStorage("onboarding_seen", false);
  const router = useRouter();
  const segments = useSegments();
  const { user, isLoading } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isMounted && hasSeenOnboarding !== null) {
      SplashScreen.hideAsync();
    }
  }, [isLoading, isMounted, hasSeenOnboarding]);

  useEffect(() => {
    if (!isMounted || isLoading) return;

    const segment = segments[0];

    // Root routing logic based on user status
    if (!hasSeenOnboarding) {
      if (segment !== "onboarding") {
        router.replace("/onboarding");
      }
      setIsNavigationReady(true);
      return;
    }

    if (!user) {
      if (segment !== "(auth)") {
        router.replace("/(auth)");
      }
      setIsNavigationReady(true);
      return;
    }

    // User is authenticated, check onboarding status
    const status = user.onboardingStatus;

    if (status === "AUTH" || status === "ROLE_SELECTION") {
      if (segment !== "onboarding") {
        router.replace("/onboarding/role");
      }
    } else if (status === "PROFILE_INFO") {
      if (segments.join("/") !== "onboarding/profile") {
        router.replace("/onboarding/profile");
      }
    } else if (status === "IDENTITY_VERIFICATION") {
      if (segments.join("/") !== "onboarding/verify") {
        router.replace("/onboarding/verify");
      }
    } else if (status === "COMPLETE") {
      const allowedRoots = ["(main)", "search-results", "ride-history", "booking-confirmation", "driver-profile", "driver-trip-history", "create-ride"];
      if (!allowedRoots.includes(segment)) {
        router.replace("/(main)");
      }
    }
    setIsNavigationReady(true);
  }, [hasSeenOnboarding, user, isMounted, segments, router, isLoading]);

  // Don't render anything until we're fully mounted and loading is done
  if (!isMounted || isLoading || !isNavigationReady) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
      <Stack.Screen name="search-results" />
      <Stack.Screen name="ride-history" />
      <Stack.Screen name="driver-profile" />
    </Stack>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigatorContent />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </UserProvider>
    </QueryClientProvider>
  );
}
