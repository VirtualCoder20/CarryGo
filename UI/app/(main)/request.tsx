import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { Brand, Fonts } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface RideRequest {
  id: string;
  name: string;
  rating: number;
  badge: string;
  estimatedFare: string;
  profileImage: string;
  status: "pending" | "accepted" | "declined";
}

// Header Component
const RequestHeader = React.memo(({ pendingCount }: { pendingCount: number }) => (
  <View style={headerStyles.container}>
    <View>
      <ThemedText style={headerStyles.title}>Ride Requests</ThemedText>
      <ThemedText style={headerStyles.subtitle}>
        Review commuters wanting to join your trip.
      </ThemedText>
    </View>
    <ThemedText style={headerStyles.pendingBadge}>
      {pendingCount} Pending
    </ThemedText>
  </View>
));

RequestHeader.displayName = "RequestHeader";

// Request Card Component
interface RequestCardProps {
  request: RideRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

const RequestCard = React.memo(
  ({ request, onAccept, onDecline }: RequestCardProps) => {
    const handleAccept = useCallback(() => {
      onAccept(request.id);
    }, [request.id, onAccept]);

    const handleDecline = useCallback(() => {
      onDecline(request.id);
    }, [request.id, onDecline]);

    return (
      <View style={cardStyles.card}>
        <View style={cardStyles.topSection}>
          <View style={cardStyles.profileSection}>
            <Image
              source={{ uri: request.profileImage }}
              style={cardStyles.profileImage}
            />
            <View style={cardStyles.nameRatingSection}>
              <ThemedText style={cardStyles.name}>{request.name}</ThemedText>
              <View style={cardStyles.ratingBadgeRow}>
                <View style={cardStyles.ratingContainer}>
                  <ThemedText style={cardStyles.rating}>
                    {request.rating}⭐
                  </ThemedText>
                </View>
                <View style={cardStyles.badge}>
                  <ThemedText style={cardStyles.badgeText}>
                    {request.badge}
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
          <View style={cardStyles.fareSection}>
            <ThemedText style={cardStyles.fareAmount}>
              ${request.estimatedFare}
            </ThemedText>
            <ThemedText style={cardStyles.fareLabel}>
              Estimated fare
            </ThemedText>
          </View>
        </View>

        <View style={cardStyles.buttonSection}>
          <Pressable
            style={cardStyles.declineButton}
            onPress={handleDecline}
          >
            <ThemedText style={cardStyles.declineText}>Decline</ThemedText>
          </Pressable>
          <Pressable
            style={cardStyles.acceptButton}
            onPress={handleAccept}
          >
            <ThemedText style={cardStyles.acceptText}>Accept</ThemedText>
          </Pressable>
        </View>
      </View>
    );
  }
);

RequestCard.displayName = "RequestCard";

// Main Screen Component
export default function RideRequestsScreen() {
  const [requests, setRequests] = useState<RideRequest[]>([
    {
      id: "1",
      name: "Chinedu O.",
      rating: 4.8,
      badge: "RESPECTFUL RIDER",
      estimatedFare: "12.50",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      status: "pending",
    },
    {
      id: "2",
      name: "Sarah K.",
      rating: 4.9,
      badge: "RESPECTFUL RIDER",
      estimatedFare: "18.00",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      status: "pending",
    },
    {
      id: "3",
      name: "David L.",
      rating: 4.7,
      badge: "RESPECTFUL RIDER",
      estimatedFare: "9.75",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      status: "pending",
    },
  ]);

  // Calculate pending count
  const pendingCount = useMemo(
    () => requests.filter((r) => r.status === "pending").length,
    [requests]
  );

  // Memoize pending requests
  const pendingRequests = useMemo(
    () => requests.filter((r) => r.status === "pending"),
    [requests]
  );

  const handleAccept = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "accepted" } : r))
    );
  }, []);

  const handleDecline = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "declined" } : r))
    );
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <RequestHeader pendingCount={pendingCount} />

        <View style={styles.requestsList}>
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onAccept={handleAccept}
                onDecline={handleDecline}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol
                name="checkmark.circle.fill"
                md="check-circle"
                size={48}
                color="rgba(39, 214, 155, 0.3)"
              />
              <ThemedText style={styles.emptyStateText}>
                No pending requests
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, 
    backgroundColor: Brand.navy,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  requestsList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500" as const,
  },
});

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 32,
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: Fonts.rounded,
  },
  pendingBadge: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Brand.primary,
    fontFamily: Fonts.rounded,
    marginTop: 4,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    gap: 16,
  },
  topSection: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  profileSection: {
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  nameRatingSection: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  ratingBadgeRow: {
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 8,
  },
  ratingContainer: {
    flexDirection: "row" as const,
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
    fontFamily: Fonts.rounded,
  },
  badge: {
    backgroundColor: "rgba(39, 214, 155, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: Brand.primary,
    fontFamily: Fonts.rounded,
  },
  fareSection: {
    alignItems: "flex-end",
    gap: 2,
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Brand.primary,
    fontFamily: Fonts.rounded,
  },
  fareLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: Fonts.rounded,
  },
  buttonSection: {
    flexDirection: "row" as const,
    gap: 12,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  declineText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: Fonts.rounded,
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Brand.navy,
    fontFamily: Fonts.rounded,
  },
});
