import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../src/theme';
import { Card, StatusBadge, FAB } from '../../src/components';
import { mockRequests } from '../../src/data/mockData';

export default function MyRequestsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.gradients.warm[0], Colors.gradients.warm[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>My Requests</Text>
              <Text style={styles.subtitle}>Track your blood requests</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter-outline" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mockRequests.filter(r => r.status === 'open').length}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mockRequests.filter(r => r.status === 'accepted').length}</Text>
              <Text style={styles.statLabel}>Accepted</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mockRequests.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {mockRequests.map((request) => (
          <Card key={request.id} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={styles.bloodGroupBadge}>
                <Ionicons name="water" size={20} color={Colors.white} />
                <Text style={styles.bloodGroupText}>{request.bloodGroup}</Text>
              </View>
              <StatusBadge status={request.status} size="sm" />
            </View>

            <View style={styles.requestBody}>
              <View style={styles.infoRow}>
                <Ionicons name="medical" size={16} color={Colors.text.secondary} />
                <Text style={styles.hospitalName}>{request.hospital}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={16} color={Colors.text.secondary} />
                <Text style={styles.address} numberOfLines={1}>{request.address}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="water" size={16} color={Colors.text.secondary} />
                <Text style={styles.quantity}>{request.quantity} needed</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={16} color={Colors.text.secondary} />
                <Text style={styles.date}>Needed by {new Date(request.neededBy).toLocaleDateString()}</Text>
              </View>
            </View>

            <View style={styles.requestFooter}>
              <View style={styles.urgencyBadge}>
                <View style={[
                  styles.urgencyDot,
                  { backgroundColor: request.urgency === 'high' ? Colors.primary : request.urgency === 'medium' ? Colors.status.pending : Colors.status.fulfilled }
                ]} />
                <Text style={styles.urgencyText}>{request.urgency.toUpperCase()}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewDetails}>View Details</Text>
              </TouchableOpacity>
            </View>

            {request.status === 'open' && (
              <View style={styles.timeline}>
                <View style={styles.timelineItem}>
                  <View style={[styles.timelineDot, styles.timelineDotActive]} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>Request Created</Text>
                    <Text style={styles.timelineDate}>
                      {new Date(request.createdAt).toLocaleString()}
                    </Text>
                  </View>
                </View>
                <View style={styles.timelineLine} />
                <View style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>Waiting for donors...</Text>
                  </View>
                </View>
              </View>
            )}
          </Card>
        ))}
      </ScrollView>

      <FAB icon="add" onPress={() => router.push('/request-blood')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  headerGradient: {
    paddingTop: Spacing['3xl'] + 20,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: BorderRadius['3xl'],
    borderBottomRightRadius: BorderRadius['3xl'],
  },
  headerContent: {
    gap: Spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    opacity: 0.9,
    marginTop: Spacing.xs,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  requestCard: {
    marginBottom: Spacing.md,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  bloodGroupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  bloodGroupText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.white,
  },
  requestBody: {
    gap: Spacing.xs + 2,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs + 2,
  },
  hospitalName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    flex: 1,
  },
  address: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    flex: 1,
  },
  quantity: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  date: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: Spacing.sm + 4,
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  urgencyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  urgencyText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.secondary,
  },
  viewDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
  timeline: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border.medium,
    backgroundColor: Colors.white,
    marginRight: Spacing.sm,
    marginTop: 4,
  },
  timelineDotActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  timelineLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.border.light,
    marginLeft: 5,
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
});
