import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from './ProductCard';
import { useNavigation } from '@react-navigation/native';

import { products } from '../data/products';

const ProductGrid = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProductList', { title })}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 12,
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default ProductGrid;
