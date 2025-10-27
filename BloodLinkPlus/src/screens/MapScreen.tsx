import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../theme';
import { StatusBadge, Card } from '../components';
import { mockDonors } from '../data/mockData';

let MapView: any;
let Marker: any;
let PROVIDER_GOOGLE: any;

if (Platform.OS !== 'web') {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
  PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
}

export const MapScreen = ({ navigation }: any) => {
  const [selectedDonor, setSelectedDonor] = useState<any>(null);

  if (Platform.OS === 'web') {
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
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 40.7128,
          longitude: -74.0060,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {mockDonors.map((donor) => (
          <Marker
            key={donor.id}
            coordinate={{
              latitude: donor.latitude,
              longitude: donor.longitude,
            }}
            onPress={() => setSelectedDonor(donor)}
          >
            <View style={styles.markerContainer}>
              <View style={[styles.marker, { backgroundColor: Colors.bloodGroups[donor.bloodGroup as keyof typeof Colors.bloodGroups] }]}>
                <Ionicons name="water" size={20} color={Colors.white} />
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.myLocationButton}>
        <Ionicons name="locate" size={24} color={Colors.primary} />
      </TouchableOpacity>

      {selectedDonor && (
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <View style={styles.donorPreview}>
            <Image source={{ uri: selectedDonor.profilePhoto }} style={styles.avatar} />
            <View style={styles.donorInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{selectedDonor.name}</Text>
                {selectedDonor.verified && (
                  <Ionicons name="checkmark-circle" size={16} color={Colors.secondary} />
                )}
              </View>
              <Text style={styles.details}>
                {selectedDonor.bloodGroup} • {selectedDonor.distance} km away
              </Text>
              <StatusBadge status={selectedDonor.availability} size="sm" />
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                setSelectedDonor(null);
                navigation.navigate('DonorProfile', { donor: selectedDonor });
              }}
            >
              <Text style={styles.actionButtonText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPrimary]}
              onPress={() => navigation.navigate('Chat')}
            >
              <Ionicons name="chatbubble" size={18} color={Colors.white} />
              <Text style={styles.actionButtonPrimaryText}>Chat</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedDonor(null)}
          >
            <Ionicons name="close" size={20} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>
      )}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.background.secondary,
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
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    ...Shadows.md,
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xl + 20,
    left: Spacing.xl,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  myLocationButton: {
    position: 'absolute',
    top: Spacing.xl + 20,
    right: Spacing.xl,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    padding: Spacing.lg,
    ...Shadows.lg,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border.light,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  donorPreview: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius['2xl'],
    marginRight: Spacing.sm + 4,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm + 4,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  actionButtonPrimary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionButtonPrimaryText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
  },
});
