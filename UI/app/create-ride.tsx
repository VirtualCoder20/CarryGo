import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface CreateRideForm {
  pickupLocation: string;
  destination: string;
  time: string;
  seats: string;
  pricePerSeat: string;
  recurringRide: boolean;
}

export default function CreateRideScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateRideForm>({
    pickupLocation: "",
    destination: "",
    time: "",
    seats: "",
    pricePerSeat: "",
    recurringRide: false,
  });

  const seatOptions = ["1", "2", "3", "4", "5", "6"];
  const [showSeatDropdown, setShowSeatDropdown] = useState(false);

  const handleCreateRide = () => {
    // Validate form
    if (
      !formData.pickupLocation ||
      !formData.destination ||
      !formData.time ||
      !formData.seats ||
      !formData.pricePerSeat
    ) {
      alert("Please fill in all required fields");
      return;
    }
    console.log("Creating ride:", formData);
    // Navigate back or to success screen
    router.back();
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
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.pageTitle}>Create A Ride</ThemedText>
            <ThemedText style={styles.subtitle}>
              Fill in the details to publish your trip.
            </ThemedText>
          </View>
        </View>

        {/* Pick-up Point */}
        <View style={styles.formSection}>
          <ThemedText style={styles.label}>Pick-up Point</ThemedText>
          <View style={styles.inputContainer}>
            <IconSymbol
              name="location.fill"
              md="location-on"
              size={20}
              color={Brand.primary}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter pick-up location"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={formData.pickupLocation}
              onChangeText={(text) =>
                setFormData({ ...formData, pickupLocation: text })
              }
            />
          </View>
        </View>

        {/* Destination */}
        <View style={styles.formSection}>
          <ThemedText style={styles.label}>Destination</ThemedText>
          <View style={styles.inputContainer}>
            <IconSymbol
              name="mappin.and.ellipse"
              md="location-on"
              size={20}
              color="#FF6B6B"
            />
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Lekki Phase 1"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={formData.destination}
              onChangeText={(text) =>
                setFormData({ ...formData, destination: text })
              }
            />
          </View>
        </View>

        {/* Time and Seats Row */}
        <View style={styles.rowContainer}>
          {/* Time */}
          <View style={[styles.formSection, { flex: 1, marginRight: 12 }]}>
            <ThemedText style={styles.label}>Time</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol
                name="clock.fill"
                md="access-time"
                size={20}
                color="rgba(255, 255, 255, 0.5)"
              />
              <TextInput
                style={styles.textInput}
                placeholder="-- : --"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={formData.time}
                onChangeText={(text) =>
                  setFormData({ ...formData, time: text })
                }
              />
            </View>
          </View>

          {/* Seats */}
          <View style={[styles.formSection, { flex: 1 }]}>
            <ThemedText style={styles.label}>Seats</ThemedText>
            <Pressable
              style={styles.inputContainer}
              onPress={() => setShowSeatDropdown(!showSeatDropdown)}
            >
              <IconSymbol
                name="person.fill"
                md="person"
                size={20}
                color="rgba(255, 255, 255, 0.5)"
              />
              <ThemedText
                style={[
                  styles.textInput,
                  {
                    paddingVertical: 0,
                    color: formData.seats
                      ? "#FFF"
                      : "rgba(255, 255, 255, 0.4)",
                  },
                ]}
              >
                {formData.seats || "Seat"}
              </ThemedText>
              <IconSymbol
                name="chevron.down"
                md="expand-more"
                size={20}
                color="rgba(255, 255, 255, 0.5)"
              />
            </Pressable>

            {/* Seats Dropdown */}
            {showSeatDropdown && (
              <View style={styles.dropdown}>
                {seatOptions.map((option) => (
                  <Pressable
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFormData({ ...formData, seats: option });
                      setShowSeatDropdown(false);
                    }}
                  >
                    <ThemedText style={styles.dropdownItemText}>
                      {option}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Price per seat */}
        <View style={styles.formSection}>
          <ThemedText style={styles.label}>Price per seat</ThemedText>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.currencySymbol}>₦</ThemedText>
            <TextInput
              style={styles.textInput}
              placeholder="0.0"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              keyboardType="decimal-pad"
              value={formData.pricePerSeat}
              onChangeText={(text) =>
                setFormData({ ...formData, pricePerSeat: text })
              }
            />
          </View>
        </View>

        {/* Recurring Ride */}
        <View style={styles.recurringContainer}>
          <View>
            <ThemedText style={styles.recurringTitle}>Recurring Ride</ThemedText>
            <ThemedText style={styles.recurringSubtitle}>
              Repeat this trip daily
            </ThemedText>
          </View>
          <Switch
            value={formData.recurringRide}
            onValueChange={(value) =>
              setFormData({ ...formData, recurringRide: value })
            }
            trackColor={{ false: "#555", true: Brand.primary }}
            thumbColor="#FFF"
          />
        </View>

        {/* Create Ride Button */}
        <Pressable
          style={styles.createButton}
          onPress={handleCreateRide}
        >
          <ThemedText style={styles.createButtonText}>Create Ride</ThemedText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: Brand.navy,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -8,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: Fonts.rounded,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
    marginBottom: 12,
    fontFamily: Fonts.rounded,
  },
  inputContainer: {
    flexDirection: "row" as const,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFF",
    fontFamily: Fonts.rounded,
    padding: 0,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.6)",
  },
  rowContainer: {
    flexDirection: "row" as const,
    gap: 0,
  },
  dropdown: {
    position: "absolute" as const,
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    zIndex: 10,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  recurringContainer: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 32,
  },
  recurringTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
    marginBottom: 4,
    fontFamily: Fonts.rounded,
  },
  recurringSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: Fonts.rounded,
  },
  createButton: {
    backgroundColor: Brand.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Brand.navy,
    fontFamily: Fonts.rounded,
  },
});
