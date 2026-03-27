import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface Driver {
  id: string;
  name: string;
  rating: number;
  vehicle: string;
  distance: string;
  price: string;
  matchPercentage: number;
  badges: string[];
  image: string;
}

type SortOption = "best-match" | "cheapest" | "fastest";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Best Match", value: "best-match" },
  { label: "Cheapest", value: "cheapest" },
  { label: "Fastest", value: "fastest" },
];

const FILTER_TAGS = ["95%+ Match", "Gold Driver", "AC", "Toyota"];

// Memoized Tab Component
const TabBar = React.memo(({
  activeTab,
  onTabPress,
}: {
  activeTab: SortOption;
  onTabPress: (tab: SortOption) => void;
}) => (
  <View style={styles.tabsContainer}>
    {SORT_OPTIONS.map(({ label, value }) => (
      <Pressable
        key={value}
        style={[styles.tab, activeTab === value && styles.activeTab]}
        onPress={() => onTabPress(value)}
      >
        <ThemedText
          style={[
            styles.tabText,
            activeTab === value && styles.activeTabText,
          ]}
        >
          {label}
        </ThemedText>
      </Pressable>
    ))}
  </View>
));

TabBar.displayName = "TabBar";

// Memoized Filter Tags Component
const FilterTags = React.memo(() => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.filterScroll}
    contentContainerStyle={styles.filterContent}
  >
    {FILTER_TAGS.map((tag, index) => (
      <View key={index} style={styles.filterTag}>
        <ThemedText style={styles.filterTagText}>{tag}</ThemedText>
      </View>
    ))}
  </ScrollView>
));

FilterTags.displayName = "FilterTags";

// Memoized Driver Card Component
const DriverCard = React.memo(({ driver, onBookPress, onDetailsPress }: {
  driver: Driver;
  onBookPress: (driver: Driver) => void;
  onDetailsPress: (driver: Driver) => void;
}) => (
  <View style={styles.driverCard}>
    <View style={styles.driverHeader}>
      <View style={styles.driverInfo}>
        <Image
          source={{ uri: driver.image }}
          style={styles.driverImage}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.nameRatingContainer}>
            <ThemedText style={styles.driverName}>{driver.name}</ThemedText>
            <View style={styles.rating}>
              <IconSymbol
                name="star.fill"
                md="star"
                size={14}
                color="#FCD34D"
              />
              <ThemedText style={styles.ratingText}>
                {driver.rating}
              </ThemedText>
            </View>
          </View>
          <ThemedText style={styles.vehicleInfo}>
            {driver.vehicle}
          </ThemedText>
        </View>
      </View>

      <View style={styles.priceSection}>
        <ThemedText style={styles.price}>{driver.price}</ThemedText>
        <ThemedText style={styles.matchPercent}>
          {driver.matchPercentage}%
        </ThemedText>
        <ThemedText style={styles.matchLabel}>MATCH</ThemedText>
      </View>
    </View>

    <View style={styles.badgesContainer}>
      {driver.badges.map((badge, index) => (
        <View key={index} style={styles.badge}>
          <ThemedText style={styles.badgeText}>{badge}</ThemedText>
        </View>
      ))}
    </View>

    <View style={styles.buttonContainer}>
      <Pressable 
        style={styles.bookButton}
        onPress={() => onBookPress(driver)}
      >
        <ThemedText style={styles.bookButtonText}>Book Ride</ThemedText>
      </Pressable>
      <Pressable 
        style={styles.detailsButton}
        onPress={() => onDetailsPress(driver)}
      >
        <IconSymbol
          name="square.and.pencil"
          md="message"
          size={20}
          color="#FFF"
        />
      </Pressable>
    </View>
  </View>
));

DriverCard.displayName = "DriverCard";

// Header Component
const SearchHeader = React.memo(({ from, to, onFilterPress }: {
  from?: string;
  to?: string;
  onFilterPress: () => void;
}) => {
  const router = useRouter();

  return (
    <View style={styles.headerSection}>
      <View style={styles.headerTop}>
        <Pressable onPress={() => router.back()}>
          <IconSymbol
            name="arrow.left"
            md="arrow-back"
            size={24}
            color="#FFF"
          />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <ThemedText style={styles.headerTitle}>Search Results</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            {from} → {to}
          </ThemedText>
        </View>
        <Pressable onPress={onFilterPress}>
          <IconSymbol
            name="line.3.horizontal.decrease.circle"
            md="tune"
            size={24}
            color="#FFF"
          />
        </Pressable>
      </View>
    </View>
  );
});

SearchHeader.displayName = "SearchHeader";

