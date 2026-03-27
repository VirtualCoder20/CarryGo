import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Brand, Fonts } from '@/constants/theme';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword.trim()) {
      Alert.alert('Validation Error', 'Please enter your current password');
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert('Validation Error', 'Please enter your new password');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Validation Error', 'New password must be different from current password');
      return;
    }

    try {
      setIsSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert('Success', 'Password changed successfully', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
      console.error('Change password error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const passwordStrength = newPassword.length >= 8 ? 'Strong' : newPassword.length >= 4 ? 'Weak' : 'Very Weak';
  const strengthColor =
    newPassword.length >= 8 ? Brand.primary : newPassword.length >= 4 ? '#FF9800' : '#EF4444';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={Brand.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Current Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your current password"
              placeholderTextColor={Brand.gray}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              editable={!isSaving}
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              <MaterialIcons
                name={showCurrentPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={Brand.gray}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* New Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your new password"
              placeholderTextColor={Brand.gray}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              editable={!isSaving}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <MaterialIcons
                name={showNewPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={Brand.gray}
              />
            </TouchableOpacity>
          </View>

          {/* Password Strength Indicator */}
          {newPassword.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={[styles.strengthBar, { backgroundColor: strengthColor }]} />
              <Text style={[styles.strengthText, { color: strengthColor }]}>
                {passwordStrength}
              </Text>
            </View>
          )}

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementTitle}>Password Requirements:</Text>
            <PasswordRequirement
              met={newPassword.length >= 8}
              text="At least 8 characters"
            />
            <PasswordRequirement
              met={/[A-Z]/.test(newPassword)}
              text="One uppercase letter"
            />
            <PasswordRequirement
              met={/[a-z]/.test(newPassword)}
              text="One lowercase letter"
            />
            <PasswordRequirement
              met={/[0-9]/.test(newPassword)}
              text="One number"
            />
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm your new password"
              placeholderTextColor={Brand.gray}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              editable={!isSaving}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons
                name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={Brand.gray}
              />
            </TouchableOpacity>
          </View>

          {/* Match indicator */}
          {newPassword && confirmPassword && (
            <View style={styles.matchContainer}>
              <MaterialIcons
                name={newPassword === confirmPassword ? 'check-circle' : 'error'}
                size={16}
                color={newPassword === confirmPassword ? Brand.primary : '#EF4444'}
              />
              <Text
                style={[
                  styles.matchText,
                  {
                    color: newPassword === confirmPassword ? Brand.primary : '#EF4444',
                  },
                ]}
              >
                {newPassword === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </Text>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSaving && styles.submitButtonDisabled]}
          onPress={handleChangePassword}
          disabled={isSaving}
          activeOpacity={0.8}
        >
          {isSaving ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <MaterialIcons name="check" size={20} color="#FFF" />
              <Text style={styles.submitButtonText}>Change Password</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <View style={styles.requirement}>
      <MaterialIcons
        name={met ? 'check-circle' : 'radio-button-unchecked'}
        size={16}
        color={met ? Brand.primary : Brand.gray}
      />
      <Text style={[styles.requirementText, !met && styles.requirementUnmet]}>
        {text}
      </Text>
    </View>
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
  form: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Brand.primary,
    marginBottom: 8,
    fontFamily: Fonts.rounded,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Brand.light_navy,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(39, 214, 155, 0.2)',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#FFF',
    fontSize: 14,
    fontFamily: Fonts.rounded,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
  },
  strengthContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  strengthBar: {
    height: 4,
    borderRadius: 2,
    flex: 1,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.rounded,
  },
  requirementsContainer: {
    marginTop: 16,
    backgroundColor: 'rgba(39, 214, 155, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  requirementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Brand.primary,
    marginBottom: 8,
    fontFamily: Fonts.rounded,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  requirementText: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 8,
    fontFamily: Fonts.rounded,
  },
  requirementUnmet: {
    color: Brand.gray,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  matchText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.rounded,
  },
  submitButton: {
    backgroundColor: Brand.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 32,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: Brand.navy,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: Fonts.rounded,
  },
});
