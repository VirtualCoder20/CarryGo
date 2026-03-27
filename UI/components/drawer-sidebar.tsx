import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Brand, Fonts } from "@/constants/theme";
import { useUser } from "@/contexts/user-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";

const { width } = Dimensions.get("window");

interface MenuIcon {
  name: any;
  md: any;
}

interface SidebarMenuItemProps {
  icon: MenuIcon;
  label: string;
  onPress: () => void;
}

interface DrawerSidebarProps {
  visible: boolean;
  onClose: () => void;
  isDriver?: boolean;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <IconSymbol name={icon.name} md={icon.md} size={24} color="#FFF" />
    <ThemedText style={styles.menuLabel}>{label}</ThemedText>
  </TouchableOpacity>
);

export const DrawerSidebar: React.FC<DrawerSidebarProps> = ({
  visible,
  onClose,
  isDriver = false,
}) => {
  const { user, logout } = useUser();
  const router = useRouter();

  const commuterMenuItems: {
    label: string;
    icon: MenuIcon;
    action?: () => void;
  }[] = [
    { label: "Find A Ride", icon: { name: "car.fill", md: "directions-car" } },
    { label: "Ride History", icon: { name: "clock.fill", md: "history" } },
    { label: "Saved Routes", icon: { name: "mappin.fill", md: "location-on" } },
    { label: "Wallet", icon: { name: "creditcard.fill", md: "payment" } },
    { label: "Ride Buddies", icon: { name: "person.2.fill", md: "group" } },
    { label: "Safety", icon: { name: "checkmark.circle.fill", md: "check-circle" } },
    { label: "Settings", icon: { name: "gear", md: "settings" } },
    { label: "Support", icon: { name: "questionmark.circle.fill", md: "contact-support" } },
  ];

  const driverMenuItems: {
    label: string;
    icon: MenuIcon;
    action?: () => void;
  }[] = [
    { label: "Create A Ride", icon: { name: "car.fill", md: "directions-car" } },
    { label: "Trip History", icon: { name: "clock.fill", md: "history" } },
    { label: "Ride Requests", icon: { name: "mappin.fill", md: "location-on" } },
    { label: "Wallet", icon: { name: "creditcard.fill", md: "payment" } },
    { label: "Ratings & Reviews", icon: { name: "star.fill", md: "star" } },
    { label: "Safety", icon: { name: "checkmark.circle.fill", md: "check-circle" } },
    { label: "Settings", icon: { name: "gear", md: "settings" } },
    { label: "Support", icon: { name: "questionmark.circle.fill", md: "contact-support" } },
  ];

  const menuItems = isDriver ? driverMenuItems : commuterMenuItems;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.sidebarContainer} edges={["top", "bottom"]}>
        <ScrollView style={styles.sidebar}>
          {/* Header */}
          <View style={styles.sidebarHeader}>
            <View style={styles.userAvatar}>
              <ThemedText style={styles.avatarText}>
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </ThemedText>
            </View>
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>
                {user?.fullName || "User"}
              </ThemedText>
              <ThemedText style={styles.userRating}>★★★★★</ThemedText>
            </View>
            <TouchableOpacity style={styles.chevron}>
              <ThemedText style={styles.chevronIcon}>›</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <SidebarMenuItem
                key={index}
                icon={item.icon}
                label={item.label}
                onPress={() => {
                  router.push(`/${item.label.toLowerCase().replace(/\s/g, "-")}` as Href);
                  onClose();
                }}
              />
            ))}
          </View>

          {/* Switch Mode Button */}
          <TouchableOpacity style={styles.switchButton} onPress={onClose}>
            <ThemedText style={styles.switchButtonText}>
              {isDriver ? "Switch to Commuter Mode" : "Switch to Driver Mode"}
            </ThemedText>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              logout();
              onClose();
            }}
          >
            <ThemedText style={styles.logoutText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.sidebarOverlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.closeIcon}>✕</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  sidebarOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 48,
  },
  closeButton: {
    padding: 16,
  },
  closeIcon: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "bold",
  },
  sidebar: {
    width: width * 0.75,
    backgroundColor: Brand.navy,
    paddingTop: 20,
    marginTop: -20,
    paddingHorizontal: 16,
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Brand.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Brand.primary,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Brand.navy,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  userRating: {
    fontSize: 14,
    color: Brand.primary,
    marginTop: 4,
  },
  chevron: {
    padding: 8,
  },
  chevronIcon: {
    fontSize: 24,
    color: "#FFF",
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    gap: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  switchButton: {
    backgroundColor: Brand.primary,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  switchButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Brand.navy,
    fontFamily: Fonts.rounded,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderTopWidth: 1,
    marginTop: 16,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 14,
    color: "#FF6B6B",
    fontFamily: Fonts.rounded,
  },
});
