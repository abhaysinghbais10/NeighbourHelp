import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Package, Clock, ChevronRight } from 'lucide-react-native';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params || {};

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Order not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Order Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={styles.orderDate}>Placed on {order.date}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                {order.status.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.trackingRow}>
            <View style={styles.trackingIconContainer}>
              <Package size={20} color="#D32F2F" />
            </View>
            <View style={styles.trackingInfo}>
              <Text style={styles.trackingTitle}>Order {order.status}</Text>
              <Text style={styles.trackingSubtitle}>Your order has been {order.status.toLowerCase()}</Text>
            </View>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.infoCard}>
            <MapPin size={20} color="#757575" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Home</Text>
              <Text style={styles.infoSubtitle}>Sector 62, Noida, Uttar Pradesh 201309</Text>
            </View>
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items ({order.items.length})</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity || 1}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.reorderBtn}>
                <Text style={styles.reorderText}>Review</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{order.total - 50}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>₹50</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>-₹0</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalPrice}>₹{order.total}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered': return '#4CAF50';
    case 'shipped': return '#2196F3';
    case 'cancelled': return '#F44336';
    case 'processing': return '#FF9800';
    default: return '#757575';
  }
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
  backBtn: {
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
    padding: 15,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  trackingInfo: {
    flex: 1,
  },
  trackingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  trackingSubtitle: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  infoIcon: {
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  infoSubtitle: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  itemQty: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  reorderBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D32F2F',
  },
  reorderText: {
    fontSize: 12,
    color: '#D32F2F',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
});

export default OrderDetailsScreen;
