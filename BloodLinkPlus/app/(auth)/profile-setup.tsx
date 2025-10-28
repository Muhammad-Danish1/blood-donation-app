import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../src/theme';
import { Button, Input } from '../../src/components';
import { bloodGroups, cities } from '../../src/data/mockData';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [showBloodGroupPicker, setShowBloodGroupPicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [available, setAvailable] = useState(true);

  const handleComplete = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.gradients.warm[0], Colors.gradients.warm[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Complete Your Profile</Text>
          <Text style={styles.headerSubtitle}>Help us connect you with those in need</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.photoUpload}>
            <LinearGradient
              colors={[Colors.glass.light, Colors.glass.medium]}
              style={styles.photoGradient}
            >
              <Ionicons name="camera" size={32} color={Colors.primary} />
              <Text style={styles.photoText}>Upload Photo</Text>
            </LinearGradient>
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
                  <View style={[styles.bloodGroupBadge, { backgroundColor: Colors.bloodGroups[group] + '20' }]}>
                    <Text style={[styles.pickerOptionText, { color: Colors.bloodGroups[group] }]}>
                      {group}
                    </Text>
                  </View>
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

          <TouchableOpacity 
            style={styles.availabilityContainer}
            onPress={() => setAvailable(!available)}
          >
            <View>
              <Text style={styles.availabilityLabel}>Available to Donate</Text>
              <Text style={styles.availabilitySubtext}>You can change this anytime</Text>
            </View>
            <View style={[styles.toggle, !available && styles.toggleInactive]}>
              <View style={[styles.toggleThumb, !available && styles.toggleThumbInactive]} />
            </View>
          </TouchableOpacity>

          <Button title="Complete Setup" onPress={handleComplete} style={styles.completeButton} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.xl,
  },
  formContainer: {
    marginTop: -Spacing.lg,
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    ...Shadows.lg,
  },
  photoUpload: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  photoGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary + '30',
    borderStyle: 'dashed',
    borderRadius: 60,
  },
  photoText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    marginTop: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
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
    ...Shadows.md,
  },
  pickerOption: {
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  bloodGroupBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  pickerOptionText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    fontWeight: Typography.fontWeight.medium,
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
    borderRadius: 15,
    backgroundColor: Colors.primary,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleInactive: {
    backgroundColor: Colors.border.medium,
    justifyContent: 'flex-start',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.white,
    marginLeft: 'auto',
    ...Shadows.sm,
  },
  toggleThumbInactive: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  completeButton: {
    marginTop: Spacing.md,
  },
});
