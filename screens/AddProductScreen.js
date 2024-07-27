import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert, FlatList } from 'react-native';
import CameraShot from '../components/CameraShot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddProductScreen = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    id: '',
    name: '',
    price: '',
    image: { uri: '' },
    category: '',
    size: 'Medium',
    material: '',
    brand: '',
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      // Load existing products
      const existingProducts = await AsyncStorage.getItem('products');
      const productList = existingProducts ? JSON.parse(existingProducts) : [];
      setProducts(productList);
    })();
  }, []);

  const submitProduct = async () => {
    if (!productDetails.id || !productDetails.name || !productDetails.price || !productDetails.category) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const existingProducts = await AsyncStorage.getItem('products');
      const products = existingProducts ? JSON.parse(existingProducts) : [];

      products.push(productDetails);
      await AsyncStorage.setItem('products', JSON.stringify(products));
      Alert.alert('Success', 'Product added successfully');

      setProductDetails({
        id: '',
        name: '',
        price: '',
        image: { uri: '' },
        category: '',
        size: 'Medium',
        material: '',
        brand: '',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to submit product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isCameraOpen ? (
        <CameraShot />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Product ID"
            value={productDetails.id}
            onChangeText={(text) => setProductDetails({ ...productDetails, id: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={productDetails.name}
            onChangeText={(text) => setProductDetails({ ...productDetails, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Price"
            value={productDetails.price}
            onChangeText={(text) => setProductDetails({ ...productDetails, price: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={productDetails.category}
            onChangeText={(text) => setProductDetails({ ...productDetails, category: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Material"
            value={productDetails.material}
            onChangeText={(text) => setProductDetails({ ...productDetails, material: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Brand"
            value={productDetails.brand}
            onChangeText={(text) => setProductDetails({ ...productDetails, brand: text })}
          />
          <TouchableOpacity onPress={() => setIsCameraOpen(true)} style={styles.cameraButton}>
            <Text style={styles.cameraButtonText}>Open Camera</Text>
          </TouchableOpacity>
          {productDetails.image.uri ? (
            <Image source={{ uri: productDetails.image.uri }} style={styles.imagePreview} />
          ) : null}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity onPress={submitProduct} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Product</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productText}>ID: {item.id}</Text>
            <Text style={styles.productText}>Name: {item.name}</Text>
            <Text style={styles.productText}>Price: {item.price}</Text>
            <Text style={styles.productText}>Category: {item.category}</Text>
            {item.image.uri ? <Image source={{ uri: item.image.uri }} style={styles.imagePreview} /> : null}
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  cameraButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  cameraButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
