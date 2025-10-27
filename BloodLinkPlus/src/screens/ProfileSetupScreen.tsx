import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { Button, Input } from '../components';
import { bloodGroups, cities } from '../data/mockData';

export const ProfileSetupScreen = ({ navigation }: any) => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [showBloodGroupPicker, setShowBloodGroupPicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);

  const handleComplete = () => {
    navigation.replace('Main');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>Help us connect you with those in need</Text>
      </View>

      <TouchableOpacity style={styles.photoUpload}>
        <Ionicons name="camera" size={32} color={Colors.text.secondary} />
        <Text style={styles.photoText}>Upload Profile Photo</Text>
      </TouchableOpacity>

      <Input
        label="Full Name"
        placeholder="Your full name"
        leftIcon="person-outline"
      />

      <TouchableOpacity
        style={styles.picker}
        onPress={() => setShowBloodGroupPicker(!showBloodGroupPicker)}
      >
        <Text style={styles.pickerLabel}>Blood Group</Text>
        <View style={styles.pickerButton}>
          <Text style={[styles.pickerText, !bloodGroup && styles.placeholderText]}>
            {bloodGroup || 'Select your blood group'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.text.secondary} />
        </View>
      </TouchableOpacity>

      {showBloodGroupPicker && (
        <View style={styles.pickerOptions}>
          {bloodGroups.map((group) => (
            <TouchableOpacity
              key={group}
              style={styles.pickerOption}
              onPress={() => {
                setBloodGroup(group);
                setShowBloodGroupPicker(false);
              }}
            >
              <Text style={styles.pickerOptionText}>{group}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Input label="Age" placeholder="Your age" keyboardType="numeric" />
        </View>
        <View style={styles.halfInput}>
          <Input label="Weight (kg)" placeholder="Your weight" keyboardType="numeric" />
        </View>
      </View>

      <TouchableOpacity
        style={styles.picker}
        onPress={() => setShowCityPicker(!showCityPicker)}
      >
        <Text style={styles.pickerLabel}>City</Text>
        <View style={styles.pickerButton}>
          <Text style={[styles.pickerText, !city && styles.placeholderText]}>
            {city || 'Select your city'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.text.secondary} />
        </View>
      </TouchableOpacity>

      {showCityPicker && (
        <View style={styles.pickerOptions}>
          {cities.map((c) => (
            <TouchableOpacity
              key={c}
              style={styles.pickerOption}
              onPress={() => {
                setCity(c);
                setShowCityPicker(false);
              }}
            >
              <Text style={styles.pickerOptionText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.locationButton}>
        <Ionicons name="location" size={20} color={Colors.secondary} />
        <Text style={styles.locationText}>Use Current Location</Text>
      </TouchableOpacity>

      <View style={styles.availabilityContainer}>
        <View>
          <Text style={styles.availabilityLabel}>Available to Donate</Text>
          <Text style={styles.availabilitySubtext}>You can change this anytime</Text>
        </View>
        <TouchableOpacity style={styles.toggle}>
          <View style={styles.toggleActive} />
        </TouchableOpacity>
      </View>

      <Button title="Complete Setup" onPress={handleComplete} style={styles.completeButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  photoUpload: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderStyle: 'dashed',
  },
  photoText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  picker: {
    marginBottom: Spacing.md,
  },
  pickerLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
  },
  pickerText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  placeholderText: {
    color: Colors.text.disabled,
  },
  pickerOptions: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  pickerOption: {
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  pickerOptionText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm + 4,
    marginBottom: Spacing.lg,
  },
  locationText: {
    color: Colors.secondary,
    fontSize: Typography.fontSize.base,
    marginLeft: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xl,
  },
  availabilityLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
  },
  availabilitySubtext: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  toggleActive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.white,
  },
  completeButton: {
    marginTop: Spacing.md,
  },
});
