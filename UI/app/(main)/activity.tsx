import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface Location {
  id: string;
  name: string;
  address: string;
  distance: string;
  icon: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  const suggestedLocations: Location[] = [
    {
      id: "1",
      name: "Interswitch Building",
      address: "Oko-Awo Cl, Victoria Island",
      distance: "5.6 km",
      icon: "building",
    },
    {
      id: "2",
      name: "Lagos State Secretariat, Alausa",
      address: "Obafemi Awolowo Way, Ikeja",
      distance: "8.7 km",
      icon: "building",
    },
    {
      id: "3",
      name: "Murtala Muhammed Airport",
      address: "Airport Road, Ikeja",
      distance: "5.0 km",
      icon: "airplane",
    },
    {
      id: "4",
      name: "IHS Towers",
      address: "Ideju St, Eti-Osa, Lagos Island",
      distance: "5.6 km",
      icon: "building",
    },
    {
      id: "5",
      name: "Computer Village Ikeja",
      address: "29/31 Obafemi Awolowo Way, Ikeja",
      distance: "2.9 km",
      icon: "building",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: Brand.navy }}
      contentContainerStyle={{ paddingBottom: 40, gap: 16, paddingTop: 40 }}
    >
      <View style={styles.content}>
        {/* Page Title */}
        <View style={styles.header}>
          {/* <Pressable>
            <IconSymbol
              name="arrow.left"
              md="arrow-back"
              size={24}
              color="#FFF"
            />
          </Pressable> */}
          <ThemedText style={styles.pageTitle}>Find a Ride</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {/* Location Inputs */}
        <View style={styles.locationSection}>
          {/* Pickup Location */}
          <View style={styles.inputContainer}>
            <View style={styles.iconWrapper}>
              <IconSymbol
                name="mappin"
                md="location-on"
                size={20}
                color={Brand.primary}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter pick-up location"
              placeholderTextColor="#888"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>

          {/* Swap Button */}
          {/* <Pressable style={styles.swapButton}>
          <IconSymbol
            name="arrow.up.arrow.down"
            md="swap-vert"
            size={20}
            color={Brand.primary}
          />
        </Pressable> */}

          {/* Dropoff Location */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(220, 38, 38, 0.15)" },
              ]}
            >
              <IconSymbol
                name="mappin"
                md="location-on"
                size={20}
                color="#dc2626"
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="e.g. Lekki Phase 1"
              placeholderTextColor="#888"
              value={dropoffLocation}
              onChangeText={setDropoffLocation}
            />
          </View>
        </View>

        {/* Suggested Locations */}
        <View style={styles.suggestedSection}>
          <FlatList
            data={suggestedLocations}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable
                style={styles.locationItem}
                onPress={() => {
                  router.push({
                    pathname: "/search-results",
                    params: {
                      from: pickupLocation || "Current Location",
                      to: item.name,
                    },
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    gap: 12,
                  }}
                >
                  <View style={styles.locationIcon}>
                    <IconSymbol
                      name={item.icon === "airplane" ? "airplane" : "building"}
                      md="location-city"
                      size={24}
                      color={"#FFF"}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ThemedText style={styles.locationName}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={styles.locationAddress}>
                      {item.address}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.distance}>{item.distance}</ThemedText>
              </Pressable>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});
