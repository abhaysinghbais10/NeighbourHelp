import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Gift, Package, Tag, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

// --- NOTIFICATION TYPES & MOCK DATA ---
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Order Delivered Successfully!',
    description: 'Your order #PB-10293 has been delivered to the recipient.',
    time: '2 hours ago',
    type: 'order',
    read: false,
  },
  {
    id: '2',
    title: 'Flash Sale: 50% OFF on Roses',
    description: 'Use code ROSE50 at checkout to avail this exclusive offer. Valid for 24 hours only!',
    time: '5 hours ago',
    type: 'promo',
    read: true,
  },
  {
    id: '3',
    title: 'Order Dispatched',
    description: 'Your order #PB-10293 is out for delivery. Track your order for more details.',
    time: '1 day ago',
    type: 'order',
    read: true,
  },
  {
    id: '4',
    title: 'Welcome to Phool Basket!',
    description: 'Thank you for joining us. Here is a 10% discount on your first order. Code: WELCOME10',
    time: '2 days ago',
    type: 'info',
    read: true,
  },
];

const getIconForType = (type) => {
  switch (type) {
    case 'order':
      return <Package size={24} color="#2196F3" />;
    case 'promo':
      return <Tag size={24} color="#FF9800" />;
    case 'info':
    default:
      return <Info size={24} color="#4CAF50" />;
  }
};

const getIconBackgroundColor = (type) => {
  switch (type) {
    case 'order':
      return '#E3F2FD';
    case 'promo':
      return '#FFF3E0';
    case 'info':
    default:
      return '#E8F5E9';
  }
};

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(n =>
    filter === 'all' ? true : (filter === 'orders' ? n.type === 'order' : n.type === 'promo')
  );

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor(item.type) }]}>
        {getIconForType(item.type)}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, !item.read && styles.unreadText]} numberOfLines={1}>
            {item.title}
          </Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.footerRow}>
          <Text style={styles.timeText}>{item.time}</Text>
          <TouchableOpacity onPress={() => deleteNotification(item.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Read All</Text>
        </TouchableOpacity>
      </View>

      {/* 5. CATEGORY FILTERS */}
      <View style={styles.filterContainer}>
        {['all', 'orders', 'offers'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterTab, filter === type && styles.activeTab]}
            onPress={() => setFilter(type)}
          >
            <Text style={[styles.filterTabText, filter === type && styles.activeTabText]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 6. NOTIFICATION LIST */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Bell size={64} color="#e0e0e0" />
            <Text style={styles.emptyText}>No {filter !== 'all' ? filter : ''} notifications</Text>
            <Text style={styles.emptySubtext}>When you get notifications, they'll show up here.</Text>
          </View>
        }
      />
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
  markAllText: {
    fontSize: 14,
    color: '#D32F2F',
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTab: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#D32F2F',
  },
  filterTabText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  unreadCard: {
    backgroundColor: '#FFF8F8', // Light red tint for unread
    borderLeftWidth: 3,
    borderLeftColor: '#D32F2F',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  unreadText: {
    color: '#000',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D32F2F',
    marginLeft: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#999',
  },
  deleteText: {
    fontSize: 11,
    color: '#D32F2F',
    fontWeight: '600',
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
  },
});

export default NotificationsScreen;
