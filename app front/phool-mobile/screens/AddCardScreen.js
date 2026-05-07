import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Calendar, Lock, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { usePayment } from '../context/PaymentContext';

const AddCardScreen = () => {
  const navigation = useNavigation();
  const { addCard } = usePayment();
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted.substring(0, 19));
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) {
      setExpiry(cleaned);
    } else {
      setExpiry(`${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`);
    }
  };

  const handleSave = () => {
    if (cardNumber.length < 19 || expiry.length < 5 || cvv.length < 3 || !cardHolder) {
      Alert.alert('Error', 'Please fill all fields correctly.');
      return;
    }

    const last4 = cardNumber.slice(-4);
    const brand = cardNumber.startsWith('4') ? 'visa' : 'mastercard';

    addCard({
      type: brand === 'visa' ? 'Visa' : 'Mastercard',
      last4: last4,
      expiry: expiry,
      brand: brand,
      cardHolder: cardHolder,
    });

    Alert.alert('Success', 'Card added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Card Preview */}
          <View style={[styles.cardPreview, { backgroundColor: cardNumber.startsWith('4') ? '#1A237E' : '#37474F' }]}>
            <View style={styles.cardPreviewTop}>
              <CreditCard size={32} color="#fff" />
              <Text style={styles.bankName}>PHOOL BANK</Text>
            </View>
            <Text style={styles.previewNumber}>
              {cardNumber || '•••• •••• •••• ••••'}
            </Text>
            <View style={styles.cardPreviewBottom}>
              <View>
                <Text style={styles.previewLabel}>CARD HOLDER</Text>
                <Text style={styles.previewValue}>{cardHolder.toUpperCase() || 'YOUR NAME'}</Text>
              </View>
              <View>
                <Text style={styles.previewLabel}>EXPIRES</Text>
                <Text style={styles.previewValue}>{expiry || 'MM/YY'}</Text>
              </View>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <View style={styles.inputWrapper}>
                <CreditCard size={20} color="#757575" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                  value={cardNumber}
                  onChangeText={formatCardNumber}
                  maxLength={19}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Holder Name</Text>
              <View style={styles.inputWrapper}>
                <User size={20} color="#757575" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={cardHolder}
                  onChangeText={setCardHolder}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <View style={styles.inputWrapper}>
                  <Calendar size={20} color="#757575" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    value={expiry}
                    onChangeText={formatExpiry}
                    maxLength={5}
                  />
                </View>
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>CVV</Text>
                <View style={styles.inputWrapper}>
                  <Lock size={20} color="#757575" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={setCvv}
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>SAVE CARD</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  cardPreview: {
    height: 200,
    borderRadius: 16,
    padding: 25,
    justifyContent: 'space-between',
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardPreviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  previewNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 4,
    textAlign: 'center',
    marginVertical: 20,
  },
  cardPreviewBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    marginBottom: 4,
  },
  previewValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
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
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default AddCardScreen;
