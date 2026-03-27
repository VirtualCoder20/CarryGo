import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Brand, Fonts } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Welcome to CarryGo</ThemedText>
      <ThemedText style={styles.subtitle}>Your smart daily commute starts here.</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Brand.navy,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: Fonts.rounded,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: Brand.primary,
    marginTop: 12,
    textAlign: 'center',
    fontFamily: Fonts.rounded,
  },
});
