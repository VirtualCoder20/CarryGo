import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { Brand, Fonts } from "@/constants/theme";
import { DrawerSidebar } from "@/components/drawer-sidebar";
import { LiveTrafficMap } from "@/components/live-traffic-map";
import { IconSymbol } from "./ui/icon-symbol";

interface Route {
  from: string;
  to: string;
  time: string;
  icon?: string;
  traffic: string;
}

export default function CommuterDashboard() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const savedRoutes: Route[] = [
    {
      from: "Yaba",
      to: "VI",
      time: "25 mins",
      icon: "home",
      traffic: "High Traffic",
    },
    {
      from: "Lekki",
      to: "Ikeja",
      time: "45 mins",
      icon: "work",
      traffic: "Moderate",
    },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Brand.navy }}
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 40 }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(39, 214, 155, 0.2)",
                borderWidth: 2,
                borderColor: Brand.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconSymbol
                md="directions-car"
                name="car.fill"
                size={32}
                color={Brand.primary}
              />
            </View>
            <ThemedText
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#FFF",
                fontFamily: Fonts.rounded,
              }}
            >
              CarryGo
            </ThemedText>
          </View>
        </View>

        <Pressable
          style={{
            padding: 8,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <IconSymbol
            md="notifications"
            name="bell"
            size={32}
            color={Brand.primary}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 16,
          gap: 12,
          marginVertical: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 28,
          borderCurve: "continuous",
        }}
      >
        <IconSymbol
          md="search"
          name="magnifyingglass"
          size={20}
          color={Brand.primary}
        />
        <ThemedText
          style={{
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.5)",
            fontFamily: Fonts.rounded,
          }}
        >
          Where to?
        </ThemedText>
      </View>

      {/* Map Section */}
      <LiveTrafficMap />

      {/* Service Options */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 16,
          marginVertical: 20,
          gap: 16,
        }}
      >
        <Pressable style={styles.serviceCard}>
          <IconSymbol
            md="directions-car"
            name="car.fill"
            size={32}
            color={Brand.primary}
          />
          <ThemedText style={styles.serviceLabel}>Ride</ThemedText>
        </Pressable>
        <Pressable style={styles.serviceCard}>
          <IconSymbol
            md="local-shipping"
            name="cube"
            size={32}
            color={Brand.primary}
          />
          <ThemedText style={styles.serviceLabel}>Delivery</ThemedText>
        </Pressable>
        <Pressable style={styles.serviceCard}>
          <IconSymbol
            md="schedule"
            name="clock"
            size={32}
            color={Brand.primary}
          />
          <ThemedText style={styles.serviceLabel}>Reserve</ThemedText>
        </Pressable>
      </View>

      {/* Saved Routes Section */}
      <View style={{ marginHorizontal: 16, marginTop: 20, marginBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
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
            Saved Routes
          </ThemedText>
          <Pressable onPress={() => router.push("/ride-history")}>
            <ThemedText
              style={{
                fontSize: 14,
                color: Brand.primary,
                fontFamily: Fonts.rounded,
                fontWeight: "500",
              }}
            >
              See all
            </ThemedText>
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          {savedRoutes.map((route, index) => (
            <Pressable
              key={index}
              style={[styles.routeCard, index === 0 && styles.routeCardFirst]}
            >
              <View style={{ alignItems: "center" }}>
                <IconSymbol
                  md={route.icon === "home" ? "home" : "work"}
                  name={route.icon === "home" ? "house.fill" : "briefcase.fill"}
                  size={28}
                  color={Brand.primary}
                  style={{ marginBottom: 8 }}
                />
                <ThemedText
                  selectable
                  style={{
                    fontSize: 14,
                    color: "#FFF",
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: 4,
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {route.from} → {route.to}
                </ThemedText>
                <ThemedText
                  selectable
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.6)",
                    textAlign: "center",
                    fontFamily: Fonts.rounded,
                    fontVariant: ["tabular-nums"],
                  }}
                >
                  {route.time} • {route.traffic}
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Recent Trips Section */}
      <View style={{ marginHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
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
            Recent Trips
          </ThemedText>
        </View>
        <ThemedText
          style={{
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.5)",
            textAlign: "center",
            paddingVertical: 24,
            fontFamily: Fonts.rounded,
          }}
        >
          No recent trips
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  serviceCard: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: "rgba(39, 214, 155, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceLabel: {
    fontSize: 12,
    color: "#FFF",
    fontFamily: Fonts.rounded,
    fontWeight: "500",
  },
  routeCard: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    minHeight: 120,
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  routeCardFirst: {
    backgroundColor: "rgba(39, 214, 155, 0.1)",
    borderColor: "rgba(39, 214, 155, 0.3)",
  },
});
