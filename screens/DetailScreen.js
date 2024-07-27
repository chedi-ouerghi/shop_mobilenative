// screens/DetailScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  // Animation values
  const gradientValue = useRef(new Animated.Value(0)).current;
  const imageValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Function to start the gradient animation
  const startGradientAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientValue, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(gradientValue, {
          toValue: 0,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  // Function to animate the image to the cart
  const animateImageToCart = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(imageValue, {
          toValue: { x: 0, y: -200 },
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.7,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(imageValue, {
        toValue: { x: 0, y: 0 },
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      addToCart();
    });
  };

  const addToCart = async () => {
    try {
      // Check if the user is authenticated
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        alert('Please login to add items to cart');
        navigation.navigate('LoginScreen');
        return;
      }

      // Fake API call for adding item to cart
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        token,
        product,
      });

      if (response.status === 201) {
        // Update cart in AsyncStorage
        let cart = await AsyncStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];
        cart.push(product);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        const cartCount = cart.length;
        await AsyncStorage.setItem('cartCount', cartCount.toString());

        navigation.navigate('CartScreen');
      } else {
        alert('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    startGradientAnimation();
  }, []);

  const backgroundColor = gradientValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#feb47b'],
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={[
          styles.background,
          {
            backgroundColor,
          },
        ]}
      />
      <Animated.Image
        source={product.image}
        style={[
          styles.productImage,
          {
            transform: [
              { translateX: imageValue.x },
              { translateY: imageValue.y },
              { scale: scaleValue },
            ],
          },
        ]}
        resizeMode="cover"
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDetail}>Size: {product.size.join(', ')}</Text>
      <Text style={styles.productDetail}>Material: {product.material}</Text>
      <TouchableOpacity onPress={animateImageToCart} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 150,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  productImage: {
    width: '80%',
    height: 300,
    alignSelf: 'center',
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  productPrice: {
    fontSize: 20,
    color: '#666',
    marginTop: 8,
  },
  productDetail: {
    fontSize: 16,
    marginTop: 8,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    width: '35%',
    position: 'absolute',
    left:'70%',
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DetailScreen;
