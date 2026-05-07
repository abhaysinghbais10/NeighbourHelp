import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search, X, Clock, TrendingUp } from 'lucide-react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const recentSearches = ['Cakes', 'Flowers for birthday', 'Personalized Mug', 'Plants'];
  const trendingSearches = ['Mother\'s Day Gifts', 'Summer Collection', 'Express Delivery', 'Best Sellers'];

  const filteredProducts = query.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      
      {/* Search Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Search size={18} color="#D32F2F" />
          <TextInput 
            placeholder="Search for cakes, flowers..." 
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={18} color="#757575" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={query.trim() ? styles.scrollContent : {}}>
        {!query.trim() ? (
          <>
            {/* Recent Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <TouchableOpacity>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.list}>
                {recentSearches.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.listItem} onPress={() => setQuery(item)}>
                    <Clock size={16} color="#757575" />
                    <Text style={styles.listItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Trending Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending Searches</Text>
              </View>
              <View style={styles.chipContainer}>
                {trendingSearches.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.chip} onPress={() => setQuery(item)}>
                    <TrendingUp size={14} color="#D32F2F" />
                    <Text style={styles.chipText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.searchResults}>
            <Text style={styles.resultsCount}>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{query}"
            </Text>
            <View style={styles.grid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No products found.</Text>
                  <Text style={styles.noResultsSubText}>Try searching for something else like "Cake" or "Mug".</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 10,
  },
  backBtn: {
    padding: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  clearText: {
    fontSize: 12,
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  list: {
    gap: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 5,
  },
  listItemText: {
    fontSize: 14,
    color: '#616161',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff1f1',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffe5e5',
    gap: 8,
  },
  chipText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  searchResults: {
    padding: 15,
  },
  resultsCount: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 15,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noResults: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
});

export default SearchScreen;
