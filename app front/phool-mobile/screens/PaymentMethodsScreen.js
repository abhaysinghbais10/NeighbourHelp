/**
 * PAYMENT METHODS SCREEN
 * 
 * SECTIONS:
 * 1. Saved Cards (Context based)
 * 2. UPI (Expandable)
 * 3. Wallets (Paytm/Amazon Pay)
 * 4. Net Banking (Quick Select + All Banks Modal)
 * 5. Cash on Delivery
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, CreditCard, ChevronRight, Trash2, AlertCircle, X, Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { usePayment } from '../context/PaymentContext';

const PaymentMethodsScreen = () => {
  // --- 1. HOOKS & STATE ---
  const navigation = useNavigation();
  const { cards, addCard, removeCard, setDefaultCard } = usePayment();
  
  // UI State
  const [expandedOption, setExpandedOption] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('saved_card');
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);
  const [bankSearch, setBankSearch] = useState('');

  // --- 2. DATA ---
  const ALL_BANKS = [
    'HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 
    'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 
    'Canara Bank', 'Union Bank of India', 'IndusInd Bank', 
    'IDBI Bank', 'Yes Bank', 'Federal Bank', 'Central Bank of India',
    'Indian Bank', 'UCO Bank', 'Bank of India', 'Standard Chartered'
  ];

  // --- 3. HELPER FUNCTIONS ---
  const getCardIcon = (brand) => {
    switch (brand) {
      case 'visa': return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png';
      case 'mastercard': return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png';
      default: return null;
    }
  };

  const filteredBanks = ALL_BANKS.filter(bank => 
    bank.toLowerCase().includes(bankSearch.toLowerCase())
  );

  // --- 4. EVENT HANDLERS ---
  const handleAddNew = () => navigation.navigate('AddCard');
  
  const toggleOption = (option) => setExpandedOption(expandedOption === option ? null : option);

  const handleLinkUpi = () => {
    if (!upiId.includes('@')) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI ID (e.g., name@bank).');
      return;
    }
    Alert.alert('UPI Linked', `Successfully linked UPI ID: ${upiId}`);
    setExpandedOption(null);
    setUpiId('');
  };

  const handleSelectBank = (bankName) => {
    Alert.alert('Redirecting', `Redirecting to ${bankName} Net Banking portal...`);
    setExpandedOption(null);
  };

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
    Alert.alert('Payment Method Selected', `You have selected ${methodId.replace('_', ' ')} as your primary payment method.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* 2. SAVED CARDS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {cards.length === 0 ? (
            <View style={styles.emptyCards}>
              <AlertCircle size={40} color="#bdbdbd" />
              <Text style={styles.emptyText}>No cards saved yet.</Text>
            </View>
          ) : (
            cards.map((card) => (
              <TouchableOpacity 
                key={card.id} 
                style={[styles.cardItem, card.isDefault && styles.defaultCardItem]}
                onPress={() => {
                  setDefaultCard(card.id);
                  setSelectedMethod(`card_${card.id}`);
                }}
              >
                <View style={styles.cardInfo}>
                  <View style={styles.cardBrandContainer}>
                    <Image 
                      source={{ uri: getCardIcon(card.brand) }} 
                      style={styles.cardBrandLogo} 
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cardDetails}>
                    <Text style={styles.cardNumber}>•••• •••• •••• {card.last4}</Text>
                    <Text style={styles.cardExpiry}>Expires {card.expiry}</Text>
                    {card.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => removeCard(card.id)}
                  >
                    <Trash2 size={20} color="#757575" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* 3. ADD NEW BUTTON */}
        <TouchableOpacity style={styles.addNewButton} onPress={handleAddNew}>
          <View style={styles.addNewIconContainer}>
            <Plus size={24} color="#D32F2F" />
          </View>
          <Text style={styles.addNewText}>Add New Payment Method</Text>
        </TouchableOpacity>

        {/* 4. OTHER PAYMENT OPTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Options</Text>
          
          {/* UPI Option */}
          <View style={styles.expandableOptionContainer}>
            <TouchableOpacity 
              style={[styles.otherOption, expandedOption === 'upi' && styles.otherOptionExpanded]}
              onPress={() => toggleOption('upi')}
            >
              <View style={styles.otherOptionIconContainer}>
                <Image 
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png' }} 
                  style={styles.otherOptionLogo} 
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.otherOptionText}>UPI (GPay, PhonePe, Paytm)</Text>
              <ChevronRight 
                size={20} 
                color="#bdbdbd" 
                style={{ transform: [{ rotate: expandedOption === 'upi' ? '90deg' : '0deg' }] }}
              />
            </TouchableOpacity>
            
            {expandedOption === 'upi' && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedLabel}>Enter UPI ID</Text>
                <TextInput
                  style={styles.upiInput}
                  placeholder="e.g., username@bank"
                  value={upiId}
                  onChangeText={setUpiId}
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.verifyButton} onPress={handleLinkUpi}>
                  <Text style={styles.verifyButtonText}>Verify & Pay</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Wallets Option */}
          <View style={styles.expandableOptionContainer}>
            <TouchableOpacity 
              style={[styles.otherOption, expandedOption === 'wallets' && styles.otherOptionExpanded]}
              onPress={() => toggleOption('wallets')}
            >
              <View style={styles.otherOptionIconContainer}>
                <Image 
                  source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/free-paytm-226448.png' }} 
                  style={styles.otherOptionLogo} 
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.otherOptionText}>Wallets (Paytm, Amazon Pay)</Text>
              <ChevronRight 
                size={20} 
                color="#bdbdbd" 
                style={{ transform: [{ rotate: expandedOption === 'wallets' ? '90deg' : '0deg' }] }}
              />
            </TouchableOpacity>
            
            {expandedOption === 'wallets' && (
              <View style={styles.expandedContent}>
                <View style={styles.walletRow}>
                  <TouchableOpacity style={styles.walletBtn} onPress={() => handleSelectMethod('Paytm Wallet')}>
                    <Text style={styles.walletBtnText}>Link Paytm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.walletBtn} onPress={() => handleSelectMethod('Amazon Pay')}>
                    <Text style={styles.walletBtnText}>Link Amazon Pay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Net Banking Option */}
          <View style={styles.expandableOptionContainer}>
            <TouchableOpacity 
              style={[styles.otherOption, expandedOption === 'netbanking' && styles.otherOptionExpanded]}
              onPress={() => toggleOption('netbanking')}
            >
              <View style={styles.otherOptionIconContainer}>
                <CreditCard size={20} color="#757575" />
              </View>
              <Text style={styles.otherOptionText}>Net Banking</Text>
              <ChevronRight 
                size={20} 
                color="#bdbdbd" 
                style={{ transform: [{ rotate: expandedOption === 'netbanking' ? '90deg' : '0deg' }] }}
              />
            </TouchableOpacity>
            
            {expandedOption === 'netbanking' && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedLabel}>Popular Banks</Text>
                <View style={styles.bankGrid}>
                  {['HDFC', 'SBI', 'ICICI', 'Axis'].map((bank) => (
                    <TouchableOpacity 
                      key={bank} 
                      style={styles.bankButton}
                      onPress={() => handleSelectBank(bank)}
                    >
                      <Text style={styles.bankButtonText}>{bank}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity 
                  style={styles.viewAllBanksButton}
                  onPress={() => setIsBankModalVisible(true)}
                >
                  <Text style={styles.viewAllBanksText}>View All Banks</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* COD Option */}
          <TouchableOpacity 
            style={styles.codOption}
            onPress={() => handleSelectMethod('Cash on Delivery')}
          >
            <View style={styles.otherOptionIconContainer}>
              <View style={styles.codIcon}>
                <Text style={styles.codIconText}>₹</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.otherOptionText}>Cash on Delivery</Text>
              <Text style={styles.codSubtitle}>Pay when you receive your order</Text>
            </View>
            <View style={styles.selectionCircle} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 5. ALL BANKS MODAL */}
      <Modal
        visible={isBankModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBankModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Bank</Text>
              <TouchableOpacity onPress={() => setIsBankModalVisible(false)}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <Search size={20} color="#757575" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search your bank"
                value={bankSearch}
                onChangeText={setBankSearch}
              />
            </View>

            <FlatList
              data={filteredBanks}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.bankListItem}
                  onPress={() => {
                    handleSelectBank(item);
                    setIsBankModalVisible(false);
                  }}
                >
                  <Text style={styles.bankListText}>{item}</Text>
                  <ChevronRight size={18} color="#bdbdbd" />
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  // --- SAVED CARD STYLES ---
  cardItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  defaultCardItem: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFFBFB',
  },
  emptyCards: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  emptyText: {
    marginTop: 10,
    color: '#757575',
    fontSize: 14,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBrandContainer: {
    width: 60,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardBrandLogo: {
    width: 40,
    height: 25,
  },
  cardDetails: {
    justifyContent: 'center',
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardExpiry: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  defaultBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cardActions: {
    paddingLeft: 10,
  },
  actionButton: {
    padding: 5,
  },
  // --- ADD BUTTON STYLES ---
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
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
  // --- OTHER OPTIONS STYLES (UPI, Netbanking, COD) ---
  otherOption: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },
  otherOptionExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  otherOptionIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  otherOptionLogo: {
    width: 30,
    height: 30,
  },
  otherOptionText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  expandableOptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  expandedContent: {
    padding: 15,
    backgroundColor: '#FAFAFA',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  expandedLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
    fontWeight: '500',
  },
  upiInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    fontSize: 14,
  },
  verifyButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bankGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  bankButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '47%',
    alignItems: 'center',
  },
  bankButtonText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500',
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  walletBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  walletBtnText: {
    color: '#6B38FB',
    fontSize: 13,
    fontWeight: 'bold',
  },
  codOption: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  codIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codIconText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codSubtitle: {
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
  },
  selectionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#bdbdbd',
  },
  // --- MODAL STYLES ---
  viewAllBanksButton: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 5,
  },
  viewAllBanksText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  bankListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bankListText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
});

export default PaymentMethodsScreen;
