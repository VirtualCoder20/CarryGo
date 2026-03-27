import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Brand, Fonts } from '@/constants/theme';

interface PreferenceSetting {
  id: string;
  title: string;
  description: string;
  icon: string;
  value: boolean;
}

export default function PreferencesScreen() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<PreferenceSetting[]>([
    {
      id: 'push-notifications',
      title: 'Push Notifications',
      description: 'Receive ride updates and alerts',
      icon: 'notifications',
      value: true,
    },
    {
      id: 'sms-notifications',
      title: 'SMS Notifications',
      description: 'Receive important updates via SMS',
      icon: 'sms',
      value: false,
    },
    {
      id: 'email-notifications',
      title: 'Email Notifications',
      description: 'Receive promotional emails and updates',
      icon: 'mail',
      value: true,
    },
    {
      id: 'location-sharing',
      title: 'Location Sharing',
      description: 'Share your location during rides',
      icon: 'location-on',
      value: true,
    },
    {
      id: 'ride-history',
      title: 'Save Ride History',
      description: 'Keep a record of your rides',
      icon: 'history',
      value: true,
    },
    {
      id: 'dark-mode',
      title: 'Dark Mode',
      description: 'Use dark theme throughout app',
      icon: 'dark-mode',
      value: true,
    },
  ]);

  const handleTogglePreference = (id: string) => {
    setPreferences(prevPreferences =>
      prevPreferences.map(pref =>
        pref.id === id ? { ...pref, value: !pref.value } : pref
      )
    );

    const preference = preferences.find(p => p.id === id);
    if (preference) {
      const action = !preference.value ? 'enabled' : 'disabled';
      Alert.alert('Success', `${preference.title} has been ${action}`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={Brand.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.preferencesList}>
          {preferences.slice(0, 3).map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.preferenceItem,
                index !== 2 && styles.preferenceBorder,
              ]}
            >
              <View style={styles.preferenceLeft}>
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color={Brand.primary}
                />
                <View style={styles.preferenceContent}>
                  <Text style={styles.preferenceTitle}>{item.title}</Text>
                  <Text style={styles.preferenceDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <Switch
                value={item.value}
                onValueChange={() => handleTogglePreference(item.id)}
                trackColor={{ false: Brand.gray, true: Brand.primary }}
                thumbColor="#FFF"
              />
            </View>
          ))}
        </View>
      </View>

      {/* Privacy & Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        <View style={styles.preferencesList}>
          {preferences.slice(3, 5).map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.preferenceItem,
                index !== 1 && styles.preferenceBorder,
              ]}
            >
              <View style={styles.preferenceLeft}>
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color={Brand.primary}
                />
                <View style={styles.preferenceContent}>
                  <Text style={styles.preferenceTitle}>{item.title}</Text>
                  <Text style={styles.preferenceDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <Switch
                value={item.value}
                onValueChange={() => handleTogglePreference(item.id)}
                trackColor={{ false: Brand.gray, true: Brand.primary }}
                thumbColor="#FFF"
              />
            </View>
          ))}
        </View>
      </View>

      {/* Display Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>
        <View style={styles.preferencesList}>
          {preferences.slice(5, 6).map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.preferenceItem,
                index !== 0 && styles.preferenceBorder,
              ]}
            >
              <View style={styles.preferenceLeft}>
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color={Brand.primary}
                />
                <View style={styles.preferenceContent}>
                  <Text style={styles.preferenceTitle}>{item.title}</Text>
                  <Text style={styles.preferenceDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <Switch
                value={item.value}
                onValueChange={() => handleTogglePreference(item.id)}
                trackColor={{ false: Brand.gray, true: Brand.primary }}
                thumbColor="#FFF"
              />
            </View>
          ))}
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <MaterialIcons name="info" size={20} color={Brand.primary} />
        <Text style={styles.infoText}>
          Your preferences are saved automatically. You can change them anytime in the app settings.
        </Text>
      </View>

      {/* Reset Button */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          Alert.alert(
            'Reset Preferences',
            'Are you sure you want to reset all preferences to default values?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Reset',
                style: 'destructive',
                onPress: () => {
                  setPreferences(preferences.map(p => ({ ...p, value: true })));
                  Alert.alert('Success', 'All preferences have been reset to default');
                },
              },
            ]
          );
        }}
      >
        <MaterialIcons name="restore" size={18} color="#EF4444" />
        <Text style={styles.resetButtonText}>Reset to Defaults</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    fontFamily: Fonts.rounded,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Brand.primary,
    marginBottom: 12,
    fontFamily: Fonts.rounded,
  },
  preferencesList: {
    backgroundColor: Brand.light_navy,
    borderRadius: 12,
    overflow: 'hidden',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  preferenceBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  preferenceContent: {
    marginLeft: 16,
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
    marginBottom: 4,
    fontFamily: Fonts.rounded,
  },
  preferenceDescription: {
    fontSize: 12,
    color: Brand.gray,
    fontFamily: Fonts.rounded,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(39, 214, 155, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 24,
    borderLeftWidth: 3,
    borderLeftColor: Brand.primary,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
    color: '#FFF',
    fontFamily: Fonts.rounded,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    fontFamily: Fonts.rounded,
  },
});
