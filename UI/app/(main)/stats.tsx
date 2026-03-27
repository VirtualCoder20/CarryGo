import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Brand, Fonts } from '@/constants/theme';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Brand.navy,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: Fonts.rounded,
  },
});
