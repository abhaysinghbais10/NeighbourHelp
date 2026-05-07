/**
 * FAVORITES SCREEN (LIKED PAGE)
 * 
 * FEATURES:
 * - Product Grid (Filtered by FavoritesContext)
 * - Navigation to Product Detail
 * - Empty State with CTA
 */

import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const FavoritesScreen = () => {
  // --- 1. HOOKS & DATA ---
  const navigation = useNavigation();
  const { favorites } = useFavorites();
  
  // Filter products that are in the favorites list
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      
      {/* 2. HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      {favoriteProducts.length === 0 ? (
        /* 3. EMPTY STATE SECTION */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Heart size={60} color="#D32F2F" fill="#FFEBEE" />
          </View>
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtitle}>
            Save items that you like in your wishlist. Review them anytime and easily move them to the cart.
          </Text>
          <TouchableOpacity 
            style={styles.shopNowBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopNowText}>START SHOPPING</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* 4. FAVORITES GRID */
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.infoRow}>
            <Text style={styles.countText}>{favoriteProducts.length} Items found</Text>
          </View>
          <View style={styles.grid}>
            {favoriteProducts.map(product => (
              <View key={product.id} style={styles.cardWrapper}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // --- CORE STYLES ---
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
  infoRow: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '600',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 22,
  },
  shopNowBtn: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  shopNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default FavoritesScreen;
