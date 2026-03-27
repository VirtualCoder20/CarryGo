import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";

interface Ride {
  id: string;
  date: string;
  destination: string;
  address: string;
  price: string;
  completed: boolean;
}

export default function SearchScreen() {
  const [historyTab, setHistoryTab] = useState<"previous" | "upcoming">(
    "previous",
  );
  const router = useRouter();
  // Group rides by month
  const groupRidesByMonth = (rides: Ride[]) => {
    const grouped: { [month: string]: Ride[] } = {};
    rides.forEach((ride) => {
      const parts = ride.date.split(" ");
      const monthYear = `${parts[1]} ${parts[2]}`;
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(ride);
    });
    return grouped;
  };

  const previousRides: Ride[] = [
    {
      id: "1",
      date: "23rd Mar 2026",
      destination: "Interswitch Building",
      address: "Oko-Awo Cl, Victoria Island",
      price: "₦ 2,500.00",
      completed: true,
    },
    {
      id: "2",
      date: "22nd Mar 2026",
      destination: "Interswitch Building",
      address: "Oko-Awo Cl, Victoria Island",
      price: "₦ 2,500.00",
      completed: true,
    },
    {
      id: "3",
      date: "18th Mar 2026",
      destination: "Interswitch Building",
      address: "Oko-Awo Cl, Victoria Island",
      price: "₦ 2,500.00",
      completed: true,
    },
    {
      id: "4",
      date: "27th Feb 2026",
      destination: "Interswitch Building",
      address: "Oko-Awo Cl, Victoria Island",
      price: "₦ 2,500.00",
      completed: true,
    },
    {
      id: "5",
      date: "26th Feb 2026",
      destination: "Interswitch Building",
      address: "Oko-Awo Cl, Victoria Island",
      price: "₦ 2,500.00",
      completed: true,
    },
  ];

  const upcomingRides: Ride[] = [];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Brand.navy }}
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 40 }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Page Title */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={{
            padding: 8,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconSymbol
            name="arrow.left"
            md="arrow-back"
            size={24}
            color="#FFF"
          />
        </Pressable>
        <ThemedText style={styles.pageTitle}>Ride History</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, historyTab === "previous" && styles.activeTab]}
          onPress={() => setHistoryTab("previous")}
        >
          <ThemedText
            style={[
              styles.tabText,
              historyTab === "previous" && styles.activeTabText,
            ]}
          >
            Previous
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.tab, historyTab === "upcoming" && styles.activeTab]}
          onPress={() => setHistoryTab("upcoming")}
        >
          <ThemedText
            style={[
              styles.tabText,
              historyTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </ThemedText>
        </Pressable>
      </View>

      {/* Rides List */}
      <View style={styles.ridesSection}>
        {historyTab === "upcoming" ? (
          // Empty state for upcoming rides
          upcomingRides.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyStateIcon}>
                <IconSymbol
                  name="plus.circle.fill"
                  md="add-circle"
                  size={64}
                  color={Brand.primary}
                />
              </View>
              <ThemedText style={styles.emptyStateTitle}>
                No Upcoming Rides
              </ThemedText>
              <ThemedText style={styles.emptyStateMessage}>
                You do not have any upcoming rides. You can{"\n"}schedule or
                contact your ride buddy.
              </ThemedText>
              <Pressable
                style={styles.scheduleButton}
                onPress={() => {
                  // Navigate to schedule ride
                }}
              >
                <ThemedText style={styles.scheduleButtonText}>
                  Schedule A Ride
                </ThemedText>
              </Pressable>
            </View>
          ) : (
            // Upcoming rides list
            upcomingRides.map((ride) => (
              <View key={ride.id} style={styles.rideItem}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={styles.rideIcon}>
                    <IconSymbol
                      name="car.fill"
                      md="directions-car"
                      size={28}
                      color={Brand.primary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ThemedText style={styles.rideDate}>{ride.date}</ThemedText>
                    <ThemedText style={styles.rideDestination}>
                      {ride.destination}
                    </ThemedText>
                    <ThemedText style={styles.rideAddress}>
                      {ride.address}
                    </ThemedText>
                  </View>
                  <View style={styles.rideStatusCompleted}>
                    <IconSymbol
                      name="arrow.2.squarepath"
                      md="refresh"
                      size={24}
                      color={Brand.primary}
                    />
                  </View>
                </View>
                <ThemedText style={styles.ridePrice}>{ride.price}</ThemedText>
              </View>
            ))
          )
        ) : // Previous rides with month grouping
        previousRides.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateIcon}>
              <IconSymbol
                name="plus.circle.fill"
                md="add-circle"
                size={64}
                color={Brand.primary}
              />
            </View>
            <ThemedText style={styles.emptyStateTitle}>
              No Previous Rides
            </ThemedText>
            <ThemedText style={styles.emptyStateMessage}>
              You do not have any previous rides. Start{"\n"}your first ride
              today.
            </ThemedText>
            <Pressable
              style={styles.scheduleButton}
              onPress={() => {
                // Navigate to schedule ride
              }}
            >
              <ThemedText style={styles.scheduleButtonText}>
                Schedule A Ride
              </ThemedText>
            </Pressable>
          </View>
        ) : (
          Object.entries(groupRidesByMonth(previousRides)).map(
            ([month, rides]) => (
              <View key={month}>
                <ThemedText style={styles.monthHeader}>{month}</ThemedText>
                {rides.map((ride) => (
                  <View key={ride.id} style={styles.rideItem}>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <View style={styles.rideIcon}>
                        <IconSymbol
                          name="car.fill"
                          md="directions-car"
                          size={28}
                          color={Brand.primary}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <ThemedText style={styles.rideDate}>
                          {ride.date}
                        </ThemedText>
                        <ThemedText style={styles.rideDestination}>
                          {ride.destination}
                        </ThemedText>
                        <ThemedText style={styles.rideAddress}>
                          {ride.address}
                        </ThemedText>
                      </View>
                      <View style={styles.rideStatusCompleted}>
                        <IconSymbol
                          name="checkmark.seal.fill"
                          md="verified"
                          size={24}
                          color={Brand.primary}
                        />
                      </View>
                    </View>
                    <ThemedText style={styles.ridePrice}>
                      {ride.price}
                    </ThemedText>
                  </View>
                ))}
              </View>
            ),
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 8,
  },
  backButton: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "600",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  tabNavigation: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  navTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
  },
  activeNavTab: {
    borderBottomWidth: 3,
    borderBottomColor: Brand.primary,
  },
  navTabText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },
  activeNavTabText: {
    color: Brand.primary,
    fontWeight: "600",
  },
  locationSection: {
    marginBottom: 24,
    gap: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "rgba(39, 214, 155, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#FFF",
    fontSize: 14,
    fontFamily: Fonts.rounded,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 0,
  },
  suggestedSection: {
    marginBottom: 32,
  },
  locationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(39, 214, 155, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  locationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: "#999",
  },
  distance: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: Brand.primary,
  },
  tabText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFF",
    fontWeight: "600",
  },
  ridesSection: {
    marginBottom: 32,
  },
  rideItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  rideIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(39, 214, 155, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  rideStatusCompleted: {
    justifyContent: "center",
    alignItems: "center",
  },
  rideDate: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
  rideDestination: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 4,
  },
  rideAddress: {
    fontSize: 13,
    color: "#999",
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginTop: 8,
  },
  monthHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    minHeight: 500,
    marginVertical: 40,
  },
  emptyStateIcon: {
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyStateMessage: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  scheduleButton: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Brand.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  scheduleButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A2E",
  },
});
