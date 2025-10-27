import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../theme';
import { Card, StatusBadge, Button } from '../components';

export const DonorProfileScreen = ({ route, navigation }: any) => {
  const { donor } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileHeader}>
        <Image source={{ uri: donor.profilePhoto }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{donor.name}</Text>
            {donor.verified && (
              <Ionicons name="checkmark-circle" size={20} color={Colors.secondary} />
            )}
          </View>
          <Text style={styles.location}>
            <Ionicons name="location" size={14} color={Colors.text.secondary} />
            {' '}{donor.city} • {donor.distance} km away
          </Text>
        </View>
      </View>

      <View style={styles.bloodGroupCard}>
        <View style={[styles.bloodGroupBadge, { backgroundColor: Colors.bloodGroups[donor.bloodGroup] }]}>
          <Ionicons name="water" size={32} color={Colors.white} />
          <Text style={styles.bloodGroupText}>{donor.bloodGroup}</Text>
        </View>
        <StatusBadge status={donor.availability} />
      </View>

      <Card style={styles.infoCard}>
        <Text style={styles.cardTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="person" size={20} color={Colors.text.secondary} />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{donor.gender}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="calendar" size={20} color={Colors.text.secondary} />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{donor.age} years</Text>
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.cardTitle}>Donation History</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={20} color={Colors.text.secondary} />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Last Donation</Text>
              <Text style={styles.infoValue}>
                {new Date(donor.lastDonation).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        <TouchableOpacity style={styles.contactItem}>
          <Ionicons name="call" size={20} color={Colors.primary} />
          <Text style={styles.contactText}>{donor.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem}>
          <Ionicons name="mail" size={20} color={Colors.primary} />
          <Text style={styles.contactText}>{donor.email}</Text>
        </TouchableOpacity>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Send Message"
          onPress={() => navigation.navigate('Chat')}
          style={styles.actionButton}
        />
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    height: 200,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl + 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    marginTop: -60,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    borderWidth: 4,
    borderColor: Colors.white,
    ...Shadows.md,
  },
  nameContainer: {
    marginTop: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  name: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  location: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  bloodGroupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  bloodGroupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm + 4,
  },
  bloodGroupText: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  infoCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 4,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 4,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  contactText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  callButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius['2xl'],
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
});
