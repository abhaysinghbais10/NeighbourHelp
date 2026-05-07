import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight, Package, Clock, CheckCircle, Truck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const MOCK_ORDERS = [
  {
    id: 'PB-10293',
    date: '24 May 2026',
    status: 'Delivered',
    total: '1,299',
    items: [
      { name: 'Mixed Roses & Lilies Bouquet', price: 899, quantity: 1, image: 'https://images.unsplash.com/photo-1522673607200-16488352475b?w=400&q=80' },
      { name: 'Chocolate Box', price: 400, quantity: 1, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1522673607200-16488352475b?w=400&q=80',
    productName: 'Mixed Roses & Lilies Bouquet',
  },
  {
    id: 'PB-10285',
    date: '15 May 2026',
    status: 'Shipped',
    total: '849',
    items: [
      { name: 'Red Rose Bouquet', price: 849, quantity: 1, image: 'https://images.unsplash.com/photo-1561181286-d3efa7dcca1a?w=400&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1561181286-d3efa7dcca1a?w=400&q=80',
    productName: 'Red Rose Bouquet',
  },
  {
    id: 'PB-10271',
    date: '02 May 2026',
    status: 'Cancelled',
    total: '2,100',
    items: [
      { name: 'Luxury Orchid Arrangement', price: 2100, quantity: 1, image: 'https://images.unsplash.com/photo-1591880911703-f8420e8d812c?w=400&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1591880911703-f8420e8d812c?w=400&q=80',
    productName: 'Luxury Orchid Arrangement',
  },
];

const StatusBadge = ({ status }) => {
  let bgColor = '#f5f5f5';
  let textColor = '#666';
  let Icon = Clock;

  switch (status) {
    case 'Delivered':
      bgColor = '#E8F5E9';
      textColor = '#4CAF50';
      Icon = CheckCircle;
      break;
    case 'Shipped':
      bgColor = '#E3F2FD';
      textColor = '#2196F3';
      Icon = Truck;
      break;
    case 'Cancelled':
      bgColor = '#FFEBEE';
      textColor = '#D32F2F';
      Icon = Package;
      break;
  }

  return (
    <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
      <Icon size={12} color={textColor} style={{ marginRight: 4 }} />
      <Text style={[styles.statusText, { color: textColor }]}>{status}</Text>
    </View>
  );
};

const OrdersScreen = () => {
  const navigation = useNavigation();

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetails', { order: item })}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>
      
      <View style={styles.orderBody}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.orderDetails}>
          <Text style={styles.productName} numberOfLines={1}>{item.productName}</Text>
          <Text style={styles.itemCount}>{item.items.length} {item.items.length > 1 ? 'items' : 'item'}</Text>
          <Text style={styles.orderTotal}>₹{item.total}</Text>
        </View>
        <ChevronRight size={20} color="#bdbdbd" />
      </View>
      
      <View style={styles.orderFooter}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('OrderDetails', { order: item })}
        >
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        {item.status === 'Delivered' && (
          <TouchableOpacity style={[styles.actionButton, styles.reorderButton]}>
            <Text style={[styles.actionButtonText, styles.reorderButtonText]}>Reorder</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Package size={64} color="#e0e0e0" />
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>Your order history will appear here once you place an order.</Text>
            <TouchableOpacity 
              style={styles.shopNowButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopNowButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        }
      />
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
  listContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  orderBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  orderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  orderFooter: {
    flexDirection: 'row',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  reorderButton: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },
  reorderButtonText: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 25,
  },
  shopNowButton: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
