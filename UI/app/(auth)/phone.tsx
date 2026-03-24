import { Brand, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useUser } from '@/contexts/user-context';
import { parsePhoneNumberWithError } from 'libphonenumber-js';

export default function PhoneAuthScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const { login } = useUser();

  const sendOtpMutation = useMutation({
    mutationFn: (phone: string) => api.auth.sendOtp(phone),
    onSuccess: () => setStep('OTP'),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (data: { phone: string; otp: string }) => api.auth.verifyOtp(data.phone, data.otp),
    onSuccess: async (data) => {
      await login(data.token, data.user);
      router.push('/onboarding/role');
    },
  });

  const isValidPhone = () => {
    try {
      if (!phoneNumber || phoneNumber.length < 5) return false;
      const number = parsePhoneNumberWithError(phoneNumber, 'NG');
      return number.isValid();
    } catch (e) {
      return false;
    }
  };

  const handleSendOtp = () => {
    if (isValidPhone()) {
      sendOtpMutation.mutate(phoneNumber);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 4) {
      verifyOtpMutation.mutate({ phone: phoneNumber, otp });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="arrow.left" md="arrow-back" color="#FFF" size={24} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.title}>Join the Community</ThemedText>
          <ThemedText style={styles.subtitle}>
            Enter your phone number to get started.
          </ThemedText>

          {step === 'PHONE' ? (
            <View style={styles.form}>
              <ThemedText style={styles.label}>Phone Number</ThemedText>
              <View style={styles.inputContainer}>
                <View style={styles.countryCode}>
                  <IconSymbol name="flag" md="flag" color="#AAA" size={20} />
                  <ThemedText style={styles.countryText}>+234</ThemedText>
                </View>
                <View style={styles.divider} />
                <TextInput
                  style={styles.input}
                  placeholder="801 234 5678"
                  placeholderTextColor="#555"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              <Pressable 
                style={[styles.button, (!isValidPhone() || sendOtpMutation.isPending) && styles.buttonDisabled]} 
                onPress={handleSendOtp}
                disabled={!isValidPhone() || sendOtpMutation.isPending}
              >
                <ThemedText style={styles.buttonText}>
                  {sendOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
                </ThemedText>
                {!sendOtpMutation.isPending && (
                  <IconSymbol name="paperplane.fill" md="send" color={Brand.navy} size={20} />
                )}
              </Pressable>
              
              {sendOtpMutation.isError && (
                <ThemedText style={styles.errorText}>
                  Failed to send OTP. Please try again.
                </ThemedText>
              )}
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.verificationHeader}>
                <View style={styles.verificationLine} />
                <ThemedText style={styles.verificationText}>VERIFICATION</ThemedText>
                <View style={styles.verificationLine} />
              </View>

              <ThemedText style={styles.label}>Enter 4-digit code</ThemedText>
              <View style={styles.otpContainer}>
                {[0, 1, 2, 3].map((i) => (
                  <View key={i} style={styles.otpBox}>
                    <ThemedText style={styles.otpChar}>{otp[i] || ''}</ThemedText>
                  </View>
                ))}
                <TextInput
                  style={styles.hiddenInput}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
                  autoFocus
                />
              </View>

              <ThemedText style={styles.resendText}>
                Didn&apos;t receive the code?
              </ThemedText>
              <Pressable style={styles.resendButton}>
                <IconSymbol name="arrow.clockwise" md="refresh" color={Brand.primary} size={18} />
                <ThemedText style={styles.resendLink}>Resend Code</ThemedText>
              </Pressable>

              <View style={styles.footerStep}>
                <ThemedText style={styles.stepText}>STEP 2 OF 4</ThemedText>
              </View>

              <Pressable 
                style={[styles.button, verifyOtpMutation.isPending && styles.buttonDisabled]} 
                onPress={handleVerifyOtp}
                disabled={verifyOtpMutation.isPending || otp.length < 4}
              >
                <ThemedText style={styles.buttonText}>
                  {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify OTP'}
                </ThemedText>
              </Pressable>
              
              {verifyOtpMutation.isError && (
                <ThemedText style={styles.errorText}>
                  {verifyOtpMutation.error instanceof Error ? verifyOtpMutation.error.message : 'Invalid OTP'}
                </ThemedText>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    height: 48,
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    fontSize: 18,
    color: '#AAA',
    marginBottom: 40,
    fontFamily: Fonts.rounded,
  },
  form: {
    gap: 24,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 16,
  },
  countryText: {
    color: '#FFF',
    fontSize: 18,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#FFF',
    fontSize: 18,
    paddingHorizontal: 16,
  },
  button: {
    height: 64,
    backgroundColor: Brand.primary,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    boxShadow: '0 4px 14px rgba(39, 214, 155, 0.4)',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
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
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  verificationLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  verificationText: {
    color: '#AAA',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  otpBox: {
    width: 72,
    height: 72,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpChar: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
  resendText: {
    color: '#AAA',
    textAlign: 'center',
    fontSize: 15,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  resendLink: {
    color: Brand.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerStep: {
    alignItems: 'center',
    marginTop: 8,
  },
  stepText: {
    color: '#AAA',
    fontSize: 13,
    letterSpacing: 1,
  },
});
