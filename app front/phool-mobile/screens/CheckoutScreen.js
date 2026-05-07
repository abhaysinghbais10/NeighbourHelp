import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, CreditCard, ChevronRight } from 'lucide-react-native';
import { useCart } from '../context/CartContext';
import { useAddress } from '../context/AddressContext';
import { usePayment } from '../context/PaymentContext';

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addresses } = useAddress();
  const { cards } = usePayment();

  const defaultCard = cards.find(card => card.isDefault) || cards[0];
  const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];

  const handlePlaceOrder = () => {
    Alert.alert(
      "Order Placed!",
      "Your order has been placed successfully. Thank you for shopping with Phool Basket!",
      [
        { 
          text: "OK", 
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
              <Text style={styles.changeBtn}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <View style={styles.iconContainer}>
              <MapPin size={20} color="#D32F2F" />
            </View>
            <View style={styles.addressInfo}>
              {defaultAddress ? (
                <>
                  <Text style={styles.userName}>{defaultAddress.name}</Text>
                  <Text style={styles.addressText}>{defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.zipCode}</Text>
                  <Text style={styles.phoneText}>{defaultAddress.phone}</Text>
                </>
              ) : (
                <Text style={styles.userName}>Select an Address</Text>
              )}
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PaymentMethods')}>
              <Text style={styles.changeBtn}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentCard}>
            <View style={styles.iconContainer}>
              <CreditCard size={20} color="#D32F2F" />
            </View>
            <View style={styles.paymentInfo}>
              {defaultCard ? (
                <>
                  <Text style={styles.paymentTitle}>{defaultCard.brand.toUpperCase()} Card</Text>
                  <Text style={styles.paymentSubtitle}>•••• •••• •••• {defaultCard.last4}</Text>
                </>
              ) : (
                <Text style={styles.paymentTitle}>Select Payment Method</Text>
              )}
            </View>
            <ChevronRight size={20} color="#ccc" />
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{cartTotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>FREE</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{cartTotal}</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>PLACE ORDER • ₹{cartTotal}</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backBtn: {
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  changeBtn: {
    fontSize: 14,
    color: '#D32F2F',
    fontWeight: '600',
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addressInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 13,
    color: '#757575',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentSubtitle: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  placeOrderBtn: {
    backgroundColor: '#D32F2F',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;
