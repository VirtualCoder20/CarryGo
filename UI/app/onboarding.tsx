import { StyleSheet, View, Pressable, useWindowDimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
} from 'react-native-reanimated';
import { CarryGoLogo } from '@/components/ui/carry-go-logo';
import { ThemedText } from '@/components/themed-text';
import { Brand, Fonts } from '@/constants/theme';
import { useState } from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';

import { useStorage } from '@/hooks/use-storage';

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [, setHasSeenOnboarding] = useStorage('onboarding_seen', false);

  const slideX = useSharedValue(0);

  const onNext = () => {
    if (step < 2) {
      slideX.value = withTiming(-(step + 1) * width, { duration: 400 });
      setStep(step + 1);
    } else {
      setHasSeenOnboarding(true);
      router.replace('/(auth)');
    }
  };

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.pagerContainer, { width }]}>
        <Animated.View style={[styles.pager, { width: width * 3 }, slideStyle]}>
          {/* Slide 1: Welcome */}
          <View style={[styles.slide, { width }]}>
            <CarryGoLogo />
            <View style={styles.content}>
              <ThemedText style={styles.tagline}>Your Daily Route, Smarter.</ThemedText>
              <ThemedText style={styles.description}>
                Connecting car owners with commuters going the same way.
              </ThemedText>
            </View>
          </View>

          {/* Slide 2: Commuters */}
          <View style={[styles.slide, { width }]}>
            <View style={styles.iconCircle}>
              <IconSymbol name="person.2.fill" md="group" size={60} color={Brand.primary} />
            </View>
            <View style={styles.content}>
              <ThemedText style={styles.slideTitle}>For Commuters</ThemedText>
              <ThemedText style={styles.description}>
                Find safe, affordable, and comfortable rides for your daily travels. Save time and money.
              </ThemedText>
            </View>
          </View>

          {/* Slide 3: Drivers */}
          <View style={[styles.slide, { width }]}>
            <View style={styles.iconCircle}>
              <IconSymbol name="car.2.fill" md="directions-car" size={60} color={Brand.primary} />
            </View>
            <View style={styles.content}>
              <ThemedText style={styles.slideTitle}>For Drivers</ThemedText>
              <ThemedText style={styles.description}>
                Share your route, reduce your driving costs, and earn extra income while you drive.
              </ThemedText>
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {[0, 1, 2].map((i) => (
            <View 
              key={i} 
              style={[
                styles.indicator, 
                step === i && styles.activeIndicator
              ]} 
            />
          ))}
        </View>
        <Pressable onPress={onNext} style={styles.button}>
          <ThemedText style={styles.buttonText}>
            {step === 2 ? 'Get Started' : 'Continue'}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
  },
  pagerContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  pager: {
    flex: 1,
    flexDirection: 'row',
  },
  slide: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 32,
  },
  content: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
  tagline: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.rounded,
  },
  slideTitle: {
    color: Brand.primary,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.rounded,
  },
  description: {
    color: '#AAA',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: Fonts.rounded,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(39, 214, 155, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  footer: {
    paddingBottom: 60,
    alignItems: 'center',
    gap: 32,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeIndicator: {
    backgroundColor: Brand.primary,
    width: 32,
  },
  button: {
    backgroundColor: Brand.primary,
    paddingVertical: 18,
    paddingHorizontal: 64,
    borderRadius: 32,
    boxShadow: '0 4px 14px rgba(39, 214, 155, 0.4)',
  },
  buttonText: {
    color: Brand.navy,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
