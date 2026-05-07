/**
 * ADD ADDRESS SCREEN
 * 
 * FEATURES:
 * - Address Type Selection (Home, Work, Other)
 * - Contact & Location Details
 * - Form Validation
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Phone, MapPin, Building, Home, Briefcase, Building2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAddress } from '../context/AddressContext';

const AddAddressScreen = () => {
  // --- 1. HOOKS & STATE ---
  const navigation = useNavigation();
  const { addAddress } = useAddress();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    label: 'Home' // Default label
  });

  // --- 2. HANDLERS ---
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const { name, phone, pincode, address, city, state } = formData;
    
    if (!name || !phone || !pincode || !address || !city || !state) {
      Alert.alert('Error', 'Please fill all fields to save your address.');
      return;
    }

    if (phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    addAddress({
      name,
      phone: `+91 ${phone}`,
      zipCode: pincode,
      street: address,
      city,
      state,
      label: formData.label,
    });

    Alert.alert('Success', 'Address saved successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const labels = [
    { name: 'Home', icon: <Home size={18} color={formData.label === 'Home' ? '#fff' : '#757575'} /> },
    { name: 'Work', icon: <Briefcase size={18} color={formData.label === 'Work' ? '#fff' : '#757575'} /> },
    { name: 'Other', icon: <Building2 size={18} color={formData.label === 'Other' ? '#fff' : '#757575'} /> }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 3. HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Address</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* 4. ADDRESS TYPE SELECTION */}
          <Text style={styles.sectionLabel}>Address Type</Text>
          <View style={styles.labelRow}>
            {labels.map((item) => (
              <TouchableOpacity 
                key={item.name}
                style={[styles.labelBtn, formData.label === item.name && styles.activeLabelBtn]}
                onPress={() => updateField('label', item.name)}
              >
                {item.icon}
                <Text style={[styles.labelBtnText, formData.label === item.name && styles.activeLabelBtnText]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 5. CONTACT DETAILS */}
          <Text style={styles.sectionLabel}>Contact Details</Text>
          <View style={styles.inputWrapper}>
            <User size={20} color="#757575" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(v) => updateField('name', v)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Phone size={20} color="#757575" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={formData.phone}
              onChangeText={(v) => updateField('phone', v)}
            />
          </View>

          {/* 6. ADDRESS DETAILS */}
          <Text style={styles.sectionLabel}>Address Details</Text>
          <View style={styles.inputWrapper}>
            <MapPin size={20} color="#757575" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              keyboardType="numeric"
              maxLength={6}
              value={formData.pincode}
              onChangeText={(v) => updateField('pincode', v)}
            />
          </View>

          <View style={[styles.inputWrapper, { height: 100, alignItems: 'flex-start', paddingTop: 12 }]}>
            <Building size={20} color="#757575" style={styles.icon} />
            <TextInput
              style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
              placeholder="House No, Building Name, Street"
              multiline
              numberOfLines={3}
              value={formData.address}
              onChangeText={(v) => updateField('address', v)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]}>
              <TextInput
                style={styles.input}
                placeholder="City"
                value={formData.city}
                onChangeText={(v) => updateField('city', v)}
              />
            </View>
            <View style={[styles.inputWrapper, { flex: 1, marginLeft: 10 }]}>
              <TextInput
                style={styles.input}
                placeholder="State"
                value={formData.state}
                onChangeText={(v) => updateField('state', v)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>SAVE ADDRESS</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    borderBottomColor: '#eee',
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  labelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  activeLabelBtn: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },
  labelBtnText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 8,
    fontWeight: '600',
  },
  activeLabelBtnText: {
    color: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fafafa',
    height: 55,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: '#D32F2F',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default AddAddressScreen;
