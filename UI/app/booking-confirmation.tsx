import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface RideData {
  id: string;
  name: string;
  rating: number;
  vehicle: string;
  price: string;
  matchPercentage: number;
  image: string;
  pickupLocation: string;
  destination: string;
  estimatedTime: string;
  licensePlate: string;
}

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { rideId, driverName, driverRating, vehicle, price, image, pickupLocation, destination, estimatedTime, licensePlate } = 
    useLocalSearchParams<{
      rideId: string;
      driverName: string;
      driverRating: string;
      vehicle: string;
      price: string;
      image: string;
      pickupLocation: string;
      destination: string;
      estimatedTime: string;
      licensePlate: string;
    }>();

  const [paymentMethod] = useState("Interswitch");

  const rideData: RideData = {
    id: rideId || "1",
    name: driverName || "Akin",
    rating: parseFloat(driverRating || "4.9"),
    vehicle: vehicle || "Toyota Corolla",
    price: price || "₦4,500",
    matchPercentage: 95,
    image: image || "https://via.placeholder.com/60",
    pickupLocation: decodeURIComponent(pickupLocation || "123 Victoria Island, Lagos"),
    destination: decodeURIComponent(destination || "Murtala Muhammed Int'l Airport"),
    estimatedTime: estimatedTime || "4 - 6 mins",
    licensePlate: licensePlate || "LAG-123-XY",
  };

  const handleConfirmRide = () => {
    // Handle ride confirmation
    console.log("Ride confirmed:", rideData.id);
    // Navigate to ride in progress or success screen
  };

  const handleChangePayment = () => {
    // Handle payment method change
    console.log("Change payment method");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Brand.navy }}
      contentContainerStyle={{ paddingBottom: 120, paddingTop: 40 }}
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
        <ThemedText style={styles.pageTitle}>Booking Confirmation</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {/* Ride Summary Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Ride Summary</ThemedText>

        {/* Selected Ride Card */}
        <View style={styles.selectedRideCard}>
          <View style={styles.rideCardContent}>
            <ThemedText style={styles.selectedRideLabel}>SELECTED RIDE</ThemedText>
            <ThemedText style={styles.vehicleName}>{rideData.vehicle}</ThemedText>
            <ThemedText style={styles.vehicleDetails}>
              Standard Sedan • {rideData.licensePlate}
            </ThemedText>
          </View>
          <Image
            source={{ uri: rideData.image }}
            style={styles.vehicleImage}
          />
        </View>

        {/* Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationItem}>
            <View style={styles.locationIconWrapper}>
              <IconSymbol
                name="mappin"
                md="location-on"
                size={24}
                color={Brand.primary}
              />
            </View>
            <View style={styles.locationContent}>
              <ThemedText style={styles.locationTitle}>Pickup Location</ThemedText>
              <ThemedText style={styles.locationAddress}>
                {rideData.pickupLocation}
              </ThemedText>
            </View>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.locationItem}>
            <View style={styles.destinationIconWrapper}>
              <ThemedText style={styles.destinationIcon}>A</ThemedText>
            </View>
            <View style={styles.locationContent}>
              <ThemedText style={styles.locationTitle}>Destination</ThemedText>
              <ThemedText style={styles.locationAddress}>
                {rideData.destination}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Info Cards Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <IconSymbol
              name="clock"
              md="access-time"
              size={24}
              color={Brand.primary}
            />
            <ThemedText style={styles.infoLabel}>EST. PICKUP</ThemedText>
            <ThemedText style={styles.infoValue}>{rideData.estimatedTime}</ThemedText>
          </View>

          <View style={styles.infoCard}>
            <IconSymbol
              name="star.fill"
              md="star"
              size={24}
              color={Brand.primary}
            />
            <ThemedText style={styles.infoLabel}>DRIVER RATING</ThemedText>
            <ThemedText style={styles.infoValue}>{rideData.rating} (2k+)</ThemedText>
          </View>
        </View>
      </View>

      {/* Cost and Payment Section */}
      <View style={styles.section}>
        {/* Final Cost Card */}
        <View style={styles.costCard}>
          <View>
            <ThemedText style={styles.costLabel}>Final Cost</ThemedText>
            <ThemedText style={styles.costValue}>{rideData.price}</ThemedText>
          </View>
          <ThemedText style={styles.vatLabel}>INCLUSIVE OF VAT</ThemedText>
        </View>

        {/* Payment Method Card */}
        <View style={styles.paymentCard}>
          <View style={styles.paymentContent}>
            <View style={styles.paymentIconWrapper}>
              <IconSymbol
                name="square.and.pencil"
                md="payment"
                size={24}
                color={Brand.primary}
              />
            </View>
            <View style={styles.paymentInfo}>
              <ThemedText style={styles.paymentMethod}>{paymentMethod}</ThemedText>
              <ThemedText style={styles.secureLabelPayment}>SecurePayment Enabled</ThemedText>
            </View>
          </View>
          <Pressable onPress={handleChangePayment}>
            <ThemedText style={styles.changeButton}>CHANGE</ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Confirm Button */}
      <View style={styles.buttonSection}>
        <Pressable
          style={styles.confirmButton}
          onPress={handleConfirmRide}
        >
          <IconSymbol
            name="checkmark.circle.fill"
            md="check-circle"
            size={24}
            color={Brand.navy}
          />
          <ThemedText style={styles.confirmButtonText}>Confirm Ride</ThemedText>
        </Pressable>

        <ThemedText style={styles.cancelText}>CANCEL FOR FREE WITHIN 2 MINUTES</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 16,
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
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 12,
  },
  selectedRideCard: {
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    marginBottom: 12,
  },
  rideCardContent: {
    flex: 1,
  },
  selectedRideLabel: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: "#999",
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 4,
  },
  vehicleDetails: {
    fontSize: 13,
    color: "#999",
  },
  vehicleImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  locationCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: "row" as const,
    marginBottom: 12,
    alignItems: "flex-start" as const,
  },
  locationIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(39, 214, 155, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  destinationIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Brand.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  destinationIcon: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Brand.navy,
  },
  locationContent: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: "#999",
  },
  verticalDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row" as const,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: "#999",
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFF",
    textAlign: "center" as const,
    marginTop: 4,
  },
  costCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
  },
  costValue: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  vatLabel: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500" as const,
  },
  paymentCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentContent: {
    flexDirection: "row" as const,
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  paymentIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 2,
  },
  secureLabelPayment: {
    fontSize: 12,
    color: "#999",
  },
  changeButton: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Brand.primary,
  },
  buttonSection: {
    paddingHorizontal: 16,
  },
  confirmButton: {
    backgroundColor: Brand.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row" as const,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Brand.navy,
    fontFamily: Fonts.rounded,
    marginLeft: 10,
  },
  cancelText: {
    fontSize: 11,
    color: "#666",
    textAlign: "center" as const,
    fontWeight: "500" as const,
  },
});
