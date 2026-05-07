/**
 * SAVED ADDRESSES SCREEN
 * 
 * FEATURES:
 * - List of saved delivery locations
 * - Set default address logic
 * - Delete address functionality
 * - Visual icons for Home/Work/Other
 */

import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Plus, Trash2, Home, Briefcase, Building } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAddress } from '../context/AddressContext';

const AddressesScreen = () => {
  // --- 1. HOOKS & STATE ---
  const navigation = useNavigation();
  const { addresses, removeAddress, setDefaultAddress } = useAddress();

  const getLabelIcon = (label) => {
    switch (label.toLowerCase()) {
      case 'home': return <Home size={20} color="#D32F2F" />;
      case 'work': return <Briefcase size={20} color="#D32F2F" />;
      default: return <Building size={20} color="#D32F2F" />;
    }
  };

  const handleAddNew = () => {
    navigation.navigate('AddAddress');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.section}>
          {addresses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MapPin size={40} color="#bdbdbd" />
              <Text style={styles.emptyText}>No saved addresses.</Text>
            </View>
          ) : (
            addresses.map((addr) => (
              <TouchableOpacity 
                key={addr.id} 
                style={[styles.addressCard, addr.isDefault && styles.defaultAddressCard]}
                onPress={() => setDefaultAddress(addr.id)}
              >
                <View style={styles.addressHeader}>
                  <View style={styles.labelContainer}>
                    <View style={styles.iconContainer}>
                      {getLabelIcon(addr.label)}
                    </View>
                    <Text style={styles.labelText}>{addr.label}</Text>
                    {addr.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity 
                    style={styles.deleteBtn}
                    onPress={() => removeAddress(addr.id)}
                  >
                    <Trash2 size={20} color="#757575" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.addressDetails}>
                  <Text style={styles.userName}>{addr.name}</Text>
                  <Text style={styles.addressText}>{addr.street}, {addr.city}</Text>
                  <Text style={styles.addressText}>{addr.state} - {addr.zipCode}</Text>
                  <Text style={styles.phoneText}>Phone: {addr.phone}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.addNewButton} onPress={handleAddNew}>
          <View style={styles.addNewIconContainer}>
            <Plus size={24} color="#D32F2F" />
          </View>
          <Text style={styles.addNewText}>Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  section: {
    padding: 20,
    paddingBottom: 10,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  defaultAddressCard: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFFBFB',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 10,
  },
  defaultBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  deleteBtn: {
    padding: 5,
  },
  addressDetails: {
    paddingLeft: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  phoneText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  emptyText: {
    marginTop: 15,
    color: '#757575',
    fontSize: 15,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  addNewIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addNewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D32F2F',
  },
});

export default AddressesScreen;
