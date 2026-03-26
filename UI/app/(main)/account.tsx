import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Brand, Fonts } from '@/constants/theme';
import { useUser } from '@/contexts/user-context';

interface SettingItem {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
  isDangerous?: boolean;
}

export default function AccountScreen() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await logout();
              router.replace('/(auth)');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
              console.error('Logout failed:', error);
            } finally {
              setIsLoggingOut(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEditProfile = () => {
    router.push('/account/edit-profile');
  };

  const handleChangePassword = () => {
    router.push('/account/change-password');
  };

  const handlePreferences = () => {
    router.push('/account/preferences');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Contact us at support@carrygo.com or visit our website.');
  };

  const settingItems: SettingItem[] = [
    {
      id: 'edit-profile',
      label: 'Edit Profile',
      icon: 'edit',
      onPress: handleEditProfile,
    },
    {
      id: 'change-password',
      label: 'Change Password',
      icon: 'lock',
      onPress: handleChangePassword,
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'tune',
      onPress: handlePreferences,
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'help-outline',
      onPress: handleHelp,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {user?.avatarUrl ? (
            <Text style={styles.avatarText}>{user.fullName?.charAt(0) || 'U'}</Text>
          ) : (
            <MaterialIcons name="account-circle" size={80} color={Brand.primary} />
          )}
        </View>

        <Text style={styles.userName}>{user?.fullName || 'User'}</Text>
        <Text style={styles.userPhone}>{user?.phone || 'No phone added'}</Text>
        {user?.email && <Text style={styles.userEmail}>{user.email}</Text>}

        {user?.role && (
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Text>
          </View>
        )}
      </View>

      {/* Account Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.settingsList}>
          {settingItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.settingItem,
                index !== settingItems.length - 1 && styles.settingItemBorder,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={item.isDangerous ? '#EF4444' : Brand.primary}
              />
              <Text
                style={[
                  styles.settingLabel,
                  item.isDangerous && styles.dangerousText,
                ]}
              >
                {item.label}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={item.isDangerous ? '#EF4444' : Brand.gray}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Account Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account ID</Text>
            <Text style={styles.infoValue}>{user?.id || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={styles.infoValue}>
              {user?.onboardingStatus === 'COMPLETE' ? 'Active' : 'Pending'}
            </Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoggingOut}
          activeOpacity={0.8}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <MaterialIcons name="logout" size={24} color="#FFF" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>CarryGo v1.0.0</Text>
        <Text style={styles.footerSubtext}>© 2026 CarryGo. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Brand.light_navy,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Brand.primary,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Brand.primary,
    fontFamily: Fonts.rounded,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: Fonts.rounded,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: Brand.gray,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: Brand.gray,
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: Brand.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  roleBadgeText: {
    color: Brand.navy,
    fontWeight: '600',
    fontSize: 12,
    fontFamily: Fonts.rounded,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Brand.primary,
    marginBottom: 12,
    fontFamily: Fonts.rounded,
  },
  settingsList: {
    backgroundColor: Brand.light_navy,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Brand.light_navy,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    marginLeft: 16,
    fontFamily: Fonts.rounded,
  },
  dangerousText: {
    color: '#EF4444',
  },
  infoContainer: {
    backgroundColor: Brand.light_navy,
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoLabel: {
    fontSize: 14,
    color: Brand.gray,
    fontFamily: Fonts.rounded,
  },
  infoValue: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
    fontFamily: Fonts.rounded,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 24,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: Fonts.rounded,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts.rounded,
  },
  footerSubtext: {
    color: Brand.gray,
    fontSize: 12,
    marginTop: 4,
    fontFamily: Fonts.rounded,
  },
});
