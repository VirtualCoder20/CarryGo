import React from "react";
import { useUser } from "@/contexts/user-context";
import { CommuterWallet } from "@/components/commuter-wallet";
import { DriverWallet } from "@/components/driver-wallet";

export default function WalletScreen() {
  const { user } = useUser();

  if (user?.role === "driver") {
    return <DriverWallet />;
  }
  return <CommuterWallet />;
}
