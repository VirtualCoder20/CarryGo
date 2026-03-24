import { Brand, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Join the Community</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter your phone number to get started.
        </ThemedText>

        <View style={styles.buttonContainer}>
          <Pressable 
            style={[styles.button, styles.primaryButton]} 
            onPress={() => router.push('/(auth)/phone')}
          >
            <ThemedText style={styles.primaryButtonText}>Sign In</ThemedText>
          </Pressable>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <ThemedText style={styles.dividerText}>OR</ThemedText>
            <View style={styles.dividerLine} />
          </View>

          <Pressable 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => router.push('/(auth)/phone')}
          >
            <ThemedText style={styles.secondaryButtonText}>Sign Up</ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
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
    lineHeight: 48,
    color: '#FFF',
    marginBottom: 8,
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    fontSize: 18,
    color: '#AAA',
    marginBottom: 48,
    fontFamily: Fonts.rounded,
  },
  buttonContainer: {
    gap: 32,
    marginTop: 20,
  },
  button: {
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Brand.primary,
    boxShadow: '0 4px 14px rgba(39, 214, 155, 0.4)',
  },
  secondaryButton: {
    backgroundColor: Brand.primary,
    boxShadow: '0 4px 14px rgba(39, 214, 155, 0.4)',
  },
  primaryButtonText: {
    color: Brand.navy,
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: Brand.navy,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: '#AAA',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
