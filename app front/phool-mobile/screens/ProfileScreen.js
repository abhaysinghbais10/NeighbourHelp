/**
 * PROFILE SCREEN
 * 
 * FEATURES:
 * - User Profile Management
 * - Activity Stats (Orders, Liked items)
 * - Seller Central Access
 * - Account Settings & Support
 */

import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Settings, ChevronRight, Package, MapPin, CreditCard, Bell, HelpCircle, LogOut, TrendingUp, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { useFavorites } from '../context/FavoritesContext';

// --- 1. SUB-COMPONENTS ---
const ProfileOption = ({ icon: Icon, title, subtitle, onPress, color = '#333' }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
      <Icon size={22} color={color} />
    </View>
    <View style={styles.optionTextContainer}>
      <Text style={[styles.optionTitle, color !== '#333' && { color }]}>{title}</Text>
      {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
    </View>
    <ChevronRight size={20} color="#bdbdbd" />
  </TouchableOpacity>
);

const ProfileScreen = () => {
  // --- 2. HOOKS & STATE ---
  const navigation = useNavigation();
  const { user } = useUser();
  const { favorites } = useFavorites();
  const favCount = favorites.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 3. HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* 4. USER INFO SECTION */}
        <View style={styles.profileHeader}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.avatar} 
            />
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>EDIT</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>

        {/* 5. STATS SECTION */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favCount}</Text>
            <Text style={styles.statLabel}>Liked</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1.5k</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* 6. SELLER CENTRAL SECTION */}
        <View style={styles.sellerSection}>
          <View style={styles.sellerCard}>
            <View style={styles.sellerCardHeader}>
              <TrendingUp size={20} color="#fff" />
              <Text style={styles.sellerCardTag}>STOREFRONT READY FOR CUSTOMERS</Text>
            </View>
            <Text style={styles.sellerCardTitle}>Grow your business with Phool Basket</Text>
            <TouchableOpacity 
              style={styles.sellerBtn}
              onPress={() => navigation.navigate('SellerDashboard')}
            >
              <Text style={styles.sellerBtnText}>Seller Dashboard</Text>
              <ArrowLeft size={18} color="#6B38FB" style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 7. ACCOUNT SETTINGS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <ProfileOption 
            icon={Package} 
            title="My Orders" 
            subtitle="Track, return, or buy things again"
            color="#4CAF50"
            onPress={() => navigation.navigate('Orders')}
          />
          <ProfileOption 
            icon={MapPin} 
            title="Saved Addresses" 
            subtitle="Manage your delivery locations"
            color="#2196F3"
            onPress={() => navigation.navigate('Addresses')}
          />
          <ProfileOption 
            icon={CreditCard} 
            title="Payment Methods" 
            subtitle="Manage your saved cards"
            color="#FF9800"
            onPress={() => navigation.navigate('PaymentMethods')}
          />
          <ProfileOption 
            icon={Heart} 
            title="My Favorites" 
            subtitle="Items you've liked"
            color="#D32F2F"
            onPress={() => navigation.navigate('Favorites')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & More</Text>
          <ProfileOption 
            icon={HelpCircle} 
            title="Help Center" 
            subtitle="FAQs and customer support"
          />
          <ProfileOption 
            icon={LogOut} 
            title="Logout" 
            color="#D32F2F"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>Phool Basket App v1.0.0</Text>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  settingsButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFECB3',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFA000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#757575',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    height: '70%',
    alignSelf: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    textTransform: 'uppercase',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#9e9e9e',
    marginTop: 2,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  versionText: {
    color: '#bdbdbd',
    fontSize: 12,
  },
  sellerSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sellerCard: {
    backgroundColor: '#6B38FB',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#6B38FB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  sellerCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sellerCardTag: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1,
  },
  sellerCardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: 24,
  },
  sellerBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  sellerBtnText: {
    color: '#6B38FB',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ProfileScreen;
