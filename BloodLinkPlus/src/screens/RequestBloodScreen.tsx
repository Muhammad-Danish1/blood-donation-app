import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { Button, Input } from '../components';
import { bloodGroups } from '../data/mockData';

export const RequestBloodScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [bloodGroup, setBloodGroup] = useState('');
  const [showBloodGroupPicker, setShowBloodGroupPicker] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigation.navigate('MyRequests');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Blood</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.progressContainer}>
        {[1, 2, 3].map((s) => (
          <View key={s} style={styles.progressStep}>
            <View style={[styles.progressCircle, step >= s && styles.progressCircleActive]}>
              <Text style={[styles.progressNumber, step >= s && styles.progressNumberActive]}>
                {s}
              </Text>
            </View>
            {s < 3 && (
              <View style={[styles.progressLine, step > s && styles.progressLineActive]} />
            )}
          </View>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Blood Requirements</Text>
            <Text style={styles.stepDescription}>
              Tell us what blood type you need
            </Text>

            <TouchableOpacity
              style={styles.picker}
              onPress={() => setShowBloodGroupPicker(!showBloodGroupPicker)}
            >
              <Text style={styles.pickerLabel}>Blood Group Needed</Text>
              <View style={styles.pickerButton}>
                <Text style={[styles.pickerText, !bloodGroup && styles.placeholderText]}>
                  {bloodGroup || 'Select blood group'}
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

            <Input
              label="Quantity Needed"
              placeholder="e.g., 2 units"
              leftIcon="water-outline"
            />

            <View style={styles.urgencyContainer}>
              <Text style={styles.urgencyLabel}>Urgency Level</Text>
              <View style={styles.urgencyButtons}>
                {['Low', 'Medium', 'High'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[styles.urgencyButton, level === 'High' && styles.urgencyButtonActive]}
                  >
                    <Text
                      style={[
                        styles.urgencyButtonText,
                        level === 'High' && styles.urgencyButtonTextActive,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Hospital Information</Text>
            <Text style={styles.stepDescription}>
              Where should donors come?
            </Text>

            <Input
              label="Hospital Name"
              placeholder="Enter hospital name"
              leftIcon="medical-outline"
            />

            <Input
              label="Hospital Address"
              placeholder="Enter full address"
              leftIcon="location-outline"
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity style={styles.mapButton}>
              <Ionicons name="map" size={20} color={Colors.secondary} />
              <Text style={styles.mapButtonText}>Select on Map</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Additional Details</Text>
            <Text style={styles.stepDescription}>
              Any other information for donors
            </Text>

            <Input
              label="Needed By"
              placeholder="Date and time"
              leftIcon="calendar-outline"
            />

            <Input
              label="Contact Number"
              placeholder="Your phone number"
              leftIcon="call-outline"
              keyboardType="phone-pad"
            />

            <Input
              label="Additional Notes"
              placeholder="Any special requirements or information"
              multiline
              numberOfLines={4}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={step === 3 ? 'Submit Request' : 'Next'}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border.medium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  progressCircleActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  progressNumber: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.secondary,
  },
  progressNumberActive: {
    color: Colors.white,
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.border.medium,
    marginHorizontal: Spacing.xs,
  },
  progressLineActive: {
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  stepTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  stepDescription: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
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
  urgencyContainer: {
    marginBottom: Spacing.md,
  },
  urgencyLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  urgencyButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    alignItems: 'center',
  },
  urgencyButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  urgencyButtonText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  urgencyButtonTextActive: {
    color: Colors.white,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm + 4,
    marginBottom: Spacing.md,
  },
  mapButtonText: {
    color: Colors.secondary,
    fontSize: Typography.fontSize.base,
    marginLeft: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  nextButton: {
    width: '100%',
  },
});
