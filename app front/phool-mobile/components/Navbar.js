/**
 * NAVBAR COMPONENT
 * 
 * FEATURES:
 * - Promo Bar (Indigo top bar)
 * - Branding (Logo icon + Title + Subtitle)
 * - Right Section (Search button, Cart with badge, Menu icon)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Search, ShoppingCart, Bell } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const navigation = useNavigation();
  const { cartCount } = useCart();

  return (
    <View style={styles.container}>
      {/* 1. TOP PROMO BAR */}
      <View style={styles.promoBar}>
        <Text style={styles.promoText}>
          SHIPPING ON ALL ORDERS ABOVE ₹999 • 🌸 FRESH BLOOMS DELIVERED
        </Text>
      </View>

      <View style={styles.navbar}>
        <View style={styles.topRow}>
          {/* 2. LOGO & BRANDING SECTION */}
          <TouchableOpacity 
            style={styles.logoContainer}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={styles.logoIconContainer}>
              <Image 
                source={require('../assets/logo.jpg')} 
                style={styles.logoIcon} 
                resizeMode="cover"
              />
            </View>
            <View style={styles.brandTextContainer}>
              <Text style={styles.brandTitle}>Phool Basket</Text>
              <Text style={styles.brandSubtitle}>GIFTS & FLOWERS</Text>
            </View>
          </TouchableOpacity>

          {/* 3. RIGHT ACTIONS SECTION (Search, Cart, Menu) */}
          <View style={styles.rightSection}>
            <View style={styles.searchBox}>
              <TouchableOpacity 
                style={styles.searchButton}
                onPress={() => navigation.navigate('Search')}
              >
                <Search size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Bell size={24} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('Cart')}
            >
              <View>
                <ShoppingCart size={24} color="#333" />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('Profile')}
            >
              <View style={styles.menuIcon}>
                <View style={styles.menuLine} />
                <View style={[styles.menuLine, { width: 15 }]} />
                <View style={styles.menuLine} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  promoBar: {
    backgroundColor: '#4B0082',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  navbar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  logoIcon: {
    width: '100%',
    height: '100%',
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#6B38FB',
    lineHeight: 20,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#00A651',
    letterSpacing: 0.5,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#6B38FB',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionItem: {
    padding: 5,
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#333',
    borderRadius: 1,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FFA000',
    borderRadius: 10,
    paddingHorizontal: 4,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default Navbar;
