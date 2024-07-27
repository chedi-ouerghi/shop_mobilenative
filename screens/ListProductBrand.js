// ListProductBrand.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { products } from '../data';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 16; // Adjusted for padding and spacing

const ListProductBrand = ({ route, navigation }) => {
  const { brand } = route.params;

  // Filter products by brand
  const brandProducts = products.filter(product => product.brand === brand);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', { product: item })}
      style={styles.productCard}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{brand}</Text>
      <FlatList
        data={brandProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2} // Two items per row
        columnWrapperStyle={styles.row} // Style for rows to add gap
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background for better contrast
    width: '95%',
    alignSelf: 'center', // Center horizontally
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productCard: {
    flex: 1, // Make each card take up equal space
    margin: 5, // Add margin to create a gap
    backgroundColor: '#fff', // White background for the card
    padding: 16,
    borderRadius: 12, // More rounded corners
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productImage: {
    width: '100%',
    height: 115,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ListProductBrand;
