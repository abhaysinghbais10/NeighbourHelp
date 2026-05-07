/**
 * HOME SCREEN
 * 
 * STRUCTURE:
 * 1. Footer Component (Branding & Info)
 * 2. Main HomeScreen Component
 *    - Navbar
 *    - CategoryBar (Flowers, Cakes, Gifts, etc.)
 *    - HeroSlider (Promotional Banners)
 *    - PromoSection (Express Delivery)
 *    - ProductGrids (Trending, Same Day)
 */

import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import Navbar from '../components/Navbar';
import CategoryBar from '../components/CategoryBar';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';

// --- SUB-COMPONENT: FOOTER ---
const Footer = () => (
  <View style={styles.footer}>
    <View style={styles.footerLogoContainer}>
      <View style={styles.logoIconContainer}>
        <Image 
          source={require('../assets/logo.jpg')} 
          style={styles.logoIcon} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.footerBrandText}>
        <Text style={styles.footerBrandTitle}>Phool Basket</Text>
        <Text style={styles.footerBrandSubtitle}>GIFTS & FLOWERS</Text>
      </View>
    </View>
    <Text style={styles.footerText}>India's largest gifting platform, delivering emotions since 1999.</Text>
    <View style={styles.footerBottom}>
      <Text style={styles.copyrightText}>© 2026 PHOOL BASKET. All rights reserved.</Text>
    </View>
  </View>
);

// --- MAIN SCREEN COMPONENT ---
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      
      {/* 1. TOP NAVIGATION */}
      <Navbar />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* 2. CATEGORY HORIZONTAL LIST */}
        <CategoryBar />

        {/* 3. MAIN PROMO SLIDER */}
        <HeroSlider />
        
        {/* 4. SPECIAL PROMO BANNER */}
        <View style={styles.promoSection}>
          <View style={styles.promoBanner}>
            <View>
              <Text style={styles.promoTitle}>Express Delivery</Text>
              <Text style={styles.promoSubtitle}>Gifts delivered in 60 minutes.</Text>
            </View>
            <View style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Explore</Text>
            </View>
          </View>
        </View>

        {/* 5. PRODUCT GRIDS (Horizontal Scroll) */}
        <ProductGrid title="Same Day Delivery" />
        <ProductGrid title="Trending Now" />
        
        {/* 6. BOTTOM FOOTER */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  promoSection: {
    padding: 15,
  },
  promoBanner: {
    backgroundColor: '#FFF8E1',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFECB3',
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#795548',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 12,
    color: '#8D6E63',
  },
  promoBtn: {
    backgroundColor: '#795548',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#2D3436',
    padding: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  footerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  logoIcon: {
    width: '100%',
    height: '100%',
  },
  footerBrandText: {
    justifyContent: 'center',
  },
  footerBrandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerBrandSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#00A651',
    letterSpacing: 0.5,
  },
  footerText: {
    color: '#B2BEC3',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  copyrightText: {
    color: '#636E72',
    fontSize: 10,
  },
});

export default HomeScreen;
