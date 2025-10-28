import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../src/theme';
import { StatusBadge, Card } from '../../src/components';
import { mockDonors } from '../../src/data/mockData';

export default function MapScreen() {
  const router = useRouter();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.secondary, Colors.secondaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Donor Map</Text>
          <Text style={styles.headerSubtitle}>Find donors near you</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Ionicons name="people" size={20} color={Colors.white} />
              <Text style={styles.statNumber}>{mockDonors.length}</Text>
              <Text style={styles.statLabel}>Donors</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="location" size={20} color={Colors.white} />
              <Text style={styles.statNumber}>5km</Text>
              <Text style={styles.statLabel}>Radius</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="time" size={20} color={Colors.white} />
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.mapPlaceholder}>
        <LinearGradient
          colors={[Colors.background.tertiary, Colors.white]}
          style={styles.mapGradient}
        >
          <View style={styles.mapIconContainer}>
            <Ionicons name="map" size={60} color={Colors.secondary} />
          </View>
          <Text style={styles.webMapText}>Interactive Map</Text>
          <Text style={styles.webMapSubtext}>
            Map view shows all nearby donors in real-time
          </Text>
          <TouchableOpacity style={styles.mockMapButton}>
            <Ionicons name="navigate-circle" size={20} color={Colors.white} />
            <Text style={styles.mockMapButtonText}>Enable Location</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <ScrollView style={styles.donorList} contentContainerStyle={styles.donorListContent}>
        <Text style={styles.donorListTitle}>Available Donors</Text>
        {mockDonors.map((donor) => (
          <Card key={donor.id} style={styles.donorCard}>
            <View style={styles.donorHeader}>
              <Image source={{ uri: donor.profilePhoto }} style={styles.avatar} />
              <View style={styles.donorInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{donor.name}</Text>
                  {donor.verified && (
                    <Ionicons name="checkmark-circle" size={16} color={Colors.secondary} />
                  )}
                </View>
                <Text style={styles.details}>
                  {donor.bloodGroup} • {donor.distance} km away
                </Text>
                <Text style={styles.location}>
                  <Ionicons name="location" size={12} color={Colors.text.secondary} />
                  {' '}{donor.city}
                </Text>
              </View>
              <StatusBadge status={donor.availability} size="sm" />
            </View>
            <TouchableOpacity
              style={styles.viewProfileButton}
              onPress={() => router.push({ pathname: '/donor-profile', params: { donorId: donor.id } })}
            >
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    opacity: 0.9,
    marginTop: Spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.lg,
  },
  stat: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    minWidth: 80,
  },
  statNumber: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginTop: Spacing.xs - 2,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.white,
    opacity: 0.9,
  },
  mapPlaceholder: {
    height: 240,
    marginHorizontal: Spacing.xl,
    marginTop: -Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Shadows.lg,
  },
  mapGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  mapIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  webMapText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  webMapSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
    maxWidth: 250,
  },
  mockMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
    ...Shadows.md,
  },
  mockMapButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.white,
  },
  donorList: {
    flex: 1,
  },
  donorListContent: {
    padding: Spacing.xl,
  },
  donorListTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  donorCard: {
    marginBottom: Spacing.md,
  },
  donorHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.sm + 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius['2xl'],
    marginRight: Spacing.sm + 4,
  },
  donorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  name: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  details: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  location: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  viewProfileButton: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: Spacing.sm + 4,
    alignItems: 'center',
  },
  viewProfileText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
});
