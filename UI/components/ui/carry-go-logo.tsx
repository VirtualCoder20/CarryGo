import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Brand } from '@/constants/theme';

export function CarryGoLogo({ size = 120 }: { size?: number }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/icon.png')}
        style={{ width: size, height: size }}
        contentFit="contain"
      />
      <View style={styles.textContainer}>
        <ThemedText style={styles.whiteText}>Carry</ThemedText>
        <ThemedText style={styles.greenText}>Go</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  textContainer: {
    flexDirection: 'row',
  },
  whiteText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFF',
  },
  greenText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Brand.primary,
  },
});
