import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/theme';
import { StatusBadge, Card } from '../../src/components';
import { mockDonors } from '../../src/data/mockData';

export default function MapScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Donor Map</Text>
      </View>

      <View style={styles.webMapPlaceholder}>
        <Ionicons name="map" size={80} color={Colors.border.medium} />
        <Text style={styles.webMapText}>Map view is available on mobile</Text>
        <Text style={styles.webMapSubtext}>
          Download the BloodLink+ mobile app to see donors on an interactive map
        </Text>
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
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  webMapPlaceholder: {
    backgroundColor: Colors.background.tertiary,
    paddingVertical: Spacing['4xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  webMapText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
  },
  webMapSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
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
