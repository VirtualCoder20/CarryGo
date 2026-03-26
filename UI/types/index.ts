import { SymbolViewProps } from 'expo-symbols';
import { MaterialIcons } from '@expo/vector-icons';

export interface VerifyIdentityPayload {
  vehicleDescription?: string;
  documents: Record<string, string>; // Document URIs
}

export interface VerificationCardProps {
  title: string;
  docKey: string;
  icon: SymbolViewProps['name'];
  md: keyof typeof MaterialIcons.glyphMap;
}