export default function SearchResultsScreen() {
  const router = useRouter();
  const { from, to } = useLocalSearchParams<{ from?: string; to?: string }>();
  const [activeTab, setActiveTab] = useState<SortOption>("best-match");

  const drivers: Driver[] = [
    {
      id: "1",
      name: "Akin",
      rating: 4.9,
      vehicle: "Toyota Corolla • 2 mins away",
      distance: "2 mins away",
      price: "₦4,500",
      matchPercentage: 95,
      badges: ["GOLD DRIVER", "PUNCTUAL"],
      image: "https://via.placeholder.com/60",
    },
    {
      id: "2",
      name: "Chidimma",
      rating: 4.8,
      vehicle: "Honda Civic • 5 mins away",
      distance: "5 mins away",
      price: "₦3,800",
      matchPercentage: 88,
      badges: ["PUNCTUAL"],
      image: "https://via.placeholder.com/60",
    },
    {
      id: "3",
      name: "Olu",
      rating: 4.7,
      vehicle: "Lexus ES 350 • 8 mins away",
      distance: "8 mins away",
      price: "₦5,200",
      matchPercentage: 72,
      badges: ["GOLD DRIVER"],
      image: "https://via.placeholder.com/60",
    },
  ];

  const sortedDrivers = useMemo(() => {
    const sorted = [...drivers];
    if (activeTab === "cheapest") {
      sorted.sort((a, b) => 
        parseInt(a.price.replace(/[^\d]/g, "")) - 
        parseInt(b.price.replace(/[^\d]/g, ""))
      );
    } else if (activeTab === "fastest") {
      sorted.sort((a, b) => 
        parseInt(a.distance) - parseInt(b.distance)
      );
    }
    return sorted;
  }, [activeTab]);

  const handleTabChange = useCallback((tab: SortOption) => {
    setActiveTab(tab);
  }, []);

  const handleBookPress = useCallback((driver: Driver) => {
    router.push({
      pathname: "/booking-confirmation",
      params: {
        rideId: driver.id,
        driverName: driver.name,
        driverRating: driver.rating.toString(),
        vehicle: driver.vehicle.split("•")[0].trim(),
        price: driver.price,
        image: driver.image,
        pickupLocation: encodeURIComponent(from || ""),
        destination: encodeURIComponent(to || ""),
        estimatedTime: driver.distance,
        licensePlate: "LAG-123-XY",
      },
    });
  }, [router, from, to]);

  const handleDetailsPress = useCallback((driver: Driver) => {
    router.push({
      pathname: "/driver-profile",
      params: {
        driverId: driver.id,
        driverName: driver.name,
        driverRating: driver.rating.toString(),
        vehicle: driver.vehicle.split("•")[0].trim(),
        image: driver.image,
      },
    });
  }, [router]);

  const handleFilterPress = useCallback(() => {
    console.log("Filter pressed");
  }, []);

  return (
    <View style={styles.container}>
      <SearchHeader 
        from={from} 
        to={to} 
        onFilterPress={handleFilterPress}
      />

      <TabBar 
        activeTab={activeTab} 
        onTabPress={handleTabChange}
      />

      <FilterTags />

      <FlatList
        data={sortedDrivers}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <DriverCard
            driver={item}
            onBookPress={handleBookPress}
            onDetailsPress={handleDetailsPress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
    paddingTop: 40
  },
  headerSection: {
    backgroundColor: Brand.navy,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: Brand.primary,
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFF",
    fontWeight: "600",
  },
  filterScroll: {
    paddingHorizontal: 18
  },
  filterContent: {
    gap: 8,
  },
  filterTag: {
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 1)",
    backgroundColor: "rgba(30, 41, 59, 1)",
  },
  filterTagText: {
    fontSize: 12,
    color: "rgba(203, 213, 225, 1)",
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    paddingBottom: 100,
  },
  driverCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    gap: 12,
  },
  driverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  driverInfo: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  driverImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  nameRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    color: "#FCD34D",
    fontWeight: "600",
  },
  vehicleInfo: {
    fontSize: 13,
    color: "#999",
    marginBottom: 2,
  },
  priceSection: {
    alignItems: "flex-end",
    gap: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  matchPercent: {
    fontSize: 14,
    color: Brand.primary,
    fontWeight: "600",
  },
  matchLabel: {
    fontSize: 11,
    color: Brand.primary,
    fontWeight: "600",
  },
  badgesContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 10,
    // paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Brand.primary,
    backgroundColor: "rgba(39, 214, 155, 0.15)",
  },
  badgeText: {
    fontSize: 11,
    color: Brand.primary,
    fontWeight: "700",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  bookButton: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: Brand.navy,
    fontFamily: Fonts.rounded,
  },
  detailsButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
