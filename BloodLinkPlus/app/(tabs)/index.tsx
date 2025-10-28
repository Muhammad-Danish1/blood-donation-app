import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../src/theme';
import { Card, StatusBadge } from '../../src/components';
import { mockDonors } from '../../src/data/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'A+', 'O+', 'B+', 'AB+', 'Nearby'];

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
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Find Donors</Text>
          <Text style={styles.subgreeting}>Connect with verified blood donors</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
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

      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Available Donors</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/map')}>
          <Text style={styles.viewMapText}>View on Map</Text>
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
  );
}

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
  },
  greeting: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  subgreeting: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.text.disabled,
  },
  filterScroll: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  filterContent: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  filterTextActive: {
    color: Colors.white,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  viewMapText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: Typography.fontWeight.medium,
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
