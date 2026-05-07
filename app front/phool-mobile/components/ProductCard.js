import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, Star, Zap } from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2;

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const liked = isFavorite(product.id);

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity 
          style={styles.wishlistBtn}
          onPress={() => toggleFavorite(product.id)}
        >
          <Heart size={16} color={liked ? "#D32F2F" : "#757575"} fill={liked ? "#D32F2F" : "none"} />
        </TouchableOpacity>
        {product.isExpress && (
          <View style={styles.expressBadge}>
            <Zap size={10} color="#fff" fill="#fff" />
            <Text style={styles.expressText}>60-Min</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <View style={styles.ratingRow}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} color="#FFC107" fill={i < Math.floor(product.rating) ? "#FFC107" : "none"} />
            ))}
          </View>
          <Text style={styles.reviewCount}>({product.reviews})</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>₹{product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          )}
        </View>
        <View style={styles.deliveryRow}>
          <Text style={styles.deliveryLabel}>Earliest Delivery: </Text>
          <Text style={styles.deliveryTime}>Today</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expressBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#D32F2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  expressText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
  },
  reviewCount: {
    fontSize: 10,
    color: '#757575',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
    gap: 6,
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  originalPrice: {
    fontSize: 11,
    color: '#757575',
    textDecorationLine: 'line-through',
  },
  deliveryRow: {
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    paddingTop: 8,
    flexDirection: 'row',
  },
  deliveryLabel: {
    fontSize: 9,
    color: '#757575',
  },
  deliveryTime: {
    fontSize: 9,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default ProductCard;
