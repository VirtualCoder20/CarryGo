import React, { useState, useMemo } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: string;
  status: "successful" | "failed" | "pending";
}

export const CommuterWallet = () => {
  const router = useRouter();
  const [walletBalance] = useState("₦5,000.00");

  const transactions = useMemo<Transaction[]>(
    () => [
      {
        id: "1",
        type: "Ride Payment",
        date: "23rd Mar 2024",
        amount: "₦2,500.00",
        status: "successful",
      },
      {
        id: "2",
        type: "Ride Payment",
        date: "22nd Mar 2025",
        amount: "₦2,500.00",
        status: "successful",
      },
      {
        id: "3",
        type: "Ride Payment",
        date: "18th Mar 2026",
        amount: "₦2,500.00",
        status: "failed",
      },
      {
        id: "4",
        type: "Ride Payment",
        date: "27th Feb 2026",
        amount: "₦2,500.00",
        status: "successful",
      },
      {
        id: "5",
        type: "Ride Payment",
        date: "26th Feb 2027",
        amount: "₦2,500.00",
        status: "successful",
      },
    ],
    [],
  );

  // Group transactions by month
  const groupedTransactions = useMemo(() => {
    const grouped: { [month: string]: Transaction[] } = {};
    transactions.forEach((transaction) => {
      const parts = transaction.date.split(" ");
      const monthYear = `${parts[1]} ${parts[2]}`;
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(transaction);
    });
    return grouped;
  }, [transactions]);

  const handleViewAll = () => {
    console.log("View all transactions");
  };

  const handleDeposit = () => {
    console.log("Deposit money");
  };

  const getStatusColor = (status: "successful" | "failed" | "pending") => {
    switch (status) {
      case "successful":
        return Brand.primary;
      case "failed":
        return "#FF6B6B";
      case "pending":
        return "#FFB347";
      default:
        return "#999";
    }
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
        <View style={{ width: 24 }} />
      </View>

      {/* Wallet Balance Card */}
      <View style={styles.balanceCard}>
        <ThemedText style={styles.balanceLabel}>Wallet Balance</ThemedText>
        <ThemedText style={styles.balanceAmount}>{walletBalance}</ThemedText>

        <View style={styles.divider} />

        <Pressable style={styles.depositButton} onPress={handleDeposit}>
          <View style={styles.depositIcon}>
            <IconSymbol name="plus" md="add" size={20} color={Brand.navy} />
          </View>
          <ThemedText style={styles.depositText}>DEPOSIT MONEY</ThemedText>
        </Pressable>
      </View>

      {/* Transaction History Header */}
      <View style={styles.historyHeader}>
        <ThemedText style={styles.historyTitle}>Transaction History</ThemedText>
        <Pressable onPress={handleViewAll}>
          <ThemedText style={styles.viewAllButton}>View all</ThemedText>
        </Pressable>
      </View>

      {/* Transactions */}
      {Object.entries(groupedTransactions).map(([month, monthTransactions]) => (
        <View key={month}>
          <ThemedText style={styles.monthHeader}>{month}</ThemedText>
          {monthTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon}>
                  <IconSymbol
                    name="car.fill"
                    md="directions-car"
                    size={24}
                    color={Brand.primary}
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <ThemedText style={styles.transactionType}>
                    {transaction.type}
                  </ThemedText>
                  <ThemedText style={styles.transactionDate}>
                    {transaction.date}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.transactionRight}>
                <ThemedText style={styles.transactionAmount}>
                  {transaction.amount}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.transactionStatus,
                    { color: getStatusColor(transaction.status) },
                  ]}
                >
                  {transaction.status.charAt(0).toUpperCase() +
                    transaction.status.slice(1)}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Brand.navy,
    paddingHorizontal: 16,
    paddingTop: 42,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  balanceCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 24,
    marginBottom: 32,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500" as const,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: "700" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
    marginBottom: 20,
    lineHeight: 48,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  depositButton: {
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 12,
  },
  depositIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Brand.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  depositText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#999",
  },
  historyHeader: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  viewAllButton: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Brand.primary,
  },
  monthHeader: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
    marginTop: 24,
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  transactionLeft: {
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(39, 214, 155, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: "#999",
  },
  transactionRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  transactionStatus: {
    fontSize: 13,
    fontWeight: "600" as const,
  },
});
