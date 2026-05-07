import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Share2, Heart, Star, Zap, ShoppingBag, Truck } from 'lucide-react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const liked = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    // Optionally provide some feedback or navigation here
    // navigation.navigate('Cart'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn}>
            <Share2 size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.headerBtn, { marginLeft: 15 }]}
            onPress={() => toggleFavorite(product.id)}
          >
            <Heart size={20} color={liked ? "#D32F2F" : "#333"} fill={liked ? "#D32F2F" : "none"} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          {product.isExpress && (
            <View style={styles.expressBadge}>
              <Zap size={14} color="#fff" fill="#fff" />
              <Text style={styles.expressText}>60 MIN DELIVERY</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.name}</Text>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Star size={14} color="#fff" fill="#fff" />
            </View>
          </View>
          <Text style={styles.reviews}>{product.reviews} Global Ratings</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            {product.originalPrice && (
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                <Text style={styles.discountText}>{product.discount}% OFF</Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          {/* Delivery Info */}
          <View style={styles.deliveryInfo}>
            <View style={styles.deliveryItem}>
              <Truck size={20} color="#757575" />
              <View style={styles.deliveryDetails}>
                <Text style={styles.deliveryTitle}>Earliest Delivery</Text>
                <Text style={styles.deliveryValue}>Today, Before 9:00 PM</Text>
              </View>
            </View>
            <View style={styles.deliveryItem}>
              <ShoppingBag size={20} color="#757575" />
              <View style={styles.deliveryDetails}>
                <Text style={styles.deliveryTitle}>Free Shipping</Text>
                <Text style={styles.deliveryValue}>On orders above ₹999</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Product Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.description}>
              This exquisite gift is perfect for making any occasion memorable. Crafted with care and delivered with love, it's designed to bring a smile to your loved one's face.
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bullet}>• High-quality materials</Text>
              <Text style={styles.bullet}>• Hand-delivered by experts</Text>
              <Text style={styles.bullet}>• Complimentary greeting card included</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn} onPress={() => { handleAddToCart(); navigation.navigate('Cart'); }}>
          <Text style={styles.buyNowText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 10,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  expressBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#D32F2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  expressText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  ratingBox: {
    backgroundColor: '#388E3C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviews: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
    gap: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  originalPrice: {
    fontSize: 16,
    color: '#757575',
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 16,
    color: '#388E3C',
    fontWeight: 'bold',
  },
  discountRow: {
    flexDirection: 'row',
    gap: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  deliveryInfo: {
    gap: 15,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  deliveryDetails: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 12,
    color: '#757575',
  },
  deliveryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#616161',
    lineHeight: 22,
    marginBottom: 15,
  },
  bulletPoints: {
    gap: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#616161',
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    gap: 15,
  },
  addToCartBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buyNowBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ProductDetailsScreen;
