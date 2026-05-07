import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HeroSlider = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF1F1', '#FFE5E5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>NEW COLLECTION</Text>
          </View>
          <Text style={styles.title}>Gifts that tell{'\n'}a Story</Text>
          <Text style={styles.subtitle}>Celebrate every moment with curated gifts.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1549462184-b09ad0a4af60?auto=format&fit=crop&q=80&w=400' }}
          style={styles.image}
          resizeMode="cover"
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  banner: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    height: 180,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  badge: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3436',
    lineHeight: 26,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 15,
    maxWidth: '120%',
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginLeft: 10,
  },
});

export default HeroSlider;
