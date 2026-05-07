/**
 * ADD PRODUCT SCREEN (SELLER TOOL)
 * 
 * FEATURES:
 * - Image Preview & Upload (Mock)
 * - Pricing & Stock Logic
 * - Category Selection
 * - Description & Metadata
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Package, Tag, IndianRupee, AlignLeft, Layers, Camera, Save } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const AddProductScreen = () => {
  // --- 1. HOOKS & STATE ---
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=800' // Default placeholder
  });

  const categories = ['Flowers', 'Cakes', 'Gifts', 'Plants', 'Personalized'];

  // --- 2. HANDLERS ---
  const handleSave = () => {
    const { name, price, category, description, stock } = formData;
    
    if (!name || !price || !category || !description || !stock) {
      Alert.alert('Incomplete Form', 'Please fill all fields to list your product.');
      return;
    }

    Alert.alert(
      'Product Listed!', 
      `${name} has been added to your inventory and is now live for customers.`,
      [{ text: 'Great!', onPress: () => navigation.goBack() }]
    );
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 3. HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Product</Text>
        <TouchableOpacity style={styles.saveHeaderBtn} onPress={handleSave}>
          <Text style={styles.saveHeaderBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* 4. IMAGE UPLOAD SECTION */}
          <TouchableOpacity style={styles.imageUpload}>
            <Image source={{ uri: formData.imageUrl }} style={styles.previewImage} />
            <View style={styles.imageOverlay}>
              <Camera size={30} color="#fff" />
              <Text style={styles.imageText}>Change Product Image</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.form}>
            {/* 5. PRODUCT DETAILS (Name, Price, Stock) */}
            <Text style={styles.label}>Product Name</Text>
            <View style={styles.inputWrapper}>
              <Package size={20} color="#757575" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. Red Rose Bouquet"
                value={formData.name}
                onChangeText={(v) => updateField('name', v)}
              />
            </View>

            {/* Price & Stock */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Price (₹)</Text>
                <View style={styles.inputWrapper}>
                  <IndianRupee size={20} color="#757575" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="999"
                    keyboardType="numeric"
                    value={formData.price}
                    onChangeText={(v) => updateField('price', v)}
                  />
                </View>
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Stock Qty</Text>
                <View style={styles.inputWrapper}>
                  <Layers size={20} color="#757575" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="50"
                    keyboardType="numeric"
                    value={formData.stock}
                    onChangeText={(v) => updateField('stock', v)}
                  />
                </View>
              </View>
            </View>

            {/* 6. CATEGORY SELECTION */}
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {categories.map((cat) => (
                <TouchableOpacity 
                  key={cat}
                  style={[styles.catTab, formData.category === cat && styles.activeCatTab]}
                  onPress={() => updateField('category', cat)}
                >
                  <Text style={[styles.catTabText, formData.category === cat && styles.activeCatTabText]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* 7. DESCRIPTION SECTION */}
            <Text style={styles.label}>Description</Text>
            <View style={[styles.inputWrapper, { height: 120, alignItems: 'flex-start', paddingTop: 12 }]}>
              <AlignLeft size={20} color="#757575" style={styles.icon} />
              <TextInput
                style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
                placeholder="Describe your product (materials, care instructions, delivery details...)"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(v) => updateField('description', v)}
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
              <Save size={20} color="#fff" />
              <Text style={styles.submitBtnText}>LIST PRODUCT NOW</Text>
            </TouchableOpacity>
          </View>
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
  saveHeaderBtn: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: '#F3E5F5',
    borderRadius: 15,
  },
  saveHeaderBtnText: {
    color: '#6B38FB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  container: {
    paddingBottom: 40,
  },
  imageUpload: {
    height: 250,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
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
  categoryScroll: {
    marginBottom: 20,
  },
  catTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  activeCatTab: {
    backgroundColor: '#6B38FB',
    borderColor: '#6B38FB',
  },
  catTabText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  activeCatTabText: {
    color: '#fff',
  },
  submitBtn: {
    backgroundColor: '#6B38FB',
    height: 55,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    shadowColor: '#6B38FB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default AddProductScreen;
