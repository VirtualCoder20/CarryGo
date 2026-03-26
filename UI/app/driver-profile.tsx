import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface DriverProfile {
  id: string;
  name: string;
  rating: number;
  trips: number;
  experience: number;
  vehicle: string;
  licensePlate: string;
  bio: string;
  image: string;
  verified: boolean;
  backgroundCheck: string;
  insurance: string;
}

export default function DriverProfileScreen() {
  const router = useRouter();
  const { 
    driverId, 
    driverName, 
    driverRating, 
    vehicle, 
    image 
  } = useLocalSearchParams<{
    driverId: string;
    driverName: string;
    driverRating: string;
    vehicle: string;
    image: string;
  }>();

  const [isTrustedPartner, setIsTrustedPartner] = useState(false);

  const driverProfile: DriverProfile = {
    id: driverId || "1",
    name: driverName || "Akin Ade",
    rating: parseFloat(driverRating || "4.9"),
    trips: 2400,
    experience: 6,
    vehicle: vehicle || "Tesla Model 3",
    licensePlate: "LAG-123-XY",
    bio: "Expert driver with 6 years experience in premium logistics and city transport. Passionate about safety and timely arrivals. Fluent in English and Spanish.",
    image: image || "https://via.placeholder.com/200",
    verified: true,
    backgroundCheck: "Oct 2023",
    insurance: "Full Commercial Insurance Coverage",
  };

  const vehicleImages = [
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${driverProfile.name} - Rated ${driverProfile.rating}⭐ on CarryGo`,
      });
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleRequestRide = () => {
    router.push({
      pathname: "/booking-confirmation",
      params: {
        driverId: driverProfile.id,
        driverName: driverProfile.name,
        driverRating: driverProfile.rating.toString(),
        vehicle: driverProfile.vehicle,
      },
    });
  };

  const handleMessage = () => {
    console.log("Message driver:", driverProfile.name);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
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
          <ThemedText style={styles.headerTitle}>Driver Profile</ThemedText>
          <Pressable onPress={handleShare} style={styles.shareButton}>
            <IconSymbol
              name="square.and.arrow.up"
              md="share"
              size={24}
              color="#FFF"
            />
          </Pressable>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: driverProfile.image }}
              style={styles.profileImage}
            />
            <View style={styles.verifiedBadge}>
              <IconSymbol
                name="checkmark.circle.fill"
                md="check-circle"
                size={24}
                color={Brand.primary}
              />
            </View>
          </View>

          <ThemedText style={styles.driverName}>{driverProfile.name}</ThemedText>
          <View style={styles.verifiedProBadge}>
            <IconSymbol
              name="checkmark.seal.fill"
              md="verified"
              size={14}
              color={Brand.primary}
            />
            <ThemedText style={styles.verifiedProText}>
              CARRYGO VERIFIED PRO
            </ThemedText>
          </View>
        </View>

        {/* Ride Buddy Section */}
        <View style={styles.rideBuddySection}>
          <View style={styles.rideBuddyContent}>
            <View style={styles.rideBuddyIcon}>
              <IconSymbol
                name="heart.circle"
                md="favorite"
                size={24}
                color={Brand.primary}
              />
            </View>
            <View>
              <ThemedText style={styles.rideBuddyTitle}>Ride Buddy</ThemedText>
              <ThemedText style={styles.rideBuddySubtitle}>
                Mark as trusted partner
              </ThemedText>
            </View>
          </View>
          <Pressable
            style={[styles.toggle, isTrustedPartner && styles.toggleActive]}
            onPress={() => setIsTrustedPartner(!isTrustedPartner)}
          >
            <View
              style={[
                styles.toggleThumb,
                isTrustedPartner && styles.toggleThumbActive,
              ]}
            />
          </Pressable>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <IconSymbol
                name="star.fill"
                md="star"
                size={20}
                color={Brand.primary}
              />
            </View>
            <ThemedText style={styles.statValue}>
              {driverProfile.rating}
            </ThemedText>
            <ThemedText style={styles.statLabel}>RATING</ThemedText>
          </View>

          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>{driverProfile.trips / 1000}k</ThemedText>
            <ThemedText style={styles.statLabel}>TRIPS</ThemedText>
          </View>

          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>{driverProfile.experience}yrs</ThemedText>
            <ThemedText style={styles.statLabel}>EXP.</ThemedText>
          </View>
        </View>

        {/* Vehicle Details Section */}
        <View style={styles.vehicleSection}>
          <View style={styles.vehicleHeader}>
            <ThemedText style={styles.vehicleTitle}>Vehicle Details</ThemedText>
            <ThemedText style={styles.vehicleModel}>{driverProfile.vehicle.toUpperCase()}</ThemedText>
          </View>

          <View style={styles.vehicleGrid}>
            {vehicleImages.map((img, index) => (
              <Pressable key={index} style={styles.vehicleImageWrapper}>
                <Image source={{ uri: img }} style={styles.vehicleImage} />
                {index === vehicleImages.length - 1 && (
                  <View style={styles.moreOverlay}>
                    <ThemedText style={styles.moreText}>+2 More</ThemedText>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <ThemedText style={styles.aboutTitle}>About {driverProfile.name.split(" ")[0]}</ThemedText>
          <ThemedText style={styles.aboutText}>{driverProfile.bio}</ThemedText>
        </View>

        {/* Verification Section */}
        <View style={styles.verificationSection}>
          <View style={styles.verificationItem}>
            <IconSymbol
              name="checkmark.circle.fill"
              md="check-circle"
              size={24}
              color={Brand.primary}
            />
            <ThemedText style={styles.verificationText}>
              Background check cleared {driverProfile.backgroundCheck}
            </ThemedText>
          </View>

          <View style={styles.verificationItem}>
            <IconSymbol
              name="checkmark.circle.fill"
              md="check-circle"
              size={24}
              color={Brand.primary}
            />
            <ThemedText style={styles.verificationText}>
              {driverProfile.insurance}
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <Pressable style={styles.requestRideButton} onPress={handleRequestRide}>
          <IconSymbol
            name="car.fill"
            md="directions-car"
            size={20}
            color={Brand.navy}
          />
          <ThemedText style={styles.requestRideText}>Request Ride</ThemedText>
        </Pressable>
        <Pressable style={styles.messageButton} onPress={handleMessage}>
          <IconSymbol
            name="message.fill"
            md="chat"
            size={20}
            color="#FFF"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
    paddingTop: 42
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  shareButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 12,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: Brand.primary,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Brand.navy,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Brand.navy,
  },
  driverName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  verifiedProBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  verifiedProText: {
    fontSize: 12,
    fontWeight: "700",
    color: Brand.primary,
    letterSpacing: 0.5,
  },
  rideBuddySection: {
    marginHorizontal: 16,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
  },
  rideBuddyContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  rideBuddyIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(39, 214, 155, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  rideBuddyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 2,
  },
  rideBuddySubtitle: {
    fontSize: 12,
    color: "#999",
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: Brand.primary,
    borderColor: Brand.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  statIcon: {
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
  },
  vehicleSection: {
    marginHorizontal: 16,
    marginBottom: 32,
    gap: 16,
  },
  vehicleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
  },
  vehicleModel: {
    fontSize: 12,
    fontWeight: "700",
    color: Brand.primary,
    letterSpacing: 0.5,
  },
  vehicleGrid: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  vehicleImageWrapper: {
    flex: 1,
    minWidth: "48%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  vehicleImage: {
    width: "100%",
    height: "100%",
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
  aboutSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#999",
  },
  verificationSection: {
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  verificationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
  },
  verificationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Brand.navy,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  requestRideButton: {
    flex: 1,
    backgroundColor: Brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  requestRideText: {
    fontSize: 14,
    fontWeight: "700",
    color: Brand.navy,
    fontFamily: Fonts.rounded,
  },
  messageButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
