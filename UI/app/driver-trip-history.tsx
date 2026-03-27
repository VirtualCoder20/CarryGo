import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface DriverTrip {
  id: string;
  date: string;
  destination: string;
  address: string;
  price: string;
  status: "completed" | "cancelled" | "pending";
}

export default function DriverTripHistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"previous" | "upcoming">("previous");

  // Group trips by month
  const groupedTrips = useMemo(() => {
    const trips: DriverTrip[] = [
      {
        id: "1",
        date: "23rd Mar 2024",
        destination: "Interswitch Building",
        address: "Oko-Awo Cl, Victoria Island",
        price: "₦2,500.00",
        status: "completed",
      },
      {
        id: "2",
        date: "22nd Mar 2024",
        destination: "Interswitch Building",
        address: "Oko-Awo Cl, Victoria Island",
        price: "₦2,500.00",
        status: "completed",
      },
      {
        id: "3",
        date: "21st Mar 2024",
        destination: "Interswitch Building",
        address: "Oko-Awo Cl, Victoria Island",
        price: "₦2,500.00",
        status: "completed",
      },
      {
        id: "4",
        date: "27th Feb 2024",
        destination: "Interswitch Building",
        address: "Oko-Awo Cl, Victoria Island",
        price: "₦2,500.00",
        status: "completed",
      },
      {
        id: "5",
        date: "26th Feb 2026",
        destination: "Interswitch Building",
        address: "Oko-Awo Cl, Victoria Island",
        price: "₦2,500.00",
        status: "cancelled",
      },
    ];

    const upcomingTrips: DriverTrip[] = [
      {
        id: "u1",
        date: "28th Mar 2026",
        destination: "Lagos Airport",
        address: "Ikeja, Lagos",
        price: "₦5,000.00",
        status: "pending",
      },
      {
        id: "u2",
        date: "29th Mar 2026",
        destination: "Victoria Island",
        address: "VI, Lagos",
        price: "₦3,200.00",
        status: "pending",
      },
    ];

    const tripsToGroup = activeTab === "previous" ? trips : upcomingTrips;
    const grouped: { [month: string]: DriverTrip[] } = {};
    
    tripsToGroup.forEach((trip) => {
      const parts = trip.date.split(" ");
      const monthYear = `${parts[1]} ${parts[2]}`;
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(trip);
    });
    
    return grouped;
  }, [activeTab]);

  const getStatusColor = (status: "completed" | "cancelled" | "pending") => {
    switch (status) {
      case "completed":
        return Brand.primary;
      case "cancelled":
        return "#FF6B6B";
      case "pending":
        return "#FFB347";
      default:
        return "#999";
    }
  };

  const getStatusLabel = (status: "completed" | "cancelled" | "pending") => {
    switch (status) {
      case "completed":
        return "COMPLETED";
      case "cancelled":
        return "CANCELLED";
      case "pending":
        return "PENDING";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <IconSymbol
              name="arrow.left"
              md="arrow-back"
              size={24}
              color="#FFF"
            />
          </Pressable>
          <ThemedText style={styles.pageTitle}>Trip History</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === "previous" && styles.activeTab]}
            onPress={() => setActiveTab("previous")}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === "previous" && styles.activeTabText,
              ]}
            >
              Previous
            </ThemedText>
          </Pressable>

          <Pressable
            style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("upcoming")}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === "upcoming" && styles.activeTabText,
              ]}
            >
              Upcoming
            </ThemedText>
          </Pressable>
        </View>

        {/* Trips List */}
        {Object.keys(groupedTrips).length > 0 ? (
          Object.entries(groupedTrips).map(([month, monthTrips]) => (
            <View key={month}>
              <ThemedText style={styles.monthHeader}>{month}</ThemedText>
              <View style={styles.tripsList}>
                {monthTrips.map((trip) => (
                  <Pressable key={trip.id} style={styles.tripCard}>
                    <View style={styles.tripLeft}>
                      <View style={styles.tripIcon}>
                        <IconSymbol
                          name="car.fill"
                          md="directions-car"
                          size={28}
                          color={Brand.primary}
                        />
                      </View>

                      <View style={styles.tripInfo}>
                        <ThemedText style={styles.tripDate}>
                          {trip.date}
                        </ThemedText>
                        <ThemedText style={styles.tripDestination}>
                          {trip.destination}
                        </ThemedText>
                        <ThemedText style={styles.tripAddress}>
                          {trip.address}
                        </ThemedText>
                        <ThemedText style={styles.tripPrice}>
                          {trip.price}
                        </ThemedText>
                      </View>
                    </View>

                    <ThemedText
                      style={[
                        styles.tripStatus,
                        { color: getStatusColor(trip.status) },
                      ]}
                    >
                      {getStatusLabel(trip.status)}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <IconSymbol
              name="car.fill"
              md="directions-car"
              size={48}
              color="rgba(255, 255, 255, 0.2)"
            />
            <ThemedText style={styles.emptyStateText}>
              No {activeTab} trips
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
    paddingTop: 20,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  tabContainer: {
    flexDirection: "row" as const,
    paddingHorizontal: 16,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: Brand.primary,
  },
  tabText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.6)",
  },
  activeTabText: {
    color: "#FFF",
  },
  tabUnderline: {
    position: "absolute" as const,
    bottom: -13,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Brand.primary,
  },
  monthHeader: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#FFF",
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 24,
  },
  tripsList: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  tripCard: {
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  tripLeft: {
    flex: 1,
    flexDirection: "row" as const,
    alignItems: "flex-start",
    gap: 12,
  },
  tripIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "rgba(39, 214, 155, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  tripInfo: {
    flex: 1,
    gap: 2,
  },
  tripDate: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500" as const,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFF",
    marginTop: 2,
  },
  tripAddress: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  tripPrice: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#FFF",
    marginTop: 4,
  },
  tripStatus: {
    fontSize: 12,
    fontWeight: "700" as const,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500" as const,
  },
});
