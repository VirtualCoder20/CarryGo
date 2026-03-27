import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Brand, Fonts } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export function LiveTrafficMap() {
  return (
    <View style={styles.container}>
      {/* Map placeholder or actual Map component would go here */}
      <View style={styles.mapBackground} />

      {/* Floating Action Button - Top Right */}
      <Pressable style={styles.locationButton}>
        <IconSymbol name="location.fill" md="my-location" size={24} color="#FFF" />
      </Pressable>

      {/* Live Traffic Badge - Bottom Left */}
      <View style={styles.trafficBadge}>
        <View style={styles.trafficDot} />
        <ThemedText style={styles.trafficText}>
          LIVE TRAFFIC: LAGOS
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    height: 280,
    borderRadius: 20,
    borderCurve: 'continuous',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#E5E9EA',
    position: 'relative',
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#CFD8DC', // Placeholder for actual map image
  },
  locationButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Brand.navy,
    width: 48,
    height: 48,
    borderRadius: 16,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  trafficBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: Brand.navy,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    gap: 8,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  trafficDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Brand.primary,
  },
  trafficText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: Fonts.rounded,
    letterSpacing: 0.5,
  },
});


// import React, { useRef, useState, useEffect } from 'react';
// import { View, StyleSheet, Pressable, Platform } from 'react-native';
// import { AppleMaps, GoogleMaps } from 'expo-maps';
// import * as Location from 'expo-location';
// import { ThemedText } from '@/components/themed-text';
// import { Brand, Fonts } from '@/constants/theme';
// import { IconSymbol } from '@/components/ui/icon-symbol';

// interface LocationCoords {
//   latitude: number;
//   longitude: number;
// }

// const LAGOS_CENTER = {
//   latitude: 6.5244,
//   longitude: 3.3792,
// };

// export function LiveTrafficMap() {
//   const mapRef = useRef<any>(null);
//   const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);

//   // Request location permissions and get user location
//   useEffect(() => {
//     (async () => {
//       try {
//         // Request foreground location permissions
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           console.warn('Permission to access location was denied');
//           // Fallback to Lagos center
//           setUserLocation(LAGOS_CENTER);
//           return;
//         }

//         // Get current location
//         const location = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.Balanced,
//         });

//         setUserLocation({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         });
//       } catch (error) {
//         console.error('Error getting location:', error);
//         // Fallback to Lagos center
//         setUserLocation(LAGOS_CENTER);
//       }
//     })();
//   }, []);

//   const handleLocationPress = () => {
//     if (mapRef.current && userLocation) {
//       if (Platform.OS === 'ios') {
//         mapRef.current?.setCameraPosition({
//           coordinates: userLocation,
//           zoom: 15,
//         });
//       } else {
//         mapRef.current?.setCameraPosition({
//           coordinates: userLocation,
//           zoom: 15,
//           duration: 300,
//         });
//       }
//     }
//   };

//   const displayLocation = userLocation || LAGOS_CENTER;

//   // Android Map Component
//   if (Platform.OS === 'android') {
//     return (
//       <View style={styles.container}>
//         <GoogleMaps.View
//           ref={mapRef}
//           style={styles.map}
//           cameraPosition={{
//             coordinates: displayLocation,
//             zoom: 15,
//           }}
//           markers={
//             userLocation
//               ? [
//                   {
//                     coordinates: userLocation,
//                     title: 'Your Location',
//                     snippet: 'Your current position',
//                     id: 'user-location',
//                   },
//                 ]
//               : []
//           }
//           userLocation={
//             userLocation
//               ? {
//                   coordinates: userLocation,
//                   followUserLocation: false,
//                 }
//               : undefined
//           }
//           properties={{
//             isMyLocationEnabled: true,
//             isTrafficEnabled: true,
//           }}
//           uiSettings={{
//             myLocationButtonEnabled: false,
//             zoomControlsEnabled: true,
//             compassEnabled: true,
//           }}
//         />

//         {/* Location Button - Top Right */}
//         <Pressable style={styles.locationButton} onPress={handleLocationPress}>
//           <IconSymbol name="location.fill" md="my-location" size={24} color="#FFF" />
//         </Pressable>

//         {/* Live Traffic Badge - Bottom Left */}
//         <View style={styles.trafficBadge}>
//           <View style={styles.trafficDot} />
//           <ThemedText style={styles.trafficText}>
//             LIVE TRAFFIC: LAGOS
//           </ThemedText>
//         </View>
//       </View>
//     );
//   }

//   // iOS Map Component
//   return (
//     <View style={styles.container}>
//       <AppleMaps.View
//         ref={mapRef}
//         style={styles.map}
//         cameraPosition={{
//           coordinates: displayLocation,
//           zoom: 15,
//         }}
//         markers={
//           userLocation
//             ? [
//                 {
//                   coordinates: userLocation,
//                   title: 'Your Location',
//                   id: 'user-location',
//                 },
//               ]
//             : []
//         }
//         properties={{
//           isMyLocationEnabled: true,
//           isTrafficEnabled: true,
//         }}
//         uiSettings={{
//           myLocationButtonEnabled: false,
//           compassEnabled: true,
//         }}
//       />

//       {/* Location Button - Top Right */}
//       <Pressable style={styles.locationButton} onPress={handleLocationPress}>
//         <IconSymbol name="location.fill" md="my-location" size={24} color="#FFF" />
//       </Pressable>

//       {/* Live Traffic Badge - Bottom Left */}
//       <View style={styles.trafficBadge}>
//         <View style={styles.trafficDot} />
//         <ThemedText style={styles.trafficText}>
//           LIVE TRAFFIC: LAGOS
//         </ThemedText>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,
//     marginVertical: 12,
//     height: 280,
//     borderRadius: 20,
//     borderCurve: 'continuous',
//     overflow: 'hidden',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//     position: 'relative',
//   },
//   map: {
//     ...StyleSheet.absoluteFill,
//     borderRadius: 20,
//   },
//   locationButton: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//     backgroundColor: Brand.navy,
//     width: 48,
//     height: 48,
//     borderRadius: 16,
//     borderCurve: 'continuous',
//     justifyContent: 'center',
//     alignItems: 'center',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
//     zIndex: 10,
//   },
//   trafficBadge: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     backgroundColor: Brand.navy,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 100,
//     gap: 8,
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
//     zIndex: 10,
//   },
//   trafficDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: Brand.primary,
//   },
//   trafficText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#FFF',
//     fontFamily: Fonts.rounded,
//     letterSpacing: 0.5,
//   },
// });
