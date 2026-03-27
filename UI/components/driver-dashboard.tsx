import React from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { Brand, Fonts } from "@/constants/theme";
import { useUser } from "@/contexts/user-context";
import { IconSymbol } from "./ui/icon-symbol";

interface UpcomingTrip {
  status: string;
  time: string;
  pickup: string;
  destination: string;
  passengers: number;
}

export default function DriverDashboard() {
  const router = useRouter();
  const { user } = useUser();

  const upcomingTrip: UpcomingTrip = {
    status: "NEXT SCHEDULED",
    time: "07:30 AM",
    pickup: "Ikorodu",
    destination: "Lekki",
    passengers: 3,
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Brand.navy }}
      contentContainerStyle={{ paddingBottom: 40, gap: 16, paddingTop: 40 }}
    >
      {/* <DrawerSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        isDriver={true}
      /> */}

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 12,
        }}
      >
        {/* Welcome Text */}
        <View>
          <ThemedText
            style={{
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: 1,
              fontFamily: Fonts.rounded,
            }}
          >
            WELCOME BACK, CAPTAIN
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#FFF",
              marginTop: 4,
              fontFamily: Fonts.rounded,
            }}
          >
            Driver Dashboard
          </ThemedText>
        </View>
        <Pressable
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{ fontSize: 16, fontWeight: "bold", color: "#FFF" }}
          >
            {user?.fullName?.slice(0, 2).toUpperCase() || "DM"}
          </ThemedText>
        </Pressable>
      </View>

      {/* Earnings Card */}
      <View
        style={{
          marginHorizontal: 16,
          padding: 20,
          backgroundColor: "rgba(39, 214, 155, 0.1)",
          borderRadius: 16,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: "rgba(39, 214, 155, 0.2)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          gap: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View>
            <ThemedText
              style={{
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: Fonts.rounded,
              }}
            >
              Total Earnings
            </ThemedText>
            <ThemedText
              selectable
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "#FFF",
                marginTop: 4,
                fontFamily: Fonts.rounded,
                fontVariant: ["tabular-nums"],
              }}
            >
              ₦45,000.00
            </ThemedText>
          </View>
          <ThemedText
            selectable
            style={{
              fontSize: 16,
              color: Brand.primary,
              fontWeight: "600",
              fontFamily: Fonts.rounded,
              fontVariant: ["tabular-nums"],
            }}
          >
            +12%
          </ThemedText>
        </View>

        <View
          style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1, gap: 4 }}>
            <ThemedText
              selectable
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#FFF",
                fontFamily: Fonts.rounded,
                fontVariant: ["tabular-nums"],
              }}
            >
              8
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: Fonts.rounded,
              }}
            >
              Trips Today
            </ThemedText>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <ThemedText
              selectable
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#FFF",
                fontFamily: Fonts.rounded,
                fontVariant: ["tabular-nums"],
              }}
            >
              6.5h
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: Fonts.rounded,
              }}
            >
              Hours Active
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Upcoming Trips */}
      <View style={{ marginHorizontal: 16, gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFF",
              fontFamily: Fonts.rounded,
            }}
          >
            Upcoming Trips
          </ThemedText>
          <Pressable onPress={() => router.push("/driver-trip-history")}>
            <ThemedText
              style={{
                fontSize: 14,
                color: Brand.primary,
                fontFamily: Fonts.rounded,
              }}
            >
              View all
            </ThemedText>
          </Pressable>
        </View>

        <View
          style={{
            padding: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 12,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              gap: 8,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: Brand.primary,
              }}
            />
            <ThemedText
              style={{
                fontSize: 12,
                color: Brand.primary,
                fontWeight: "600",
                flex: 1,
                fontFamily: Fonts.rounded,
              }}
            >
              {upcomingTrip.status}
            </ThemedText>
            <ThemedText
              selectable
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#FFF",
                fontFamily: Fonts.rounded,
                fontVariant: ["tabular-nums"],
              }}
            >
              {upcomingTrip.time}
            </ThemedText>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <View style={{ width: 24, alignItems: "center", paddingTop: 4 }}>
              <ThemedText style={{ fontSize: 8, color: Brand.primary }}>
                ●
              </ThemedText>
              <View
                style={{
                  width: 2,
                  height: 24,
                  backgroundColor: "rgba(39, 214, 155, 0.3)",
                  marginVertical: 0,
                  marginLeft: 1,
                }}
              />
              <ThemedText style={{ fontSize: 8, color: Brand.primary }}>
                ●
              </ThemedText>
            </View>
            <View style={{ flex: 1, marginLeft: 12, gap: 4 }}>
              <View>
                <ThemedText
                  style={{
                    fontSize: 10,
                    color: "rgba(255, 255, 255, 0.5)",
                    letterSpacing: 0.5,
                    fontFamily: Fonts.rounded,
                  }}
                >
                  PICKUP
                </ThemedText>
                <ThemedText
                  selectable
                  style={{
                    fontSize: 14,
                    color: "#FFF",
                    fontWeight: "600",
                    marginTop: 2,
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {upcomingTrip.pickup}
                </ThemedText>
              </View>
              <View>
                <ThemedText
                  style={{
                    fontSize: 10,
                    color: "rgba(255, 255, 255, 0.5)",
                    letterSpacing: 0.5,
                    fontFamily: Fonts.rounded,
                  }}
                >
                  DESTINATION
                </ThemedText>
                <ThemedText
                  selectable
                  style={{
                    fontSize: 14,
                    color: "#FFF",
                    fontWeight: "600",
                    marginTop: 2,
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {upcomingTrip.destination}
                </ThemedText>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopColor: "rgba(255, 255, 255, 0.1)",
              borderTopWidth: 1,
              paddingTop: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                {[...Array(Math.min(upcomingTrip.passengers, 3))].map(
                  (_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.passengerAvatar,
                        { marginLeft: i > 0 ? -8 : 0 },
                      ]}
                    >
                      <ThemedText
                        style={{
                          fontSize: 12,
                          color: "#FFF",
                          fontWeight: "bold",
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </ThemedText>
                    </View>
                  ),
                )}
                {upcomingTrip.passengers > 3 && (
                  <View style={[styles.passengerAvatar, { marginLeft: -8 }]}>
                    <ThemedText
                      selectable
                      style={{
                        fontSize: 12,
                        color: "#FFF",
                        fontWeight: "bold",
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      +{upcomingTrip.passengers - 3}
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>
            <Pressable
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 20,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  color: "#FFF",
                  fontWeight: "600",
                  fontFamily: Fonts.rounded,
                }}
              >
                Details
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
          gap: 12,
          justifyContent: "center",
        }}
      >
        <View style={[styles.statCardStyle, { flex: 1 }]}>
          <ThemedText
            style={{
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: 8,
              fontFamily: Fonts.rounded,
            }}
          >
            Rating
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <ThemedText
              selectable
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#FFF",
                fontFamily: Fonts.rounded,
                fontVariant: ["tabular-nums"],
              }}
            >
              4.92
            </ThemedText>
            <IconSymbol
              name="star"
              md="star"
              size={16}
              color="yellow"
              style={{ marginLeft: 4, marginTop: 2 }}
            />
          </View>
        </View>
        <View style={[styles.statCardStyle, { flex: 1 }]}>
          <ThemedText
            style={{
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: 8,
              fontFamily: Fonts.rounded,
            }}
          >
            Acceptance
          </ThemedText>
          <ThemedText
            selectable
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#FFF",
              fontFamily: Fonts.rounded,
              fontVariant: ["tabular-nums"],
            }}
          >
            98%
          </ThemedText>
        </View>
      </View>

      {/* Call to Action Button */}
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        <Pressable
          onPress={() => router.push("/create-ride")}
          style={{
            backgroundColor: Brand.primary,
            paddingVertical: 16,
            borderRadius: 16,
            borderCurve: "continuous",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(39, 214, 155, 0.3)",
          }}
        >
          <ThemedText
            style={{
              fontSize: 16,
              color: Brand.navy,
              fontWeight: "bold",
              fontFamily: Fonts.rounded,
            }}
          >
            Create a New Ride
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  passengerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Brand.navy,
  },
  statCardStyle: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
});
