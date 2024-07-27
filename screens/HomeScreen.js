import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Platform } from 'react-native';
import { products } from '../data';
import MapLocation from '../components/MapLocation';
import ContactUs from '../components/ContactUs';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 22;

const HomeScreen = ({ navigation }) => {
  // Extract unique brands from products
  const uniqueBrands = [...new Set(products.map(product => product.brand))];

  const renderProduct = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { product: item })} style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  const renderBrandCard = (brand) => (
    <TouchableOpacity
      key={brand}
      onPress={() => navigation.navigate('ListProductBrand', { brand })}
      style={styles.brandCard}
      activeOpacity={0.9} // Slightly lower opacity when pressed
    >
      <Text style={styles.brandText}>{brand}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* New Arrivals Section */}
      <View style={styles.section}>
        <Text style={styles.header}>New Arrivals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productList}>
          {products.slice(0, 5).map(product => (
            <View key={product.id} style={styles.horizontalItem}>
              {renderProduct(product)}
            </View>
          ))}
        </ScrollView>
      </View>
      
      {/* Brand Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Brands</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          <View style={styles.brandContainer}>
            {uniqueBrands.map(brand => renderBrandCard(brand))}
          </View>
        </ScrollView>
      </View>

      {/* All Products Section */}
      <View style={styles.section}>
        <View style={styles.titleAllProduct}>
          <Text style={styles.header}>All Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ListProduct')} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreButtonText}>Voir plus</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          {products.slice(0, 6).map(product => (
            <View key={product.id} style={styles.gridItem}>
              {renderProduct(product)}
            </View>
          ))}
        </View>
      </View>

      {/* Contact Us Section */}
      <ContactUs />

      {/* Map Location Section */}
      <MapLocation />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Light gray background for consistency
    paddingBottom: 60,
  },
  section: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Dark gray for text
  },
  productList: {
    marginBottom: 16,
  },
  horizontalItem: {
    marginRight: 8, // Add spacing between horizontal items
  },
  productCard: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5, // Maintain a consistent aspect ratio
    margin: 5,
    backgroundColor: '#fff', // White background for product cards
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productImage: {
    width: '100%',
    height: '60%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333', // Dark gray for text
  },
  productPrice: {
    fontSize: 14,
    color: '#777', // Light gray for price
    marginTop: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: ITEM_WIDTH,
    marginBottom: 16,
  },
  titleAllProduct: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewMoreButton: {
    backgroundColor: '#000', // Black for button
    padding: 10,
    borderRadius: 8,
  },
  viewMoreButtonText: {
    color: '#fff', // White text for button
    textAlign: 'center',
    fontSize: 16,
  },
  brandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 5,
  },
  brandCard: {
    margin: 5,
    backgroundColor: '#fff', // White background for brand cards
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1 }],
    ...Platform.select({
      ios: {
        transition: 'all 0.3s ease-in-out',
      },
    }),
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Dark gray for text
  },
});

export default HomeScreen;
