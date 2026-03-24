import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android.
 *
 * Each icon is mapped to its domestic icon sets:
 * - iOS: SFSymbols
 * - Android: MaterialIcons
 */
export function IconSymbol({
  name,
  md,
  size = 24,
  color,
  style,
}: {
  name: SymbolViewProps['name'];
  md?: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  if (process.env.EXPO_OS === 'ios') {
    return (
      <SymbolView
        name={name}
        size={size}
        tintColor={color}
        resizeMode="scaleAspectFit"
        style={style as any}
      />
    );
  }

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={md ?? 'error'}
      style={style}
    />
  );
}
