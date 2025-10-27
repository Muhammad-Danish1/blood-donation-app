import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../theme';
import { StatusBadge, Card } from '../components';
import { mockDonors } from '../data/mockData';

export const MapScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donor Map</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.webMapPlaceholder}>
        <Ionicons name="map" size={80} color={Colors.border.medium} />
        <Text style={styles.webMapText}>Map view is available on mobile</Text>
        <Text style={styles.webMapSubtext}>
          Download the BloodLink+ mobile app to see donors on an interactive map
        </Text>
      </View>

      <ScrollView style={styles.donorList}>
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
              onPress={() => navigation.navigate('DonorProfile', { donor })}
            >
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  webMapPlaceholder: {
    padding: Spacing.xl,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
  },
  webMapText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
    textAlign: 'center',
  },
  webMapSubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
    maxWidth: 300,
  },
  donorList: {
    flex: 1,
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
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  donorInfo: {
    flex: 1,
    marginLeft: Spacing.sm,
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
    paddingTop: Spacing.sm,
    alignItems: 'center',
  },
  viewProfileText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius['2xl'],
  },
});
