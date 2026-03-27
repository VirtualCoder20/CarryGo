import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useUser } from "@/contexts/user-context";
import { Brand } from "@/constants/theme";

export default function MainLayout() {
  const { user } = useUser();

  const isDriver = user?.role === "driver";

  if (isDriver) {
    // Driver Navigation Tabs
    return (
      <NativeTabs
        minimizeBehavior="onScrollDown"
        backgroundColor={Brand.light_navy}
      >
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
          <NativeTabs.Trigger.Label selectedStyle={{ color: "white" }}>Home</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="request">
          <NativeTabs.Trigger.Icon sf="square.and.pencil" md="create" />
          <NativeTabs.Trigger.Label selectedStyle={{ color: "white" }}>Ride Request</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="wallet">
          <NativeTabs.Trigger.Icon sf="creditcard.fill" md="payment" />
          <NativeTabs.Trigger.Label selectedStyle={{ color: "white" }}>Wallet</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="account">
          <NativeTabs.Trigger.Icon sf="person.fill" md="account_circle" />
          <NativeTabs.Trigger.Label selectedStyle={{ color: "white" }}>Account</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // Commuter Navigation Tabs
  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      backgroundColor={Brand.light_navy}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label selectedStyle={{ color: "white" }}>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="activity">
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
        <NativeTabs.Trigger.Label selectedStyle={{ color: "white" }}>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="wallet">
        <NativeTabs.Trigger.Icon sf="creditcard.fill" md="payment" />
        <NativeTabs.Trigger.Label selectedStyle={{ color: "white" }}>Wallet</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <NativeTabs.Trigger.Icon sf="person.fill" md="account_circle" />
        <NativeTabs.Trigger.Label selectedStyle={{ color: "white" }}>Account</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
