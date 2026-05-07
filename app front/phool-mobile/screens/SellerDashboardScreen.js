/**
 * SELLER DASHBOARD SCREEN
 * 
 * FEATURES:
 * - Sales Statistics (Total Sales, Orders)
 * - Order Status Tracking (Pending, Processing, etc.)
 * - Performance Metrics (Fulfillment, Dispatch Time)
 * - Critical Inventory Alerts
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, Package, Clock, Star, Plus, ChevronRight, BarChart3, AlertCircle, CheckCircle2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// --- 1. SUB-COMPONENTS ---
const StatCard = ({ title, value, subValue, icon: Icon, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
      <Icon size={24} color={color} />
    </View>
    <View style={styles.statInfo}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={[styles.statSubValue, { color: subValue.startsWith('+') ? '#4CAF50' : '#F44336' }]}>
        {subValue} <Text style={{ color: '#9e9e9e' }}>vs last week</Text>
      </Text>
    </View>
  </View>
);

const OrderStatusItem = ({ label, count, color }) => (
  <View style={styles.statusItem}>
    <View style={[styles.statusDot, { backgroundColor: color }]} />
    <Text style={styles.statusLabel}>{label}</Text>
    <Text style={styles.statusCount}>{count}</Text>
  </View>
);

const SellerDashboardScreen = () => {
  // --- 2. HOOKS & STATE ---
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 3. HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Seller Dashboard</Text>
          <TouchableOpacity style={styles.notificationBtn}>
            <View style={styles.dot} />
            <Clock size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.sellerProfile}>
          <View style={styles.sellerAvatar}>
            <Text style={styles.avatarText}>PB</Text>
          </View>
          <View>
            <Text style={styles.sellerName}>Phool Basket Official</Text>
            <View style={styles.ratingRow}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>4.8 (2.4k Reviews)</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* 4. NAVIGATION TABS */}
        <View style={styles.tabsContainer}>
          {['Overview', 'Orders', 'Inventory', 'Finance'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'Overview' && (
          <View style={styles.content}>
            {/* 5. SALES STATISTICS */}
            <View style={styles.statsGrid}>
              <StatCard
                title="Total Sales"
                value="₹1,24,500"
                subValue="+12.5%"
                icon={TrendingUp}
                color="#6B38FB"
              />
              <StatCard
                title="Total Orders"
                value="452"
                subValue="+8.2%"
                icon={Package}
                color="#00A651"
              />
            </View>

            {/* 6. ORDER STATUS CARD */}
            <View style={styles.sectionCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Order Status</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View Orders</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.statusGrid}>
                <OrderStatusItem label="Pending" count="12" color="#FF9800" />
                <OrderStatusItem label="Processing" count="24" color="#2196F3" />
                <OrderStatusItem label="Shipped" count="156" color="#9C27B0" />
                <OrderStatusItem label="Delivered" count="260" color="#4CAF50" />
              </View>
            </View>

            {/* 7. PERFORMANCE CARD */}
            <View style={styles.sectionCard}>
              <Text style={styles.cardTitle}>Performance Metrics</Text>
              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <BarChart3 size={20} color="#6B38FB" />
                  <View style={styles.metricDetails}>
                    <Text style={styles.metricLabel}>Fulfillment Rate</Text>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: '98%', backgroundColor: '#4CAF50' }]} />
                    </View>
                  </View>
                  <Text style={styles.metricValue}>98%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Clock size={20} color="#FF9800" />
                  <View style={styles.metricDetails}>
                    <Text style={styles.metricLabel}>Avg. Dispatch Time</Text>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: '85%', backgroundColor: '#2196F3' }]} />
                    </View>
                  </View>
                  <Text style={styles.metricValue}>2h 15m</Text>
                </View>
              </View>
            </View>

            {/* 8. CRITICAL ALERTS */}
            <View style={[styles.sectionCard, { backgroundColor: '#FFF3E0', borderColor: '#FFE0B2', borderWidth: 1 }]}>
              <View style={styles.alertHeader}>
                <AlertCircle size={20} color="#E65100" />
                <Text style={styles.alertTitle}>Critical Inventory Alerts</Text>
              </View>
              <Text style={styles.alertText}>3 products are running extremely low on stock. Restock soon to avoid losing sales.</Text>
              <TouchableOpacity style={styles.alertBtn}>
                <Text style={styles.alertBtnText}>Review Inventory</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.addProductBtn}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Plus size={24} color="#fff" />
            <Text style={styles.addProductText}>Add New Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // --- CORE STYLES ---
  safeArea: {
    flex: 1,
    backgroundColor: '#6B38FB', // Brand Purple
  },
  header: {
    padding: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: '#6B38FB',
  },
  sellerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#6B38FB',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sellerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 15,
    marginTop: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6B38FB',
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    width: (width - 45) / 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statSubValue: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  viewAllText: {
    color: '#6B38FB',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  statusItem: {
    width: (width - 95) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusLabel: {
    flex: 1,
    fontSize: 12,
    color: '#666',
  },
  statusCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  metricsContainer: {
    marginTop: 5,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  metricDetails: {
    flex: 1,
    marginHorizontal: 15,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
    marginLeft: 8,
  },
  alertText: {
    fontSize: 12,
    color: '#795548',
    lineHeight: 18,
    marginBottom: 12,
  },
  alertBtn: {
    backgroundColor: '#E65100',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomActions: {
    padding: 15,
    paddingBottom: 30,
  },
  addProductBtn: {
    backgroundColor: '#6B38FB',
    flexDirection: 'row',
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#6B38FB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addProductText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SellerDashboardScreen;
