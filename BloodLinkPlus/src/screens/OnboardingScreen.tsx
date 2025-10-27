import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { Button } from '../components';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'search' as const,
    title: 'Find Donors Nearby',
    description: 'Quickly locate verified blood donors in your area with real-time availability',
    color: Colors.secondary,
  },
  {
    id: '2',
    icon: 'map' as const,
    title: 'Interactive Map View',
    description: 'Visualize donor locations on an interactive map and connect instantly',
    color: Colors.primary,
  },
  {
    id: '3',
    icon: 'heart' as const,
    title: 'Save Lives Together',
    description: 'Join our community of heroes and make a difference in someone\'s life',
    color: Colors.success,
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={80} color={item.color} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <Button
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: Spacing.lg,
    zIndex: 10,
  },
  skipText: {
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.base,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: BorderRadius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl + 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border.light,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  button: {
    width: '100%',
  },
});
