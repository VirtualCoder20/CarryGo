import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface DriverTransaction {
  id: string;
  type: "ride" | "commission";
  title: string;
  date: string;
  time: string;
  amount: string;
  isCredit: boolean;
}

export const DriverWallet = () => {
  const router = useRouter();
  const [walletBalance] = useState("₦12,400.00");

  const transactions: DriverTransaction[] = [
    {
      id: "1",
      type: "ride",
      title: "Ride Fare",
      date: "Today",
      time: "02:30 PM",
      amount: "₦3,500.00",
      isCredit: true,
    },
    {
      id: "2",
      type: "commission",
      title: "Platform Commission",
      date: "Today",
      time: "02:30 PM",
      amount: "₦525.00",
      isCredit: false,
    },
    {
      id: "3",
      type: "ride",
      title: "Ride Fare",
      date: "Yesterday",
      time: "06:45 PM",
      amount: "₦2,200.00",
      isCredit: true,
    },
  ];

  const handleViewAll = () => {
    console.log("View all transactions");
  };

  const handleWithdraw = () => {
    console.log("Withdraw to bank");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol
            name="arrow.left"
            md="arrow-back"
            size={24}
            color="#FFF"
          />
        </Pressable>
        <ThemedText style={styles.pageTitle}>Wallet</ThemedText>
        <ThemedText style={styles.interswitch}>
          <ThemedText style={styles.poweredBy}>POWERED</ThemedText>
          <ThemedText style={styles.poweredBy}>
            {"\n"}BY{"\n"}
          </ThemedText>
          <ThemedText style={styles.interswitch}>INTERSWITCH</ThemedText>
        </ThemedText>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceLabelContainer}>
          <ThemedText style={styles.balanceLabel}>CURRENT BALANCE</ThemedText>
        </View>

        <View style={styles.balanceAmountContainer}>
          <ThemedText style={styles.nairaSymbol}>₦</ThemedText>
          <ThemedText style={styles.balanceAmount}>
            {walletBalance.substring(1)}
          </ThemedText>
        </View>

        <Pressable style={styles.withdrawButton} onPress={handleWithdraw}>
          <IconSymbol
            name="arrow.up"
            md="arrow-upward"
            size={20}
            color={Brand.navy}
          />
          <ThemedText style={styles.withdrawText}>Withdraw to Bank</ThemedText>
        </Pressable>
      </View>

      {/* Recent Transactions Header */}
      <View style={styles.recentHeader}>
        <ThemedText style={styles.recentTitle}>Recent Transactions</ThemedText>
        <Pressable onPress={handleViewAll}>
          <ThemedText style={styles.seeAllButton}>See All</ThemedText>
        </Pressable>
      </View>

      {/* Transactions */}
      <View style={styles.transactionsList}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionLeft}>
              <View
                style={[
                  styles.transactionIconContainer,
                  {
                    backgroundColor:
                      transaction.type === "ride"
                        ? "rgba(39, 214, 155, 0.15)"
                        : "rgba(255, 107, 107, 0.15)",
                  },
                ]}
              >
                {transaction.type === "ride" ? (
                  <IconSymbol
                    name="smiley.fill"
                    md="sentiment-satisfied"
                    size={24}
                    color={Brand.primary}
                  />
                ) : (
                  <IconSymbol
                    name="chart.line.uptrend.xyaxis"
                    md="trending-down"
                    size={24}
                    color="#FF6B6B"
                  />
                )}
              </View>

              <View style={styles.transactionInfo}>
                <ThemedText style={styles.transactionTitle}>
                  {transaction.title}
                </ThemedText>
                <ThemedText style={styles.transactionDateTime}>
                  {transaction.date}, {transaction.time}
                </ThemedText>
              </View>
            </View>

            <ThemedText
              style={[
                styles.transactionAmount,
                {
                  color: transaction.isCredit ? Brand.primary : "#FF6B6B",
                },
              ]}
            >
              {transaction.isCredit ? "+" : "-"}
              {transaction.amount}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Security Footer */}
      <View style={styles.footer}>
        <View style={styles.securityIcon}>
          <IconSymbol name="lock.fill" md="lock" size={16} color="#666" />
        </View>
        <ThemedText style={styles.securityText}>
          SECURE BANK-LEVEL ENCRYPTION
        </ThemedText>
      </View>
      <ThemedText style={styles.versionText}>
        CarryGo Integrated Payment System v2.1
      </ThemedText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
    flex: 1,
    textAlign: "center" as const,
  },
  interswitch: {
    fontSize: 10,
    fontWeight: "700" as const,
    color: "#FFF",
    textAlign: "right" as const,
    lineHeight: 12,
  },
  poweredBy: {
    fontSize: 10,
    fontWeight: "600" as const,
    color: "#666",
    lineHeight: 12,
  },
  balanceCard: {
    backgroundColor: "rgba(39, 214, 155, 0.1)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(39, 214, 155, 0.3)",
    padding: 32,
    marginBottom: 40,
    alignItems: "center",
  },
  balanceLabelContainer: {
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "600" as const,
    letterSpacing: 2,
  },
  balanceAmountContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 32,
  },
  nairaSymbol: {
    fontSize: 40,
    fontWeight: "700" as const,
    color: Brand.primary,
    fontFamily: Fonts.rounded,
    marginRight: 4,
  },
  balanceAmount: {
    fontSize: 56,
    fontWeight: "700" as const,
    lineHeight: 64,
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  withdrawButton: {
    width: "100%",
    backgroundColor: Brand.primary,
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  withdrawText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Brand.navy,
  },
  recentHeader: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Brand.primary,
  },
  transactionsList: {
    gap: 12,
    marginBottom: 40,
  },
  transactionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionLeft: {
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  transactionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 4,
  },
  transactionDateTime: {
    fontSize: 13,
    color: "#999",
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "700" as const,
    fontFamily: Fonts.rounded,
  },
  footer: {
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
    marginTop: 32,
  },
  securityIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  securityText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600" as const,
    letterSpacing: 1,
  },
  versionText: {
    fontSize: 12,
    color: "#555",
    textAlign: "center" as const,
    marginBottom: 20,
  },
});
