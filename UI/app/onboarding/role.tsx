import { Brand, Fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useUser } from "@/contexts/user-context";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api";

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [selectedRole, setSelectedRole] = useState<
    "commuter" | "driver" | null
  >(user?.role || null);

  const updateRoleMutation = useMutation({
    mutationFn: (newRole: "commuter" | "driver") =>
      api.user.updateRole(newRole),
    onSuccess: (data) => {
      updateUser(data);
      router.push("/onboarding/profile");
    },
  });

  const handleContinue = () => {
    if (selectedRole) {
      updateRoleMutation.mutate(selectedRole);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol
            name="arrow.left"
            md="arrow-back"
            color="#FFF"
            size={24}
          />
        </Pressable>
        <ThemedText style={styles.headerTitle}>CarryGo</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>How will you use CarryGo?</ThemedText>
        <ThemedText style={styles.subtitle}>
          Choose your role to get started with the best experience.
        </ThemedText>

        <View style={styles.cardsContainer}>
          <Pressable
            style={[
              styles.card,
              selectedRole === "commuter" && styles.activeCard,
            ]}
            onPress={() => setSelectedRole("commuter")}
            disabled={updateRoleMutation.isPending}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <IconSymbol
                  name="person.fill"
                  md="person"
                  color={Brand.primary}
                  size={24}
                />
              </View>
            </View>
            <ThemedText style={styles.cardTitle}>I am a Commuter</ThemedText>
            <ThemedText style={styles.cardDescription}>
              Find affordable, safe rides for your daily travels.
            </ThemedText>
            <View style={styles.imagePlaceholder}>
              <Image 
                source={require('@/assets/images/commuter.png')} 
                style={styles.mockImageContent} 
                contentFit="cover"
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.card,
              selectedRole === "driver" && styles.activeCard,
            ]}
            onPress={() => setSelectedRole("driver")}
            disabled={updateRoleMutation.isPending}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <IconSymbol
                  name="car.fill"
                  md="directions-car"
                  color={Brand.primary}
                  size={24}
                />
              </View>
            </View>
            <ThemedText style={styles.cardTitle}>I am a Driver</ThemedText>
            <ThemedText style={styles.cardDescription}>
              Share your route, reduce costs, and earn while driving.
            </ThemedText>
            <View style={styles.imagePlaceholder}>
              <Image 
                source={require('@/assets/images/driver.png')} 
                style={styles.mockImageContent} 
                contentFit="cover"
              />
            </View>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.continueButton,
            (!selectedRole || updateRoleMutation.isPending) &&
              styles.buttonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole || updateRoleMutation.isPending}
        >
          <ThemedText style={styles.continueText}>
            {updateRoleMutation.isPending ? "Saving..." : "Continue"}
          </ThemedText>
        </Pressable>
        {updateRoleMutation.isError && (
          <ThemedText style={styles.errorText}>
            Failed to save role. Please try again.
          </ThemedText>
        )}
        <ThemedText style={styles.stepIndicator}>STEP 1 OF 4</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 12,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 200,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 12,
    fontFamily: Fonts.rounded,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#AAA",
    marginBottom: 32,
    lineHeight: 22,
  },
  cardsContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeCard: {
    borderColor: Brand.primary,
    backgroundColor: "rgba(39, 214, 155, 0.05)",
  },
  cardHeader: {
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(39, 214, 155, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: "#AAA",
    marginBottom: 20,
    lineHeight: 20,
  },
  imagePlaceholder: {
    height: 140,
    borderRadius: 16,
    backgroundColor: "#EEE",
    overflow: "hidden",
  },
  mockImageContent: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: Brand.navy,
    alignItems: "center",
    gap: 16,
  },
  continueButton: {
    width: "100%",
    height: 64,
    backgroundColor: Brand.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  continueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Brand.navy,
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  stepIndicator: {
    fontSize: 14,
    color: "#AAA",
    fontWeight: "bold",
    marginTop: 16,
  },
});
