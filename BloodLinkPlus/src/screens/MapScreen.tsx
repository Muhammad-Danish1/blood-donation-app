import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../theme';
import { StatusBadge } from '../components';
import { mockDonors } from '../data/mockData';

export const MapScreen = ({ navigation }: any) => {
  const [selectedDonor, setSelectedDonor] = useState<any>(null);

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
              <View style={[styles.marker, { backgroundColor: Colors.bloodGroups[donor.bloodGroup] }]}>
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
  donorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  name: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  details: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
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
