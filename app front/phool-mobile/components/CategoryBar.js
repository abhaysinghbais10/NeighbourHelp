import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: 1, name: 'Cakes', icon: '🎂' },
  { id: 2, name: 'Flowers', icon: '💐' },
  { id: 3, name: 'Personalized', icon: '🎁' },
  { id: 4, name: 'Plants', icon: '🪴' },
  { id: 5, name: 'Hampers', icon: '🧺' },
  { id: 6, name: 'Jewellery', icon: '💍' },
  { id: 7, name: 'Home Decor', icon: '🏠' },
  { id: 8, name: 'Gourmet', icon: '🍫' },
  { id: 9, name: 'Same Day', icon: '⚡' },
];

const CategoryBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat.id} 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('ProductList', { title: cat.name })}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{cat.icon}</Text>
            </View>
            <Text style={styles.categoryName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CategoryBar;
