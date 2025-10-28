import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../src/theme';
import { Card, StatusBadge } from '../../src/components';
import { mockDonors } from '../../src/data/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-', 'Nearby'];

  const renderDonorCard = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/donor-profile', params: { donorId: item.id } })}
      activeOpacity={0.7}
    >
      <Card style={styles.donorCard}>
        <View style={styles.donorHeader}>
          <Image source={{ uri: item.profilePhoto }} style={styles.avatar} />
          <View style={styles.donorInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.donorName}>{item.name}</Text>
              {item.verified && (
                <Ionicons name="checkmark-circle" size={16} color={Colors.secondary} />
              )}
            </View>
            <Text style={styles.donorDetails}>
              {item.bloodGroup} • {item.city}
            </Text>
            <Text style={styles.distance}>
              <Ionicons name="location" size={12} color={Colors.text.secondary} />
              {' '}{item.distance} km away
            </Text>
          </View>
          <StatusBadge status={item.availability} size="sm" />
        </View>
        <View style={styles.donorFooter}>
          <Text style={styles.lastDonation}>
            Last donation: {new Date(item.lastDonation).toLocaleDateString()}
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="chatbubble-outline" size={18} color={Colors.primary} />
            <Text style={styles.contactText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Find Donors</Text>
              <Text style={styles.subgreeting}>Connect with life-savers near you</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={Colors.white} />
              <View style={styles.badge} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.text.secondary} />
            <Text style={styles.searchPlaceholder}>Search by blood group or city</Text>
            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="people" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Available Donors</Text>
          </View>
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={() => router.push('/(tabs)/map')}
          >
            <Ionicons name="map" size={16} color={Colors.secondary} />
            <Text style={styles.viewMapText}>Map View</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockDonors}
          renderItem={renderDonorCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  greeting: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  subgreeting: {
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    opacity: 0.9,
    marginTop: Spacing.xs,
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    ...Shadows.md,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.text.disabled,
  },
  filterScroll: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  filterContent: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md + 4,
    paddingVertical: Spacing.xs + 4,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border.light,
    ...Shadows.sm,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  filterTextActive: {
    color: Colors.white,
  },
  contentContainer: {
    flex: 1,
    marginTop: -Spacing.md,
    backgroundColor: Colors.background.secondary,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    paddingTop: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs - 2,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  viewMapText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: Typography.fontWeight.semibold,
  },
  list: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  donorCard: {
    marginBottom: Spacing.md,
  },
  donorHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.sm + 4,
  },
  avatar: {
    width: 56,
    height: 56,
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
  donorName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  donorDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  distance: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  donorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: Spacing.sm + 4,
  },
  lastDonation: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  contactText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
});
