import { Brand } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useMutation } from '@tanstack/react-query';
import { api, User } from '@/utils/api';
import { useUser } from '@/contexts/user-context';

export default function ProfileInfoScreen() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    homeLocation: '',
    workLocation: '',
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<User>) => api.user.updateProfile(data),
    onSuccess: (data) => {
      updateUser(data);
      router.push('/onboarding/verify');
    },
  });

  const handleContinue = () => {
    if (form.fullName && form.email) {
      updateProfileMutation.mutate(form);
    }
  };

  const isDriver = user?.role === 'driver';
  const totalSteps = isDriver ? 4 : 3;
  const currentStep = 2; // Auth is 1, Profile is 2

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" md="arrow-back" color="#FFF" size={24} />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Complete Your Profile</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressText}>Verification Progress</ThemedText>
          <ThemedText style={styles.stepText}>Step {currentStep} of {totalSteps}</ThemedText>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
             <IconSymbol name="person.fill" md="person" color="#AAA" size={80} />
             <View style={styles.addIcon}>
                <IconSymbol name="plus.circle.fill" md="add-circle" color={Brand.primary} size={32} />
             </View>
          </View>
          <ThemedText style={styles.avatarLabel}>Your Profile Picture</ThemedText>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Full Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#555"
              value={form.fullName}
              onChangeText={(t) => setForm({ ...form, fullName: t })}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="johndoe@example.com"
              placeholderTextColor="#555"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(t) => setForm({ ...form, email: t })}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Home Location</ThemedText>
            <View style={styles.iconInputContainer}>
              <IconSymbol name="mappin.and.ellipse" md="location-on" color={Brand.primary} size={20} />
              <TextInput
                style={styles.iconInput}
                placeholder="e.g. Lekki Phase 1"
                placeholderTextColor="#555"
                value={form.homeLocation}
                onChangeText={(t) => setForm({ ...form, homeLocation: t })}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Work Location</ThemedText>
            <View style={styles.iconInputContainer}>
              <IconSymbol name="mappin.and.ellipse" md="location-on" color={Brand.primary} size={20} />
              <TextInput
                style={styles.iconInput}
                placeholder="e.g IHS Tower Ibeju Lekki"
                placeholderTextColor="#555"
                value={form.workLocation}
                onChangeText={(t) => setForm({ ...form, workLocation: t })}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.continueButton, (!form.fullName || !form.email || updateProfileMutation.isPending) && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={!form.fullName || !form.email || updateProfileMutation.isPending}
        >
          <ThemedText style={styles.continueText}>
            {updateProfileMutation.isPending ? 'Saving...' : 'Continue to Next Step'}
          </ThemedText>
        </Pressable>
        {updateProfileMutation.isError && (
          <ThemedText style={styles.errorText}>
            Failed to save profile. Please try again.
          </ThemedText>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 12,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  progressText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepText: {
    color: '#AAA',
    fontSize: 14,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 40,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Brand.primary,
    borderRadius: 2,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 4,
    borderColor: Brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  addIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: Brand.navy,
    borderRadius: 20,
  },
  avatarLabel: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    color: '#AAA',
    fontSize: 16,
  },
  input: {
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    color: '#FFF',
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconInput: {
    flex: 1,
    height: '100%',
    color: '#FFF',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: Brand.navy,
  },
  continueButton: {
    width: '100%',
    height: 64,
    backgroundColor: Brand.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 14px rgba(39, 214, 155, 0.4)',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  continueText: {
    color: Brand.navy,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
