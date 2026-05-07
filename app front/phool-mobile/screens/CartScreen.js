import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <View style={styles.emptyIconContainer}>
            <ShoppingBag size={80} color="#ccc" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty!</Text>
          <Text style={styles.emptySubtitle}>Add some gifts to make someone's day special.</Text>
          <TouchableOpacity 
            style={styles.shopNowBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
                
                <View style={styles.itemActions}>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity 
                      style={styles.qtyBtn} 
                      onPress={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id, -1);
                        } else {
                          removeFromCart(item.id);
                        }
                      }}
                    >
                      <Minus size={14} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={14} color="#333" />
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.removeBtn}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={16} color="#D32F2F" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalPrice}>₹{cartTotal}</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  emptyIconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  shopNowBtn: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  shopNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartList: {
    flex: 1,
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  qtyBtn: {
    padding: 8,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
  },
  removeBtn: {
    padding: 5,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  checkoutBtn: {
    backgroundColor: '#D32F2F',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CartScreen;
