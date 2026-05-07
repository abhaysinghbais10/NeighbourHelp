import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search, Filter, SlidersHorizontal, Check } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { products as allProducts } from '../data/products';

const ProductListScreen = ({ route, navigation }) => {
  const { title } = route.params || { title: 'All Products' };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Recommended');
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [expressOnly, setExpressOnly] = useState(false);

  // 1. Filter by category
  const baseProducts = useMemo(() => {
    if (title === 'All Products' || title === 'View All' || title === 'Trending Now') {
      return allProducts;
    }
    if (title === 'Same Day Delivery' || title === 'Same Day') {
      return allProducts.filter(p => p.isExpress);
    }
    return allProducts.filter(p => p.category === title);
  }, [title]);

  // 2. Search and Sort
  const displayProducts = useMemo(() => {
    let filtered = baseProducts;
    
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (expressOnly) {
      filtered = filtered.filter(p => p.isExpress);
    }

    return [...filtered].sort((a, b) => {
      if (sortOption === 'Price: Low to High') return a.price - b.price;
      if (sortOption === 'Price: High to Low') return b.price - a.price;
      if (sortOption === 'Rating') return b.rating - a.rating;
      return 0;
    });
  }, [baseProducts, searchQuery, sortOption]);

  const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating'];

  const handleSortSelect = (option) => {
    setSortOption(option);
    setSortModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="#757575" />
            <TextInput 
              placeholder={`Search in ${title}`}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <TouchableOpacity 
            style={styles.filterItem}
            onPress={() => setSortModalVisible(true)}
          >
            <SlidersHorizontal size={16} color="#333" />
            <Text style={styles.filterText}>Sort: {sortOption === 'Recommended' ? 'Sort' : sortOption.split(':')[0]}</Text>
          </TouchableOpacity>
          <View style={styles.filterDivider} />
          <TouchableOpacity 
            style={styles.filterItem}
            onPress={() => setFilterModalVisible(true)}
          >
            <Filter size={16} color={expressOnly ? "#D32F2F" : "#333"} />
            <Text style={[styles.filterText, expressOnly && { color: '#D32F2F' }]}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>{displayProducts.length} Products Found</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {displayProducts.length > 0 ? (
          <View style={styles.grid}>
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No products found</Text>
            <Text style={styles.emptyStateDesc}>Try adjusting your search or filters to find what you're looking for.</Text>
          </View>
        )}
      </ScrollView>

      {/* Sort Modal */}
      <Modal
        visible={isSortModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSortModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
            </View>
            {sortOptions.map((option, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.sortOptionItem}
                onPress={() => handleSortSelect(option)}
              >
                <Text style={[styles.sortOptionText, sortOption === option && styles.sortOptionSelected]}>
                  {option}
                </Text>
                {sortOption === option && <Check size={20} color="#D32F2F" />}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={[styles.modalHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
              <Text style={styles.modalTitle}>Filters</Text>
              {expressOnly && (
                <TouchableOpacity onPress={() => { setExpressOnly(false); setFilterModalVisible(false); }}>
                  <Text style={styles.clearFilterText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.filterOptionItem}>
              <View>
                <Text style={styles.filterOptionTitle}>Express Delivery</Text>
                <Text style={styles.filterOptionDesc}>Show only items delivered in 60 mins</Text>
              </View>
              <Switch
                value={expressOnly}
                onValueChange={setExpressOnly}
                trackColor={{ false: '#767577', true: '#ffcdd2' }}
                thumbColor={expressOnly ? '#D32F2F' : '#f4f3f4'}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.applyBtn}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backBtn: {
    padding: 5,
  },
  searchBarContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  filterBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 12,
  },
  filterItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  filterDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#eee',
  },
  resultsInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  resultsText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyStateDesc: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sortOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
  },
  sortOptionSelected: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  clearFilterText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  filterOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  filterOptionTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  filterOptionDesc: {
    fontSize: 12,
    color: '#757575',
  },
  applyBtn: {
    backgroundColor: '#D32F2F',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  applyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductListScreen;
